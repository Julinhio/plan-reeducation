export const PRESETS = [
  {
    key: "weekly",
    label: "Bilan de la semaine",
    prompt:
      "Fais le bilan des 7 derniers jours, qu'est-ce qui ressort, où j'en suis vraiment, ce que je devrais ajuster.",
  },
  {
    key: "phase_check",
    label: "Prêt pour la phase 2 ?",
    prompt:
      "Au regard des données actuelles et des critères, suis-je prêt pour passer en phase 2 ? Sois tranché, dis ce qui manque ou ce qui est validé.",
  },
  {
    key: "kine_synthesis",
    label: "Synthèse pour mon kiné",
    prompt:
      "Prépare une synthèse claire et factuelle de ma situation actuelle pour un kiné ou médecin du sport, format note médicale courte, en gardant les nuances et incertitudes.",
  },
  {
    key: "patterns",
    label: "Identifier les patterns",
    prompt:
      "Analyse mes données et mes notes pour identifier les patterns récurrents, ce qui semble corrélé, ce qui empire ou améliore mon état, ce que je sous-estime.",
  },
];

export default function PresetButtons({ onPick, disabled }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
      {PRESETS.map((p) => (
        <button
          key={p.key}
          type="button"
          onClick={() => onPick(p)}
          disabled={disabled}
          className="text-left px-4 py-3 rounded-lg bg-paper-card border border-rule-soft hover:border-accent hover:bg-paper-soft btn-press disabled:opacity-50 disabled:cursor-not-allowed group"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute group-hover:text-accent-bright transition-colors">
            Preset
          </p>
          <p className="font-display text-sm sm:text-base text-ink leading-snug mt-1">
            {p.label}
          </p>
        </button>
      ))}
    </div>
  );
}
