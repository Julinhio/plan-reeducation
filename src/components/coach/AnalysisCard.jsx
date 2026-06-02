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
  // Fallback, juste la partie après le slash
  const parts = slug.split("/");
  return parts[parts.length - 1];
}

export default function AnalysisCard({ analysis, isNewest }) {
  const created = new Date(analysis.created_at);
  const relative = formatDistanceToNow(created, {
    locale: fr,
    addSuffix: true,
  });

  return (
    <article
      data-newest={isNewest ? "true" : undefined}
      className="bg-paper-card border border-rule-soft rounded-xl p-5 sm:p-7 flex flex-col gap-4 transition-colors duration-200 hover:border-rule-strong data-[newest=true]:border-teal data-[newest=true]:animate-[coach-rise_350ms_cubic-bezier(0.23,1,0.32,1)_both]"
    >
      <header className="flex items-baseline justify-between gap-3 flex-wrap">
        <div className="flex items-baseline gap-3 flex-wrap min-w-0">
          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-teal-deep px-2 py-0.5 rounded-full bg-teal-wash border border-teal/20">
            {TYPE_LABEL[analysis.prompt_type] ?? analysis.prompt_type}
          </span>
          <span className="font-mono text-[11px] text-ink-mute">{relative}</span>
        </div>
        {analysis.model_used && (
          <span
            className="inline-flex items-center gap-1.5 font-mono text-[10px] text-ink-mute truncate max-w-[60%]"
            title={analysis.model_used}
          >
            <span
              aria-hidden
              className="w-1 h-1 rounded-full bg-teal-soft"
            />
            {shortModelLabel(analysis.model_used)}
          </span>
        )}
      </header>

      <blockquote className="border-l-2 border-rule pl-4 italic font-display text-ink-soft text-base leading-relaxed">
        {analysis.user_prompt}
      </blockquote>

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
    </article>
  );
}
