import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";
import { MODELS } from "./ModelPicker.jsx";

const TYPE_LABEL = {
  weekly: "Bilan hebdo",
  phase_check: "Passage de phase",
  kine_synthesis: "Synthèse kiné",
  patterns: "Patterns",
  free: "Question libre",
  custom: "Question libre",
};

function shortModelLabel(slug) {
  if (!slug) return null;
  const known = MODELS.find((m) => m.id === slug);
  if (known) return known.label;
  const parts = slug.split("/");
  return parts[parts.length - 1];
}

export default function AnalysisCard({
  analysis,
  isNewest,
  expanded = true,
  onToggle,
}) {
  const created = new Date(analysis.created_at);
  const relative = formatDistanceToNow(created, {
    locale: fr,
    addSuffix: true,
  });

  const collapsible = typeof onToggle === "function";

  function handleCardClick(e) {
    if (!collapsible || expanded) return;
    // Quand collapsed, le clic sur la carte développe.
    // On évite si on clique sur un élément interactif (bouton, lien, sélection texte).
    if (e.target.closest("button, a")) return;
    onToggle();
  }

  function handleChevronClick(e) {
    e.stopPropagation();
    onToggle();
  }

  return (
    <article
      data-newest={isNewest ? "true" : undefined}
      data-expanded={expanded ? "true" : "false"}
      onClick={collapsible ? handleCardClick : undefined}
      className={[
        "rounded-xl border transition-all duration-200",
        "data-[newest=true]:border-teal data-[newest=true]:animate-[coach-rise_350ms_cubic-bezier(0.23,1,0.32,1)_both]",
        expanded
          ? "bg-paper-card border-rule-soft p-5 sm:p-7 flex flex-col gap-4 hover:border-rule-strong"
          : "bg-paper-soft border-rule-soft px-5 py-3.5 flex flex-col gap-2 cursor-pointer hover:bg-paper-card hover:border-rule-strong",
      ].join(" ")}
    >
      <header className="flex items-baseline justify-between gap-3 flex-wrap">
        <div className="flex items-baseline gap-3 flex-wrap min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-teal-deep px-2 py-0.5 rounded-full bg-teal-wash border border-teal/20">
            {TYPE_LABEL[analysis.prompt_type] ?? analysis.prompt_type}
          </span>
          <span className="font-mono text-[11px] text-ink-mute">
            {relative}
          </span>
        </div>
        <div className="flex items-center gap-3 min-w-0">
          {analysis.model_used && (
            <span
              className="inline-flex items-center gap-1.5 font-mono text-[10px] text-ink-mute truncate max-w-[180px]"
              title={analysis.model_used}
            >
              <span
                aria-hidden
                className="w-1 h-1 rounded-full bg-teal-soft"
              />
              {shortModelLabel(analysis.model_used)}
            </span>
          )}
          {collapsible && (
            <button
              type="button"
              onClick={handleChevronClick}
              aria-label={expanded ? "Replier l'analyse" : "Déplier l'analyse"}
              aria-expanded={expanded}
              className="w-7 h-7 grid place-items-center rounded-full text-ink-mute hover:bg-paper-deep hover:text-ink btn-press"
            >
              <Chevron expanded={expanded} />
            </button>
          )}
        </div>
      </header>

      <blockquote
        className={[
          "border-l-2 border-rule pl-4 italic font-display text-ink-soft leading-snug",
          expanded ? "text-base" : "text-sm line-clamp-2",
        ].join(" ")}
      >
        {analysis.user_prompt}
      </blockquote>

      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
        style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
        aria-hidden={!expanded}
      >
        <div className="overflow-hidden min-h-0">
          <div className="flex flex-col gap-4 pt-1">
            <div className="coach-markdown text-ink leading-relaxed text-[15px]">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {analysis.response}
              </ReactMarkdown>
            </div>
            <footer className="pt-2 border-t border-dashed border-rule-soft">
              <p className="font-mono text-[10px] text-ink-faint">
                {created.toLocaleString("fr-FR", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </footer>
          </div>
        </div>
      </div>
    </article>
  );
}

function Chevron({ expanded }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden
      style={{
        transition: "transform 220ms cubic-bezier(0.23, 1, 0.32, 1)",
        transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <path
        d="M3 5.5l4 4 4-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
