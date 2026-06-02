import { addDays, subDays } from "date-fns";
import { toDateKey, formatDay, isToday } from "../../lib/dates.js";

export default function DayPicker({ dateKey, onChange }) {
  function shift(days) {
    const current = new Date(`${dateKey}T00:00:00`);
    const next = days > 0 ? addDays(current, days) : subDays(current, -days);
    const today = toDateKey(new Date());
    const nextKey = toDateKey(next);
    if (nextKey > today) return;
    onChange(nextKey);
  }

  const today = isToday(dateKey);

  return (
    <div className="flex items-center gap-2 bg-paper-card border border-rule-soft rounded-full p-1">
      <button
        type="button"
        onClick={() => shift(-1)}
        className="w-9 h-9 rounded-full grid place-items-center text-ink-soft hover:bg-paper-deep hover:text-ink btn-press"
        aria-label="Jour précédent"
      >
        ←
      </button>
      <div className="px-3 sm:px-4 flex-1 min-w-0">
        <p className="font-display text-sm sm:text-base text-ink capitalize truncate">
          {today ? "Aujourd'hui" : formatDay(dateKey)}
        </p>
        {!today && (
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-ink-mute">
            {dateKey}
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={() => shift(1)}
        disabled={today}
        className="w-9 h-9 rounded-full grid place-items-center text-ink-soft hover:bg-paper-deep hover:text-ink disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed btn-press"
        aria-label="Jour suivant"
      >
        →
      </button>
      {!today && (
        <button
          type="button"
          onClick={() => onChange(toDateKey(new Date()))}
          className="ml-1 px-3 py-1.5 rounded-full text-xs font-medium bg-teal text-paper-soft hover:bg-teal-deep btn-press"
        >
          Aujourd'hui
        </button>
      )}
    </div>
  );
}
