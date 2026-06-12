import Html from "../ui/Html.jsx";

const VARIANTS = {
  conclusion: {
    bg: "bg-amber-wash",
    border: "border-amber/30",
    accent: "bg-amber",
    label: "text-amber-deep",
  },
  rule: {
    bg: "bg-moss-wash",
    border: "border-moss/30",
    accent: "bg-moss",
    label: "text-moss-deep",
  },
  compass: {
    bg: "bg-accent-wash",
    border: "border-accent/25",
    accent: "bg-accent",
    label: "text-accent-bright",
  },
};

export default function Callout({ variant = "conclusion", label, children }) {
  const v = VARIANTS[variant] ?? VARIANTS.conclusion;
  return (
    <aside
      role="note"
      className={`${v.bg} ${v.border} border rounded-lg px-5 sm:px-6 py-5 flex flex-col gap-3 prose-medical leading-relaxed`}
    >
      <span
        className={`font-mono text-[10px] uppercase tracking-[0.16em] ${v.label} inline-flex items-center gap-2`}
      >
        <span className={`${v.accent} w-3.5 h-px`} aria-hidden />
        {label}
      </span>
      {children}
    </aside>
  );
}

export function CalloutHtml({ variant, label, html }) {
  return (
    <Callout variant={variant} label={label}>
      <Html as="p" html={html} className="text-ink leading-relaxed" />
    </Callout>
  );
}
