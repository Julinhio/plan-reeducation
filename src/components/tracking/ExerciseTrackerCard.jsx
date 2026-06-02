import { useMemo, useState } from "react";
import TimerWidget from "./TimerWidget.jsx";
import Slider from "../ui/Slider.jsx";
import { Label, NumberInput, Textarea } from "../ui/Field.jsx";

const TAG_VARIANTS = {
  teal: "bg-teal-wash text-teal-deep border-teal/20",
  plum: "bg-plum-wash text-plum border-plum/25",
};

export default function ExerciseTrackerCard({
  exercise,
  phaseId,
  dateKey,
  todaysSessions,
  onAdd,
  onRemove,
}) {
  const [sets, setSets] = useState(exercise.tracking?.defaultSets ?? null);
  const [reps, setReps] = useState(exercise.tracking?.defaultReps ?? null);
  const [duration, setDuration] = useState(null);
  const [sensation, setSensation] = useState(7);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const target = exercise.tracking?.targetSessionsPerDay ?? 1;
  const done = todaysSessions.length;
  const progress = Math.min(100, (done / target) * 100);
  const complete = done >= target;

  const avgSensation = useMemo(() => {
    const values = todaysSessions
      .map((s) => s.sensation)
      .filter((v) => typeof v === "number");
    if (!values.length) return null;
    return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
  }, [todaysSessions]);

  async function handleLog(e) {
    e.preventDefault();
    setBusy(true);
    try {
      await onAdd({
        session_date: dateKey,
        phase_id: phaseId,
        exercise_key: exercise.key,
        sets,
        reps,
        duration_sec: duration,
        sensation,
        notes: notes || null,
      });
      setNotes("");
      setExpanded(false);
    } catch (err) {
      console.error(err);
      alert("Erreur d'enregistrement, voir console.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <article
      className={[
        "bg-paper-card border rounded-xl p-5 sm:p-6 transition-colors duration-200",
        complete ? "border-moss/40" : "border-rule-soft",
      ].join(" ")}
    >
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">
            {exercise.num}
          </p>
          <h4 className="font-display text-lg sm:text-xl font-medium text-ink leading-tight mt-0.5">
            {exercise.title}
          </h4>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {exercise.tags?.map((tag) => (
              <span
                key={tag.label}
                className={`font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-0.5 rounded-full border leading-none ${
                  TAG_VARIANTS[tag.variant] ?? TAG_VARIANTS.teal
                }`}
              >
                {tag.label}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 flex-shrink-0">
          {exercise.tracking?.timer && (
            <TimerWidget
              label={exercise.tracking.timer.label}
              durationSec={exercise.tracking.timer.durationSec}
            />
          )}
        </div>
      </header>

      <div className="mt-4 flex items-center gap-3">
        <div className="flex-1 h-1.5 bg-paper-deep rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ease-out ${
              complete ? "bg-moss" : "bg-teal"
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-mono text-xs tabular-nums text-ink-soft whitespace-nowrap">
          {done} / {target} {target > 1 ? "sessions" : "session"}
        </span>
      </div>

      {todaysSessions.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {todaysSessions.map((s, i) => (
            <li key={s.id} className="group relative">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-paper-deep text-xs text-ink-soft font-mono"
                title={s.notes || ""}
              >
                <span className="text-ink font-medium">#{i + 1}</span>
                {s.sets && s.reps && (
                  <span>
                    {s.sets}×{s.reps}
                  </span>
                )}
                {s.duration_sec && <span>{s.duration_sec}s</span>}
                {typeof s.sensation === "number" && (
                  <span className="text-teal-deep">{s.sensation}/10</span>
                )}
                <button
                  type="button"
                  onClick={() => onRemove(s.id)}
                  className="ml-1 opacity-0 group-hover:opacity-100 focus:opacity-100 text-ink-mute hover:text-amber-deep transition-opacity"
                  aria-label="Supprimer cette session"
                >
                  ×
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {avgSensation !== null && (
        <p className="mt-3 text-xs text-ink-mute">
          Sensation moyenne du jour :{" "}
          <span className="text-ink font-medium tabular-nums">
            {avgSensation}/10
          </span>
        </p>
      )}

      {!expanded ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="px-4 py-2 rounded-lg bg-ink text-paper-soft text-sm font-medium btn-press hover:bg-teal-deep"
          >
            Logger une session
          </button>
        </div>
      ) : (
        <form onSubmit={handleLog} className="mt-5 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${exercise.key}-sets`}>Séries</Label>
              <NumberInput
                id={`${exercise.key}-sets`}
                value={sets}
                onChange={setSets}
                placeholder="3"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${exercise.key}-reps`}>Reps</Label>
              <NumberInput
                id={`${exercise.key}-reps`}
                value={reps}
                onChange={setReps}
                placeholder="10"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${exercise.key}-dur`}>Durée (s)</Label>
              <NumberInput
                id={`${exercise.key}-dur`}
                value={duration}
                onChange={setDuration}
                placeholder="—"
              />
            </div>
          </div>
          <Slider
            id={`${exercise.key}-sens`}
            label="Sensation"
            value={sensation}
            onChange={setSensation}
          />
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`${exercise.key}-notes`}>Note rapide</Label>
            <Textarea
              id={`${exercise.key}-notes`}
              rows={2}
              placeholder="Comment ça s'est passé"
              value={notes}
              onChange={setNotes}
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              disabled={busy}
              className="px-4 py-2 rounded-lg bg-ink text-paper-soft text-sm font-medium btn-press hover:bg-teal-deep disabled:opacity-60"
            >
              {busy ? "Enregistrement..." : "Valider"}
            </button>
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="px-4 py-2 rounded-lg bg-transparent text-ink-soft text-sm font-medium btn-press hover:bg-paper-deep"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </article>
  );
}
