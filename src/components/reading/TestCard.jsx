import Html from "../ui/Html.jsx";

export default function TestCard({ test }) {
  return (
    <article className="bg-paper-card border border-rule-soft rounded-xl p-5 sm:p-6 flex flex-col gap-3 transition-all duration-200 ease-out hover:border-rule-strong hover:-translate-y-px hover:shadow-md">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-teal-deep">
        {test.label}
      </p>
      <h4 className="font-display text-lg font-medium text-ink leading-snug -mt-1">
        {test.title}
      </h4>
      <dl className="flex flex-col gap-3 mt-1 prose-medical">
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-0.5">
            Objectif
          </dt>
          <Html as="dd" className="text-sm text-ink-soft leading-relaxed" html={test.goal} />
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-0.5">
            Résultat
          </dt>
          <Html
            as="dd"
            className="text-sm text-ink-soft leading-relaxed"
            html={test.result}
          />
        </div>
        <div>
          <dt className="font-mono text-[10px] uppercase tracking-[0.12em] text-ink-mute mb-0.5">
            Lecture
          </dt>
          <Html
            as="dd"
            className="text-sm text-ink leading-relaxed"
            html={test.reading}
          />
        </div>
      </dl>
    </article>
  );
}
