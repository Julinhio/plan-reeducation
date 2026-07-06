export const PRESETS = [
  {
    key: "weekly",
    label: "Bilan de la semaine",
    prompt:
      "Fais le bilan des 7 derniers jours de ma rééducation post-op : compliance aux exercices, évolution des mesures et du journal, respect des contraintes de la phase en cours. Qu'est-ce qui ressort, où j'en suis vraiment, ce que je devrais ajuster. Vérifie aussi que je ne répète pas les erreurs de la semaine 1 (progression trop rapide, plusieurs variables à la fois).",
  },
  {
    key: "phase_check",
    label: "Point critères de phase",
    prompt:
      "Fais le point sur les critères de passage vers la phase suivante au regard de mes données réelles. Sois tranché : ce qui est validé, ce qui manque, ce que je dois faire cette semaine pour avancer, et ce que je ne dois surtout pas précipiter.",
  },
  {
    key: "kine_synthesis",
    label: "Synthèse kiné / médecin",
    prompt:
      "Prépare une synthèse claire et factuelle de ma situation post-opératoire actuelle, format note médicale courte, destinée à un kiné ou un médecin (mon père kiné qui me suit à distance, ou un kiné local à HCMC). Inclus l'acte chirurgical, la phase du protocole, les données récentes, les points de vigilance. Garde les nuances et incertitudes.",
  },
  {
    key: "patterns",
    label: "Identifier les patterns",
    prompt:
      "Analyse mes données et mes notes pour identifier les patterns récurrents : ce qui semble corrélé, ce qui empire ou améliore mon état (gonflement, douleur, sensation), ce que je sous-estime. Attention particulière aux réactions du lendemain après les journées chargées.",
  },
  {
    key: "rdv_prep",
    label: "Préparer le prochain RDV",
    prompt:
      "Prépare-moi pour mon prochain rendez-vous médical du calendrier : les points à aborder, les questions précises à poser (formulées en patient informé), les données à apporter, et les décisions à obtenir avant de repartir. Base-toi sur ma situation réelle et le calendrier du dossier.",
  },
];

export default function PresetButtons({ onPick, disabled }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
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
