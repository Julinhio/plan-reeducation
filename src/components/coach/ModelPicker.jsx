export const MODELS = [
  { id: "google/gemini-3-flash-preview", label: "Gemini 3 Flash" },
  { id: "google/gemini-2.5-pro", label: "Gemini 2.5 Pro" },
  { id: "anthropic/claude-sonnet-4-5", label: "Claude Sonnet 4.5" },
  { id: "openai/gpt-5", label: "GPT-5" },
];

export const DEFAULT_MODEL_ID = "google/gemini-3-flash-preview";

export default function ModelPicker({ value, onChange, disabled }) {
  return (
    <fieldset className="flex flex-col gap-1.5 min-w-0">
      <legend className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
        Modèle
      </legend>
      <div
        role="radiogroup"
        aria-label="Choix du modèle"
        className="flex flex-wrap gap-1.5"
      >
        {MODELS.map((m) => {
          const isActive = m.id === value;
          return (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={isActive}
              disabled={disabled}
              onClick={() => onChange(m.id)}
              className={[
                "px-2.5 py-1 rounded-full font-mono text-[11px] tracking-[0.04em] btn-press border whitespace-nowrap",
                isActive
                  ? "bg-ink text-paper-soft border-ink"
                  : "bg-paper-soft text-ink-soft border-rule hover:border-rule-strong hover:text-ink disabled:opacity-50 disabled:cursor-not-allowed",
              ].join(" ")}
            >
              {m.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
