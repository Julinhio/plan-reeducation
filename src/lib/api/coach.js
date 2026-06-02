import { supabase } from "../supabase.js";

export async function listAnalyses(limit = 60) {
  const { data, error } = await supabase
    .from("coach_analyses")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function askCoach({ promptType, userPrompt, model }) {
  const password = import.meta.env.VITE_APP_PASSWORD;
  const res = await fetch("/api/coach", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-app-password": password ?? "",
    },
    body: JSON.stringify({ promptType, userPrompt, model }),
  });
  if (!res.ok) {
    let detail = "";
    try {
      const json = await res.json();
      detail = json.error || JSON.stringify(json);
    } catch {
      detail = await res.text();
    }
    throw new Error(`Coach API ${res.status}: ${detail}`);
  }
  return res.json();
}
