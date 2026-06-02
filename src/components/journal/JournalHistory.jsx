import { formatDay } from "../../lib/dates.js";

const KNEE_LABEL = {
  raide: "Raide",
  moyen: "Moyen",
  ok: "OK",
  bon: "Bon",
};

const MOOD_LABEL = {
  frustre: "Frustré",
  neutre: "Neutre",
  motive: "Motivé",
  leger: "Léger",
};

export default function JournalHistory({ entries, currentDateKey, onSelect }) {
  if (!entries.length) {
    return (
      <p className="text-sm text-ink-mute italic">
        Aucune entrée pour l'instant.
      </p>
    );
  }

  return (
    <ol className="flex flex-col gap-2">
      {entries.map((e) => {
        const isCurrent = e.entry_date === currentDateKey;
        return (
          <li key={e.id}>
            <button
              type="button"
              onClick={() => onSelect(e.entry_date)}
              className={[
                "w-full text-left bg-paper-card border rounded-lg px-4 py-3 btn-press transition-colors",
                isCurrent
                  ? "border-teal"
                  : "border-rule-soft hover:border-rule-strong",
              ].join(" ")}
            >
              <div className="flex items-baseline justify-between gap-3">
                <p className="font-display text-sm text-ink capitalize">
                  {formatDay(e.entry_date)}
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                  {e.entry_date}
                </p>
              </div>
              <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
                {e.knee_morning && (
                  <Tag>Genou : {KNEE_LABEL[e.knee_morning] ?? e.knee_morning}</Tag>
                )}
                {typeof e.pain === "number" && <Tag>Douleur {e.pain}/10</Tag>}
                {typeof e.mobility === "number" && (
                  <Tag>Mobilité {e.mobility}/10</Tag>
                )}
                {e.swelling && <Tag tone="amber">Gonflement</Tag>}
                {e.mood && <Tag>{MOOD_LABEL[e.mood] ?? e.mood}</Tag>}
              </div>
              {e.notes && (
                <p className="mt-2 text-sm text-ink-soft leading-snug line-clamp-2">
                  {e.notes}
                </p>
              )}
            </button>
          </li>
        );
      })}
    </ol>
  );
}

function Tag({ children, tone = "default" }) {
  const cls =
    tone === "amber"
      ? "bg-amber-wash text-amber-deep border-amber/30"
      : "bg-paper-deep text-ink-soft border-rule-soft";
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[11px] font-mono ${cls}`}
    >
      {children}
    </span>
  );
}
