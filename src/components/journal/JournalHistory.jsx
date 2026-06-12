import { useState } from "react";
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

export default function JournalHistory({
  entries,
  currentDateKey,
  onSelect,
  onDelete,
}) {
  const [pendingDelete, setPendingDelete] = useState(null);
  const [busyDelete, setBusyDelete] = useState(false);

  if (!entries.length) {
    return (
      <p className="text-sm text-ink-mute italic">
        Aucune entrée pour l'instant.
      </p>
    );
  }

  async function confirmDelete(dateKey) {
    if (!onDelete) return;
    setBusyDelete(true);
    try {
      await onDelete(dateKey);
      setPendingDelete(null);
    } catch (err) {
      console.error(err);
      alert("Suppression impossible, voir console.");
    } finally {
      setBusyDelete(false);
    }
  }

  return (
    <ol className="flex flex-col gap-2">
      {entries.map((e) => {
        const isCurrent = e.entry_date === currentDateKey;
        const isPending = pendingDelete === e.entry_date;
        return (
          <li key={e.id}>
            <div
              className={[
                "group relative bg-paper-card border rounded-lg transition-colors",
                isCurrent
                  ? "border-accent"
                  : "border-rule-soft hover:border-rule-strong",
                isPending ? "border-amber/40 bg-amber-wash/30" : "",
              ].join(" ")}
            >
              <button
                type="button"
                onClick={() => onSelect(e.entry_date)}
                className="w-full text-left px-4 py-3 btn-press"
              >
                <div className="flex items-baseline justify-between gap-3 pr-8">
                  <p className="font-display text-sm text-ink capitalize">
                    {formatDay(e.entry_date)}
                  </p>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
                    {e.entry_date}
                  </p>
                </div>
                <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs text-ink-soft">
                  {e.knee_morning && (
                    <Tag>
                      Genou: {KNEE_LABEL[e.knee_morning] ?? e.knee_morning}
                    </Tag>
                  )}
                  {typeof e.pain === "number" && (
                    <Tag>Douleur {e.pain}/10</Tag>
                  )}
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

              {onDelete && !isPending && (
                <button
                  type="button"
                  onClick={() => setPendingDelete(e.entry_date)}
                  aria-label={`Supprimer l'entrée du ${e.entry_date}`}
                  className="absolute top-2.5 right-2.5 w-7 h-7 grid place-items-center rounded-full text-ink-mute opacity-0 group-hover:opacity-100 focus-visible:opacity-100 sm:group-hover:opacity-100 max-sm:opacity-60 hover:bg-paper-deep hover:text-amber-deep btn-press transition-opacity"
                >
                  <TrashIcon />
                </button>
              )}

              {isPending && (
                <div className="border-t border-amber/30 px-4 py-2.5 flex items-center justify-between gap-3">
                  <p className="text-xs text-amber-deep font-medium">
                    Supprimer définitivement ?
                  </p>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => setPendingDelete(null)}
                      disabled={busyDelete}
                      className="px-3 py-1 rounded-full text-xs font-medium text-ink-soft hover:text-ink hover:bg-paper-deep btn-press"
                    >
                      Annuler
                    </button>
                    <button
                      type="button"
                      onClick={() => confirmDelete(e.entry_date)}
                      disabled={busyDelete}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-amber-deep text-paper hover:bg-amber-deep/90 btn-press disabled:opacity-60"
                    >
                      {busyDelete ? "..." : "Supprimer"}
                    </button>
                  </div>
                </div>
              )}
            </div>
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

function TrashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2.5 3.5h9" />
      <path d="M5 3.5V2.5a1 1 0 011-1h2a1 1 0 011 1v1" />
      <path d="M3.5 3.5l.6 8.2a1 1 0 001 .9h3.8a1 1 0 001-.9l.6-8.2" />
      <path d="M6 6v4" />
      <path d="M8 6v4" />
    </svg>
  );
}
