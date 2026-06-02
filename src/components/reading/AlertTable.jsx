import Html from "../ui/Html.jsx";

export default function AlertTable({ table }) {
  return (
    <div
      role="table"
      aria-label="Quand passer à la suite versus signaux d'alerte"
      className="grid grid-cols-1 md:grid-cols-2 border border-rule-soft rounded-xl overflow-hidden bg-paper-card"
    >
      <Column
        variant="go"
        label={table.goLabel}
        items={table.go}
        className="border-b md:border-b-0 md:border-r border-rule-soft"
      />
      <Column variant="stop" label={table.stopLabel} items={table.stop} />
    </div>
  );
}

function Column({ variant, label, items, className = "" }) {
  const head =
    variant === "go"
      ? "bg-moss-wash text-moss-deep border-b border-moss/25"
      : "bg-amber-wash text-amber-deep border-b border-amber/25";

  const dot = variant === "go" ? "bg-moss" : "bg-amber";

  return (
    <div role="rowgroup" className={className}>
      <div
        role="columnheader"
        className={`px-5 py-3.5 font-mono text-[10px] uppercase tracking-[0.14em] font-medium flex items-center gap-2 ${head}`}
      >
        <span className={`${dot} w-2 h-2 rounded-full`} />
        {label}
      </div>
      <ul role="list" className="px-5 pb-5 pt-2 flex flex-col prose-medical">
        {items.map((item, i) => (
          <li
            key={i}
            className="py-3 text-sm text-ink leading-relaxed border-b border-dashed border-rule-soft last:border-b-0"
          >
            <Html as="span" html={item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
