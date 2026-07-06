import { MILESTONES, nextMilestone, daysSinceSurgery } from "../../content/timeline.js";
import { formatShort, fromDateKey, toDateKey } from "../../lib/dates.js";

// Liste des échéances médicales, pilotée par timeline.js (source unique).
// La prochaine échéance est mise en avant, les passées sont atténuées.
export default function MilestoneList() {
  const todayKey = toDateKey(new Date());
  const next = nextMilestone();

  return (
    <ol className="mt-8 flex flex-col">
      {MILESTONES.map((m) => {
        const isPast = m.date < todayKey;
        const isNext = next && m.date === next.date;
        const dayOffset = daysSinceSurgery(fromDateKey(m.date));

        return (
          <li
            key={m.date + m.label}
            className={[
              "grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 py-4 border-t border-rule-soft",
              isPast ? "opacity-45" : "",
            ].join(" ")}
          >
            <div className="flex flex-col items-end w-20 flex-shrink-0">
              <span
                className={[
                  "font-mono text-sm tabular-nums leading-tight",
                  isNext ? "text-accent-bright font-medium" : "text-ink",
                ].join(" ")}
              >
                {formatShort(m.date)}
                {m.approx ? " ~" : ""}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute">
                J{dayOffset >= 0 ? "+" : ""}
                {dayOffset}
              </span>
            </div>

            <div className="min-w-0">
              <p className="flex items-center gap-2 flex-wrap">
                <span
                  className={[
                    "font-display text-base sm:text-lg leading-snug",
                    isNext ? "text-ink font-medium" : "text-ink-soft",
                  ].join(" ")}
                >
                  {m.label}
                </span>
                {isNext && (
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full bg-accent-wash text-accent-bright border border-accent/25 leading-none">
                    <span className="pulse-dot" style={{ width: 5, height: 5 }} />
                    Prochaine
                  </span>
                )}
              </p>
              {m.detail && (
                <p className="mt-1 text-sm text-ink-mute leading-relaxed max-w-[58ch]">
                  {m.detail}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
