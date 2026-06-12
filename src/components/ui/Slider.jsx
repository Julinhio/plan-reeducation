export default function Slider({
  label,
  value,
  onChange,
  min = 1,
  max = 10,
  step = 1,
  id,
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label
          htmlFor={id}
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute"
        >
          {label}
        </label>
        <span className="font-mono text-sm font-medium tabular-nums text-ink">
          {value ?? "—"}
          <span className="text-ink-mute">/{max}</span>
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value ?? min}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-accent cursor-pointer"
      />
    </div>
  );
}
