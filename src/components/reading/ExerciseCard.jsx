import Html from "../ui/Html.jsx";

const TAG_VARIANTS = {
  teal: "bg-teal-wash text-teal-deep border-teal/20",
  plum: "bg-plum-wash text-plum border-plum/25",
};

export default function ExerciseCard({ exercise }) {
  return (
    <article className="bg-paper-card border border-rule-soft rounded-xl p-5 sm:p-8 flex flex-col gap-4 transition-colors duration-200 hover:border-rule-strong prose-medical">
      <header className="flex flex-col gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
          {exercise.num}
        </p>
        <div className="flex flex-wrap items-baseline gap-3">
          <h4 className="font-display text-xl sm:text-2xl font-medium text-ink leading-tight tracking-tight">
            {exercise.title}
            {exercise.italic && (
              <em className="italic text-ink-soft font-normal ml-1">
                · {exercise.italic}
              </em>
            )}
          </h4>
          <span className="inline-flex flex-wrap gap-1.5">
            {exercise.tags?.map((tag) => (
              <span
                key={tag.label}
                className={`font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-full border leading-none ${
                  TAG_VARIANTS[tag.variant] ?? TAG_VARIANTS.teal
                }`}
              >
                {tag.label}
              </span>
            ))}
          </span>
        </div>
      </header>

      <Html
        as="p"
        html={exercise.goal}
        className="text-ink leading-relaxed"
      />

      <ul className="flex flex-col gap-3">
        {exercise.steps.map((step, i) => (
          <li
            key={i}
            className="relative pl-6 leading-relaxed text-ink-soft text-[15px]"
          >
            <span
              className="absolute left-0 top-[0.75em] w-3 h-px bg-teal opacity-50"
              aria-hidden
            />
            <Html as="span" html={step} />
          </li>
        ))}
      </ul>

      {exercise.note && (
        <Html
          as="p"
          html={exercise.note}
          className="bg-paper-deep rounded-lg px-4 py-3 text-sm text-ink-soft leading-relaxed"
        />
      )}

      <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-4 pt-4 border-t border-dashed border-rule">
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
          Dosage
        </span>
        <Html
          as="span"
          html={exercise.dosage}
          className="text-sm text-ink leading-relaxed"
        />
      </div>

      {exercise.fallback && (
        <p className="text-sm italic text-ink-mute leading-relaxed">
          {exercise.fallback}
        </p>
      )}
    </article>
  );
}
