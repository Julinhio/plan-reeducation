import { useMemo, useState } from "react";
import { getActiveExercises } from "../../content/phases.js";
import { toDateKey } from "../../lib/dates.js";
import { useSessionsForDate } from "../../hooks/useSessions.js";
import DayPicker from "./DayPicker.jsx";
import ExerciseTrackerCard from "./ExerciseTrackerCard.jsx";

export default function TrackingView({ phase }) {
  const exercises = getActiveExercises(phase.meta.id);
  const [dateKey, setDateKey] = useState(toDateKey(new Date()));
  const { sessions, loading, error, add, remove } = useSessionsForDate(dateKey);

  const grouped = useMemo(() => {
    const map = new Map();
    for (const ex of exercises) map.set(ex.key, []);
    for (const s of sessions) {
      if (!map.has(s.exercise_key)) map.set(s.exercise_key, []);
      map.get(s.exercise_key).push(s);
    }
    return map;
  }, [exercises, sessions]);

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="overline text-ink-mute">Tracking</p>
          <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1 leading-tight">
            Checklist du jour
          </h2>
          <p className="text-sm text-ink-soft mt-1 max-w-prose">
            Petites doses, fréquentes. Logge chaque session pour suivre la
            compliance et la qualité.
          </p>
        </div>
        <DayPicker dateKey={dateKey} onChange={setDateKey} />
      </header>

      {error && (
        <p className="text-sm text-amber-deep bg-amber-wash border border-amber/30 rounded-lg px-4 py-3">
          Erreur de chargement, vérifie la connexion Supabase. {String(error.message ?? error)}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-ink-mute">Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {exercises.map((ex) => (
            <ExerciseTrackerCard
              key={ex.key}
              exercise={ex}
              phaseId={phase.meta.id}
              dateKey={dateKey}
              todaysSessions={grouped.get(ex.key) ?? []}
              onAdd={add}
              onRemove={remove}
            />
          ))}
        </div>
      )}
    </section>
  );
}
