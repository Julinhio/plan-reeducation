// =====================================================================
// Vercel serverless function, coach IA.
// POST { promptType, userPrompt } + header x-app-password
// Fetch 60 derniers jours Supabase + tout l'historique d'analyses
// Construit le system prompt, appelle OpenRouter, persiste, renvoie.
// =====================================================================

import { createClient } from "@supabase/supabase-js";
import { USER_PROFILE, KNEE_HISTORY, COACH_ROLE } from "./coach-context.js";

const SUPABASE_URL =
  process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  process.env.VITE_SUPABASE_ANON_KEY;
const APP_PASSWORD =
  process.env.APP_PASSWORD || process.env.VITE_APP_PASSWORD;
const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const DEFAULT_MODEL =
  process.env.OPENROUTER_MODEL || "google/gemini-3-flash-preview";

const ALLOWED_MODELS = new Set([
  "google/gemini-3-flash-preview",
  "google/gemini-2.5-pro",
  "anthropic/claude-sonnet-4-5",
  "openai/gpt-5",
]);

const PRESET_LABELS = {
  weekly: "Bilan de la semaine",
  phase_check: "Suis-je prêt pour la phase 2",
  kine_synthesis: "Synthèse pour mon kiné",
  patterns: "Identifier les patterns",
  free: "Question libre",
  custom: "Question libre",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!APP_PASSWORD) {
    return res
      .status(500)
      .json({ error: "Server missing APP_PASSWORD env var" });
  }

  const provided = req.headers["x-app-password"];
  if (!provided || provided !== APP_PASSWORD) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (!OPENROUTER_API_KEY) {
    return res
      .status(500)
      .json({ error: "Server missing OPENROUTER_API_KEY env var" });
  }
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res
      .status(500)
      .json({ error: "Server missing Supabase env vars" });
  }

  let body = req.body;
  if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ error: "Invalid JSON body" });
    }
  }
  const { promptType, userPrompt, model } = body ?? {};
  if (!userPrompt || typeof userPrompt !== "string") {
    return res.status(400).json({ error: "Missing userPrompt" });
  }
  const safeType = PRESET_LABELS[promptType] ? promptType : "free";
  const selectedModel =
    model && ALLOWED_MODELS.has(model) ? model : DEFAULT_MODEL;

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: false },
  });

  const sinceDate = new Date();
  sinceDate.setDate(sinceDate.getDate() - 60);
  const sinceKey = sinceDate.toISOString().slice(0, 10);

  // Fetch en parallèle
  const [sessionsRes, journalRes, measurementsRes, criteriaRes, analysesRes] =
    await Promise.all([
      supabase
        .from("exercise_sessions")
        .select("*")
        .gte("session_date", sinceKey)
        .order("session_date", { ascending: true }),
      supabase
        .from("journal_entries")
        .select("*")
        .gte("entry_date", sinceKey)
        .order("entry_date", { ascending: true }),
      supabase
        .from("measurements")
        .select("*")
        .gte("measured_on", sinceKey)
        .order("measured_on", { ascending: true }),
      supabase
        .from("phase_criteria")
        .select("*")
        .order("target_phase", { ascending: true })
        .order("order_index", { ascending: true }),
      supabase
        .from("coach_analyses")
        .select("*")
        .order("created_at", { ascending: true }),
    ]);

  const sessions = sessionsRes.data ?? [];
  const journal = journalRes.data ?? [];
  const measurements = measurementsRes.data ?? [];
  const criteria = criteriaRes.data ?? [];
  const pastAnalyses = analysesRes.data ?? [];

  const systemPrompt = buildSystemPrompt({
    sessions,
    journal,
    measurements,
    criteria,
    pastAnalyses,
  });

  const contextSnapshot = {
    since: sinceKey,
    counts: {
      sessions: sessions.length,
      journal: journal.length,
      measurements: measurements.length,
      criteria: criteria.length,
      past_analyses: pastAnalyses.length,
    },
  };

  let aiResponse;
  try {
    aiResponse = await callOpenRouter({
      model: selectedModel,
      systemPrompt,
      userPrompt,
    });
  } catch (err) {
    console.error("OpenRouter call failed", err);
    return res
      .status(502)
      .json({ error: "AI call failed", detail: String(err.message ?? err) });
  }

  const { data: inserted, error: insertError } = await supabase
    .from("coach_analyses")
    .insert({
      prompt_type: safeType,
      user_prompt: userPrompt,
      response: aiResponse.text,
      context_snapshot: contextSnapshot,
      model_used: aiResponse.model,
    })
    .select()
    .single();

  if (insertError) {
    console.error("Insert failed", insertError);
    return res.status(500).json({
      error: "Failed to persist analysis",
      detail: insertError.message,
    });
  }

  return res.status(200).json({
    response: inserted.response,
    analysisId: inserted.id,
    model: inserted.model_used,
    createdAt: inserted.created_at,
    promptType: inserted.prompt_type,
    userPrompt: inserted.user_prompt,
  });
}

// ---------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------

function buildSystemPrompt({
  sessions,
  journal,
  measurements,
  criteria,
  pastAnalyses,
}) {
  const dataSection = formatDataSection({
    sessions,
    journal,
    measurements,
    criteria,
  });
  const memorySection = formatMemorySection(pastAnalyses);

  return [
    COACH_ROLE,
    "",
    "# Profil utilisateur",
    USER_PROFILE,
    "",
    "# Historique du genou",
    KNEE_HISTORY,
    "",
    "# Données actuelles, 60 derniers jours",
    dataSection,
    "",
    "# Tes analyses précédentes",
    memorySection,
  ].join("\n");
}

function formatDataSection({ sessions, journal, measurements, criteria }) {
  const parts = [];

  parts.push("## Sessions d'exercices");
  if (!sessions.length) {
    parts.push("_Aucune session loggée sur la période._");
  } else {
    const byDay = groupBy(sessions, "session_date");
    for (const day of Object.keys(byDay).sort()) {
      parts.push(`- ${day}`);
      for (const s of byDay[day]) {
        const bits = [s.exercise_key];
        if (s.sets && s.reps) bits.push(`${s.sets}×${s.reps}`);
        if (s.duration_sec) bits.push(`${s.duration_sec}s`);
        if (typeof s.sensation === "number")
          bits.push(`sensation ${s.sensation}/10`);
        if (s.notes) bits.push(`note: ${s.notes}`);
        parts.push(`  - ${bits.join(", ")}`);
      }
    }
  }

  parts.push("");
  parts.push("## Journal");
  if (!journal.length) {
    parts.push("_Aucune entrée de journal sur la période._");
  } else {
    for (const j of journal) {
      const bits = [];
      if (j.knee_morning) bits.push(`genou matin: ${j.knee_morning}`);
      if (j.swelling) bits.push("gonflement");
      if (typeof j.pain === "number") bits.push(`douleur ${j.pain}/10`);
      if (typeof j.mobility === "number")
        bits.push(`mobilité ${j.mobility}/10`);
      if (j.mood) bits.push(`humeur ${j.mood}`);
      const head = `- ${j.entry_date}: ${bits.join(", ")}`;
      parts.push(head);
      if (j.notes) parts.push(`  - notes: ${j.notes}`);
    }
  }

  parts.push("");
  parts.push("## Mesures objectives");
  if (!measurements.length) {
    parts.push("_Aucune mesure sur la période._");
  } else {
    for (const m of measurements) {
      const bits = [];
      if (m.extension_deficit_degrees !== null)
        bits.push(`déficit extension ${m.extension_deficit_degrees}°`);
      if (typeof m.vmo_quality === "number")
        bits.push(`VMO ${m.vmo_quality}/10`);
      if (m.notes) bits.push(`notes: ${m.notes}`);
      parts.push(`- ${m.measured_on}: ${bits.join(", ")}`);
    }
  }

  parts.push("");
  parts.push("## Critères de passage de phase");
  if (!criteria.length) {
    parts.push("_Aucun critère défini._");
  } else {
    const byPhase = groupBy(criteria, "target_phase");
    for (const phase of Object.keys(byPhase).sort()) {
      parts.push(`### Vers la phase ${phase}`);
      for (const c of byPhase[phase]) {
        const status = c.status;
        const validated = c.validated_on ? ` (validé le ${c.validated_on})` : "";
        parts.push(`- [${status}] ${c.label}${validated}`);
        if (c.notes) parts.push(`  - notes: ${c.notes}`);
      }
    }
  }

  return parts.join("\n");
}

function formatMemorySection(pastAnalyses) {
  if (!pastAnalyses.length) return "Aucune analyse précédente.";

  // On garde le texte complet des 5 plus récentes, résumé court pour les
  // autres, pour préserver la mémoire récente sans exploser le contexte.
  const sorted = pastAnalyses.slice().sort((a, b) =>
    a.created_at.localeCompare(b.created_at)
  );
  const FULL_KEEP = 5;
  const cutoff = Math.max(0, sorted.length - FULL_KEEP);
  const older = sorted.slice(0, cutoff);
  const recent = sorted.slice(cutoff);

  const parts = [];
  if (older.length) {
    parts.push("## Analyses antérieures, résumé");
    for (const a of older) {
      const summary = (a.response || "")
        .replace(/\s+/g, " ")
        .slice(0, 300);
      parts.push(
        `- ${a.created_at.slice(0, 10)} [${a.prompt_type}] question: "${a.user_prompt}"`
      );
      parts.push(`  - résumé: ${summary}...`);
    }
    parts.push("");
  }

  if (recent.length) {
    parts.push("## Analyses récentes, texte intégral");
    for (const a of recent) {
      parts.push(`### ${a.created_at.slice(0, 10)}, ${a.prompt_type}`);
      parts.push(`Question: ${a.user_prompt}`);
      parts.push("");
      parts.push(a.response);
      parts.push("");
    }
  }

  return parts.join("\n");
}

function groupBy(arr, key) {
  return arr.reduce((acc, item) => {
    const k = item[key];
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

// ---------------------------------------------------------------------
// OpenRouter
// ---------------------------------------------------------------------

async function callOpenRouter({ model, systemPrompt, userPrompt }) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": "https://plan-reeducation.vercel.app",
      "X-Title": "Plan de rééducation, coach IA",
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter ${res.status}: ${text}`);
  }
  const json = await res.json();
  const text = json?.choices?.[0]?.message?.content;
  if (!text) {
    throw new Error("OpenRouter response missing content");
  }
  return { text, model: json?.model || model };
}
