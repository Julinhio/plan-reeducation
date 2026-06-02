import Html from "../ui/Html.jsx";

export default function UpcomingPanel({ upcoming }) {
  return (
    <section
      aria-label={`Phase ${upcoming.number}, à venir`}
      className="grid place-items-center px-5 sm:px-12 py-12 sm:py-24 bg-paper-card border border-dashed border-rule rounded-2xl text-center"
    >
      <div className="max-w-[56ch] flex flex-col items-center gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute inline-flex items-center gap-3">
          <span className="h-px w-6 bg-rule-strong" />
          Phase {upcoming.number} · À venir
          <span className="h-px w-6 bg-rule-strong" />
        </p>
        <h2 className="font-display italic font-medium text-[clamp(1.8rem,1.55rem+1.2vw,2.55rem)] leading-tight tracking-tight text-ink">
          {upcoming.title}
        </h2>
        <p className="text-ink-soft leading-relaxed max-w-[42ch]">
          {upcoming.goal}
        </p>
        <Html
          as="p"
          html={upcoming.message}
          className="mt-3 px-5 py-4 bg-paper-deep rounded-lg text-sm text-ink-soft leading-relaxed max-w-[52ch] prose-medical"
        />
      </div>
    </section>
  );
}
