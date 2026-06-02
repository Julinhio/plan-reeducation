import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Masthead({ activePhase }) {
  const phaseNumber = activePhase.meta.number.replace(/^0/, "");
  const today = format(new Date(), "d MMMM yyyy", { locale: fr });

  return (
    <header className="pt-12 sm:pt-20 pb-8 sm:pb-12 relative border-b border-rule-soft">
      <div className="shell">
        <p className="overline text-ink-mute inline-flex items-center gap-2 mb-5 rise" style={{ animationDelay: "40ms" }}>
          <span className="pulse-dot" />
          Document de travail · Évolutif
        </p>

        <h1
          className="font-display font-medium text-[clamp(2.2rem,1.75rem+2.1vw,3.6rem)] leading-[1.05] tracking-tight text-ink max-w-[18ch] rise"
          style={{ animationDelay: "100ms" }}
        >
          Plan de rééducation
          <span className="text-ink-faint font-normal mx-1">,</span>
          <span className="italic text-teal-deep">Genou droit</span>
        </h1>

        <p
          className="font-display italic text-ink-soft text-[clamp(1.2rem,1.1rem+0.45vw,1.4rem)] mt-4 max-w-[44ch] leading-snug rise"
          style={{ animationDelay: "160ms" }}
        >
          <span>Phase {phaseNumber}</span>
          <span className="text-ink-faint not-italic mx-2">·</span>
          <span>{activePhase.meta.subtitle}</span>
        </p>

        <dl
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 pt-5 border-t border-rule-soft max-w-3xl rise"
          style={{ animationDelay: "220ms" }}
        >
          <div className="flex flex-col gap-1">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
              Patient
            </dt>
            <dd className="text-ink font-medium">Julien F. D. Gaichet</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
              Session
            </dt>
            <dd className="text-ink font-medium capitalize">{today}</dd>
          </div>
          <div className="flex flex-col gap-1">
            <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute">
              Statut
            </dt>
            <dd className="text-ink font-medium">
              {activePhase.meta.status === "active"
                ? `Phase ${phaseNumber} en cours`
                : `Phase ${phaseNumber}, à venir`}
            </dd>
          </div>
        </dl>
      </div>
    </header>
  );
}
