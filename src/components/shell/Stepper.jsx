import { phases } from "../../content/phases.js";

export default function Stepper({ activePhaseId, onSelect }) {
  function handleKey(e, currentIndex) {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const next =
      e.key === "ArrowRight"
        ? phases[(currentIndex + 1) % phases.length]
        : phases[(currentIndex - 1 + phases.length) % phases.length];
    onSelect(next.meta.id);
    e.preventDefault();
  }

  return (
    <nav
      aria-label="Phases de rééducation"
      className="sticky top-0 z-40 backdrop-blur-md backdrop-saturate-150 bg-paper/85 border-b border-rule-soft py-3 no-print"
    >
      <div className="shell">
        <ol
          role="tablist"
          className="flex gap-2 overflow-x-auto pb-0.5 -mx-1 px-1 sm:grid sm:grid-cols-5 sm:gap-3 sm:overflow-visible sm:mx-0 sm:px-0"
        >
          {phases.map((phase, idx) => {
            const isActive = phase.meta.id === activePhaseId;
            const isUpcoming = phase.meta.status === "upcoming";
            const isDone = phase.meta.status === "done";
            return (
              <li key={phase.meta.id} className="flex-shrink-0 min-w-[150px] sm:min-w-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-current={isActive ? "true" : undefined}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => onSelect(phase.meta.id)}
                  onKeyDown={(e) => handleKey(e, idx)}
                  data-status={phase.meta.status}
                  className={[
                    "w-full text-left px-3 py-2.5 sm:py-3 rounded-lg flex items-center gap-3 btn-press border",
                    isActive
                      ? "bg-paper-card border-accent text-ink shadow-sm"
                      : "bg-transparent border-transparent text-ink-soft hover:bg-paper-soft hover:border-rule-soft hover:text-ink",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-mono text-[11px] font-medium tracking-[0.06em] w-6 h-6 sm:w-7 sm:h-7 rounded-full grid place-items-center border flex-shrink-0",
                      isActive
                        ? "bg-accent text-paper border-accent"
                        : isDone
                        ? "bg-moss-wash text-moss-deep border-moss/30"
                        : "bg-paper-deep text-ink-mute border-rule",
                    ].join(" ")}
                  >
                    {isDone ? "✓" : phase.meta.number}
                  </span>
                  <span className="flex flex-col gap-0.5 min-w-0">
                    <span
                      className={`font-display text-sm sm:text-base font-medium leading-tight truncate ${
                        isUpcoming ? "text-ink-mute" : ""
                      }`}
                    >
                      {phase.meta.title}
                    </span>
                    <span
                      className={[
                        "font-mono text-[10px] uppercase tracking-[0.14em] leading-none",
                        isActive
                          ? "text-accent-bright font-medium"
                          : isUpcoming
                          ? "text-ink-faint"
                          : "text-ink-mute",
                      ].join(" ")}
                    >
                      {phase.meta.statusLabel}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
