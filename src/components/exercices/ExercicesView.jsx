import { useMemo, useState } from "react";
import { getActiveExercises } from "../../content/phases.js";
import { toDateKey } from "../../lib/dates.js";
import { useSessionsForDate } from "../../hooks/useSessions.js";
import DayPicker from "../tracking/DayPicker.jsx";
import ExerciseProgramCard from "./ExerciseProgramCard.jsx";

export default function ExercicesView({ phase }) {
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

  const doneCount = useMemo(
    () =>
      exercises.filter(
        (ex) =>
          (grouped.get(ex.key)?.length ?? 0) >=
          (ex.tracking?.targetSessionsPerDay ?? 1)
      ).length,
    [exercises, grouped]
  );

  return (
    <section className="flex flex-col gap-6">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="overline text-ink-mute">Programme · Phase {phase.meta.id}</p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold text-ink mt-1 leading-none">
            Exercices du jour
          </h2>
          <p className="text-sm text-ink-soft mt-2 max-w-prose">
            Petites doses, fréquentes, jamais douloureuses. Déplie le détail au
            besoin, logge chaque session.
          </p>
        </div>
        <div className="flex flex-col items-stretch sm:items-end gap-2">
          <DayPicker dateKey={dateKey} onChange={setDateKey} />
          {!loading && exercises.length > 0 && (
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-mute text-right">
              <span className="text-accent-bright font-medium tabular-nums">
                {doneCount}/{exercises.length}
              </span>{" "}
              exos complétés
            </p>
          )}
        </div>
      </header>

      {error && (
        <p className="text-sm text-amber-deep bg-amber-wash border border-amber/30 rounded-2xl px-4 py-3">
          Erreur de chargement, vérifie la connexion Supabase.{" "}
          {String(error.message ?? error)}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-ink-mute">Chargement...</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {exercises.map((ex) => (
            <ExerciseProgramCard
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
