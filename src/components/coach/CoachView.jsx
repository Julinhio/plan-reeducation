import { useEffect, useRef, useState } from "react";
import { useCoachAnalyses } from "../../hooks/useCoachAnalyses.js";
import { Label, Textarea } from "../ui/Field.jsx";
import PresetButtons, { PRESETS } from "./PresetButtons.jsx";
import AnalysisCard from "./AnalysisCard.jsx";
import ModelPicker, { DEFAULT_MODEL_ID } from "./ModelPicker.jsx";

export default function CoachView() {
  const { analyses, loading, error, asking, ask, newestId } =
    useCoachAnalyses();
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState(DEFAULT_MODEL_ID);
  const [localError, setLocalError] = useState(null);
  const [expandedIds, setExpandedIds] = useState(() => new Set());
  const seededRef = useRef(false);

  // À la première arrivée des analyses, déplier la plus récente.
  useEffect(() => {
    if (seededRef.current || analyses.length === 0) return;
    seededRef.current = true;
    setExpandedIds(new Set([analyses[0].id]));
  }, [analyses]);

  // Quand une nouvelle analyse arrive, la déplier sans toucher aux autres.
  useEffect(() => {
    if (!newestId) return;
    setExpandedIds((prev) => {
      const next = new Set(prev);
      next.add(newestId);
      return next;
    });
  }, [newestId]);

  function toggleExpanded(id) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function runWith({ promptType, userPrompt }) {
    setLocalError(null);
    try {
      await ask({ promptType, userPrompt, model });
      if (promptType === "free") setPrompt("");
    } catch (e) {
      setLocalError(e);
    }
  }

  function handlePreset(preset) {
    runWith({ promptType: preset.key, userPrompt: preset.prompt });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    runWith({ promptType: "free", userPrompt: prompt.trim() });
  }

  const displayError = localError || error;

  return (
    <section className="flex flex-col gap-6">
      <header>
        <p className="overline text-ink-mute">Coach IA</p>
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1 leading-tight">
          Analyse et mémoire
        </h2>
        <p className="text-sm text-ink-soft mt-1 max-w-prose">
          Le coach lit tes 60 derniers jours de tracking, journal, mesures et critères, plus l'ensemble de ses analyses passées. Direct, factuel, jamais flatteur.
        </p>
      </header>

      <div className="bg-paper-card border border-rule-soft rounded-2xl p-5 sm:p-6 flex flex-col gap-5">
        <div>
          <Label>Demandes préconfigurées</Label>
          <div className="mt-2">
            <PresetButtons onPick={handlePreset} disabled={asking} />
          </div>
        </div>

        <div className="h-px bg-rule-soft" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="coach-prompt">Question libre</Label>
            <Textarea
              id="coach-prompt"
              rows={4}
              value={prompt}
              onChange={setPrompt}
              placeholder="Ce que tu veux lui demander. Plus tu donnes de contexte, plus tu auras de précision."
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <ModelPicker value={model} onChange={setModel} disabled={asking} />
            <div className="flex items-center gap-3 flex-wrap">
              {asking && (
                <span className="text-xs text-ink-mute">
                  5 à 20 secondes, ne ferme pas la page.
                </span>
              )}
              <button
                type="submit"
                disabled={asking || !prompt.trim()}
                className="relative px-5 py-2.5 rounded-lg bg-accent text-paper text-sm font-medium btn-press hover:bg-accent-bright disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2"
              >
                {asking && (
                  <span
                    aria-hidden
                    className="inline-block w-3 h-3 rounded-full border-2 border-paper/40 border-t-paper animate-spin"
                  />
                )}
                {asking ? "Le coach réfléchit..." : "Demander"}
              </button>
            </div>
          </div>
        </form>
      </div>

      {displayError && (
        <div className="text-sm text-amber-deep bg-amber-wash border border-amber/30 rounded-lg px-4 py-3">
          <p className="font-medium">L'appel au coach a échoué.</p>
          <p className="mt-1 font-mono text-xs">
            {String(displayError.message ?? displayError)}
          </p>
          <p className="mt-2 text-xs text-ink-soft">
            Vérifie que <code>OPENROUTER_API_KEY</code> est définie côté Vercel, et que les migrations Supabase ont été lancées.
          </p>
        </div>
      )}

      <div>
        <p className="overline text-ink-mute mb-3">Historique</p>
        {loading ? (
          <p className="text-sm text-ink-mute">Chargement...</p>
        ) : analyses.length === 0 ? (
          <p className="text-sm text-ink-mute italic">
            Pas encore d'analyse, lance un preset ou pose ta question.
          </p>
        ) : (
          <ol className="flex flex-col gap-3">
            {analyses.map((a) => (
              <li key={a.id}>
                <AnalysisCard
                  analysis={a}
                  isNewest={a.id === newestId}
                  expanded={expandedIds.has(a.id)}
                  onToggle={() => toggleExpanded(a.id)}
                />
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
