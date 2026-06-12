const VIEWS = [
  { id: "reading", label: "Lecture" },
  { id: "exercices", label: "Exercices" },
  { id: "journal", label: "Journal" },
  { id: "progression", label: "Progression" },
  { id: "criteria", label: "Critères" },
  { id: "coach", label: "Coach" },
];

export default function ViewTabs({ activeView, onSelect, disabledViews }) {
  return (
    <div className="sticky top-[60px] sm:top-[68px] z-30 bg-paper/80 backdrop-blur-md backdrop-saturate-150 border-b border-rule-soft no-print">
      <div className="shell">
        <ol
          role="tablist"
          className="flex gap-1 sm:gap-2 overflow-x-auto py-2 -mx-1 px-1 scrollbar-thin"
        >
          {VIEWS.map((view) => {
            const isActive = view.id === activeView;
            const isDisabled = disabledViews?.includes(view.id);
            return (
              <li key={view.id} className="flex-shrink-0">
                <button
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  disabled={isDisabled}
                  onClick={() => !isDisabled && onSelect(view.id)}
                  className={[
                    "px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-sm font-medium btn-press border whitespace-nowrap",
                    isActive
                      ? "bg-accent text-paper border-accent shadow-sm"
                      : isDisabled
                      ? "bg-transparent text-ink-faint border-transparent cursor-not-allowed"
                      : "bg-transparent text-ink-soft border-transparent hover:bg-paper-card hover:border-rule-soft hover:text-ink",
                  ].join(" ")}
                >
                  {view.label}
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export { VIEWS };
