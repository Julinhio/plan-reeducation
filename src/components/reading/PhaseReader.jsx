import Html from "../ui/Html.jsx";
import TocSidebar from "./TocSidebar.jsx";
import TestCard from "./TestCard.jsx";
import Callout, { CalloutHtml } from "./Callout.jsx";
import ExerciseCard from "./ExerciseCard.jsx";
import TargetBlock from "./TargetBlock.jsx";
import AlertTable from "./AlertTable.jsx";
import UpcomingPanel from "./UpcomingPanel.jsx";

export default function PhaseReader({ phase }) {
  if (phase.meta.status === "upcoming") {
    return <UpcomingPanel upcoming={phase.upcoming} />;
  }

  const hasToc = phase.toc && phase.toc.length > 0;

  return (
    <div
      className={
        hasToc
          ? "grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-8 lg:gap-16 items-start"
          : ""
      }
    >
      {hasToc && <TocSidebar items={phase.toc} />}
      <article className="min-w-0">
        <PhaseIntro intro={phase.intro} />
        {phase.sections.map((section, i) => (
          <SectionRenderer
            key={section.id}
            section={section}
            isFirst={i === 0}
          />
        ))}
      </article>
    </div>
  );
}

function PhaseIntro({ intro }) {
  return (
    <header className="pb-12 border-b border-rule-soft mb-12">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-teal-deep inline-flex items-center gap-2">
        <span className="h-px w-4 bg-teal" />
        {intro.tagline}
      </p>
      <h2 className="font-display font-medium text-[clamp(1.8rem,1.55rem+1.2vw,2.55rem)] leading-tight tracking-tight text-ink mt-3">
        {intro.title}
      </h2>
      <p className="font-display italic text-[clamp(1.2rem,1.1rem+0.45vw,1.4rem)] leading-snug text-ink-soft max-w-[36ch] mt-4">
        {intro.goal}
      </p>
    </header>
  );
}

function SectionRenderer({ section, isFirst }) {
  const headerBlock = (
    <>
      <p className="flex items-baseline gap-3 font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute mb-3">
        <span className="text-teal-deep font-medium">{section.overlineNum}</span>
        <span>{section.overlineLabel}</span>
      </p>
      <h3 className="font-display text-[clamp(1.45rem,1.3rem+0.7vw,1.85rem)] font-medium leading-tight tracking-tight text-ink max-w-[24ch]">
        {section.title}
      </h3>
      {section.lede && (
        <Html
          as="p"
          html={section.lede}
          className="mt-4 text-ink-soft text-lg leading-relaxed max-w-[68ch] prose-medical"
        />
      )}
    </>
  );

  return (
    <section
      id={section.id}
      className={`scroll-mt-40 py-12 ${
        !isFirst ? "border-t border-rule-soft" : ""
      }`}
    >
      {headerBlock}

      {section.type === "tests" && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            {section.tests.map((t) => (
              <TestCard key={t.label} test={t} />
            ))}
          </div>
          {section.conclusion && (
            <div className="mt-8 max-w-[68ch]">
              <CalloutHtml
                variant={section.conclusion.variant}
                label={section.conclusion.label}
                html={section.conclusion.body}
              />
            </div>
          )}
        </>
      )}

      {section.type === "target" && (
        <div className="mt-8">
          <TargetBlock target={section.target} />
        </div>
      )}

      {section.type === "exercises" && (
        <>
          <div className="flex flex-col gap-5 mt-8">
            {section.exercises.map((ex) => (
              <ExerciseCard key={ex.key} exercise={ex} />
            ))}
          </div>
          {section.ruleCallout && (
            <div className="mt-8 max-w-[68ch]">
              <Callout
                variant={section.ruleCallout.variant}
                label={section.ruleCallout.label}
              >
                <Html as="p" html={section.ruleCallout.intro} className="text-ink leading-relaxed" />
                <Html as="p" html={section.ruleCallout.prompt} className="text-ink leading-relaxed" />
                <ul className="flex flex-col gap-2">
                  {section.ruleCallout.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="relative pl-5 leading-relaxed text-[15px]"
                    >
                      <span
                        className="absolute left-0 top-[0.7em] w-2 h-px bg-current opacity-45"
                        aria-hidden
                      />
                      <Html as="span" html={b} />
                    </li>
                  ))}
                </ul>
                <Html as="p" html={section.ruleCallout.outro} className="text-ink leading-relaxed" />
              </Callout>
            </div>
          )}
        </>
      )}

      {section.type === "rule-and-alerts" && (
        <>
          <div className="mt-8 max-w-[68ch]">
            <CalloutHtml
              variant={section.compass.variant}
              label={section.compass.label}
              html={section.compass.body}
            />
          </div>
          <div className="mt-6">
            <AlertTable table={section.alertTable} />
          </div>
          {section.note && (
            <p className="mt-4 italic text-sm text-ink-mute leading-relaxed">
              {section.note}
            </p>
          )}
        </>
      )}

      {section.type === "materiel" && (
        <Html
          as="p"
          html={section.body}
          className="mt-6 text-ink leading-relaxed max-w-[68ch] prose-medical"
        />
      )}
    </section>
  );
}
