import Html from "../ui/Html.jsx";

export default function TargetBlock({ target }) {
  return (
    <div className="relative overflow-hidden bg-paper-card border border-rule-soft rounded-2xl p-7 sm:p-12">
      <div
        className="absolute inset-0 pointer-events-none opacity-90"
        style={{
          background:
            "radial-gradient(600px 300px at 0% 0%, rgba(255, 90, 31, 0.10), transparent 60%)",
        }}
        aria-hidden
      />
      <p className="relative font-mono text-[11px] uppercase tracking-[0.18em] text-accent-bright mb-3">
        {target.label}
      </p>
      <p className="relative font-display font-medium italic text-[clamp(1.45rem,1.3rem+0.7vw,1.85rem)] leading-snug tracking-tight text-ink max-w-[28ch]">
        « {target.quote} »
      </p>
      <Html
        as="p"
        html={target.body}
        className="relative mt-4 text-ink-soft leading-relaxed max-w-[58ch]"
      />
    </div>
  );
}
