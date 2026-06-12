export function Label({ children, htmlFor, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute ${className}`}
    >
      {children}
    </label>
  );
}

export function NumberInput({ value, onChange, min = 0, max, id, placeholder }) {
  return (
    <input
      id={id}
      type="number"
      inputMode="numeric"
      min={min}
      max={max}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) =>
        onChange(e.target.value === "" ? null : Number(e.target.value))
      }
      className="w-full px-3 py-2 rounded-lg border border-rule bg-paper-soft text-ink text-sm tabular-nums focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-colors"
    />
  );
}

export function TextInput({ value, onChange, id, placeholder, type = "text" }) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg border border-rule bg-paper-soft text-ink text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-colors"
    />
  );
}

export function Textarea({ value, onChange, id, placeholder, rows = 3 }) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      rows={rows}
      value={value ?? ""}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded-lg border border-rule bg-paper-soft text-ink text-sm leading-relaxed focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/15 transition-colors resize-y"
    />
  );
}

export function ChoiceChips({ value, onChange, options, allowClear = true }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(allowClear && isActive ? null : opt.value)}
            className={[
              "px-3 py-1.5 rounded-full text-xs font-medium btn-press border",
              isActive
                ? "bg-accent text-paper border-accent"
                : "bg-paper-soft text-ink-soft border-rule hover:border-rule-strong hover:text-ink",
            ].join(" ")}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

export function Toggle({ label, checked, onChange, id }) {
  return (
    <button
      id={id}
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={[
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium btn-press border transition-colors",
        checked
          ? "bg-accent-wash border-accent/40 text-accent-bright"
          : "bg-paper-soft border-rule text-ink-soft hover:border-rule-strong",
      ].join(" ")}
    >
      <span
        aria-hidden
        className={`w-2 h-2 rounded-full transition-colors ${
          checked ? "bg-accent" : "bg-ink-faint"
        }`}
      />
      {label}
    </button>
  );
}
