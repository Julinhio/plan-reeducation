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
          className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3"
        >
          {phases.map((phase, idx) => {
            const isActive = phase.meta.id === activePhaseId;
            const isUpcoming = phase.meta.status === "upcoming";
            return (
              <li key={phase.meta.id}>
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
                      ? "bg-paper-card border-teal text-ink shadow-sm"
                      : "bg-transparent border-transparent text-ink-soft hover:bg-paper-soft hover:border-rule-soft hover:text-ink",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "font-mono text-[11px] font-medium tracking-[0.06em] w-6 h-6 sm:w-7 sm:h-7 rounded-full grid place-items-center border flex-shrink-0",
                      isActive
                        ? "bg-teal text-paper-soft border-teal"
                        : "bg-paper-deep text-ink-mute border-rule",
                    ].join(" ")}
                  >
                    {phase.meta.number}
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
                          ? "text-teal-deep font-medium"
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
