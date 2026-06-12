import { useMemo, useState } from "react";
import TimerWidget from "../tracking/TimerWidget.jsx";
import Slider from "../ui/Slider.jsx";
import { Label, NumberInput, Textarea } from "../ui/Field.jsx";

export default function ExerciseProgramCard({
  exercise,
  phaseId,
  dateKey,
  todaysSessions,
  onAdd,
  onRemove,
}) {
  const t = exercise.tracking ?? {};
  const [sets, setSets] = useState(t.defaultSets ?? null);
  const [reps, setReps] = useState(t.defaultReps ?? null);
  const [duration, setDuration] = useState(t.defaultDuration ?? null);
  const [sensation, setSensation] = useState(7);
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [logging, setLogging] = useState(false);

  const target = t.targetSessionsPerDay ?? 1;
  const done = todaysSessions.length;
  const complete = done >= target;

  const avgSensation = useMemo(() => {
    const values = todaysSessions
      .map((s) => s.sensation)
      .filter((v) => typeof v === "number");
    if (!values.length) return null;
    return (
      Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
    );
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
      setLogging(false);
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
        "relative bg-paper-card border rounded-2xl p-5 sm:p-6 transition-colors duration-200",
        complete ? "border-moss/40" : "border-rule-soft hover:border-rule",
      ].join(" ")}
    >
      {/* Header : numéro géant atténué, titre + tag, compteur du jour */}
      <header className="flex items-start gap-4">
        <span
          aria-hidden
          className="font-mono text-4xl sm:text-5xl font-medium leading-none text-ink-faint/50 tabular-nums select-none"
        >
          {exercise.num}
        </span>

        <div className="min-w-0 flex-1">
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-ink leading-tight">
            {exercise.title}
          </h3>
          {exercise.tag && (
            <span className="mt-1.5 inline-flex items-center font-mono text-[10px] uppercase tracking-[0.16em] px-2 py-1 rounded-full bg-paper-deep text-ink-mute border border-rule-soft leading-none">
              {exercise.tag}
            </span>
          )}
        </div>

        <DayCounter done={done} target={target} complete={complete} />
      </header>

      {/* Tuiles de stats + timer */}
      <div className="mt-5 flex flex-wrap items-stretch gap-2">
        {exercise.stats?.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center justify-center gap-1 rounded-2xl bg-paper-deep border border-rule-soft px-3.5 py-2.5 min-w-[68px]"
          >
            <span className="font-mono text-xl sm:text-2xl font-medium tabular-nums text-ink leading-none">
              {stat.value}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-ink-mute leading-none">
              {stat.label}
            </span>
          </div>
        ))}
        {t.timer && (
          <div className="flex items-center">
            <TimerWidget label={t.timer.label} durationSec={t.timer.durationSec} />
          </div>
        )}
      </div>

      {/* Fréquence */}
      {exercise.frequency && (
        <p className="mt-4 flex items-center gap-2 text-sm text-ink-mute">
          <RepeatIcon />
          <span className="text-ink-soft">{exercise.frequency}</span>
        </p>
      )}

      {/* Consigne courte */}
      {exercise.consigne && (
        <p className="mt-3 border-l-2 border-accent/50 pl-3 text-ink-soft leading-relaxed">
          {exercise.consigne}
        </p>
      )}

      {/* Repli détails techniques */}
      {exercise.details?.length > 0 && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setShowDetails((v) => !v)}
            aria-expanded={showDetails}
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute hover:text-ink btn-press"
          >
            <Chevron expanded={showDetails} />
            Détails techniques
          </button>
          <div
            className="grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none"
            style={{ gridTemplateRows: showDetails ? "1fr" : "0fr" }}
            aria-hidden={!showDetails}
          >
            <div className="overflow-hidden min-h-0">
              <ul className="flex flex-col gap-2 pt-3">
                {exercise.details.map((d, i) => (
                  <li
                    key={i}
                    className="relative pl-5 text-sm leading-relaxed text-ink-soft"
                  >
                    <span
                      className="absolute left-0 top-[0.65em] w-2.5 h-px bg-accent opacity-70"
                      aria-hidden
                    />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Sessions du jour déjà loggées */}
      {todaysSessions.length > 0 && (
        <ul className="mt-5 flex flex-wrap gap-1.5">
          {todaysSessions.map((s, i) => (
            <li key={s.id} className="group relative">
              <span
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-paper-deep border border-rule-soft text-xs text-ink-soft font-mono"
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
                  <span className="text-accent-bright">{s.sensation}/10</span>
                )}
                <button
                  type="button"
                  onClick={() => onRemove(s.id)}
                  className="ml-0.5 opacity-60 sm:opacity-0 group-hover:opacity-100 focus:opacity-100 text-ink-mute hover:text-amber-deep transition-opacity"
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
        <p className="mt-2.5 text-xs text-ink-mute">
          Sensation moyenne du jour :{" "}
          <span className="text-ink font-medium tabular-nums">
            {avgSensation}/10
          </span>
        </p>
      )}

      {/* Action : logger une session */}
      {!logging ? (
        <button
          type="button"
          onClick={() => setLogging(true)}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-paper text-sm font-semibold btn-press hover:bg-accent-bright"
        >
          <span className="text-base leading-none">+</span>
          Logger une session
        </button>
      ) : (
        <form onSubmit={handleLog} className="mt-5 flex flex-col gap-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${exercise.key}-sets`}>Séries</Label>
              <NumberInput
                id={`${exercise.key}-sets`}
                value={sets}
                onChange={setSets}
                placeholder="—"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor={`${exercise.key}-reps`}>Reps</Label>
              <NumberInput
                id={`${exercise.key}-reps`}
                value={reps}
                onChange={setReps}
                placeholder="—"
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
              className="px-4 py-2 rounded-xl bg-accent text-paper text-sm font-semibold btn-press hover:bg-accent-bright disabled:opacity-60"
            >
              {busy ? "Enregistrement..." : "Valider"}
            </button>
            <button
              type="button"
              onClick={() => setLogging(false)}
              className="px-4 py-2 rounded-xl bg-transparent text-ink-soft text-sm font-medium btn-press hover:bg-paper-deep"
            >
              Annuler
            </button>
          </div>
        </form>
      )}
    </article>
  );
}

function DayCounter({ done, target, complete }) {
  const n = Math.min(Math.max(target, done), 8);
  const dots = Array.from({ length: n }, (_, i) => i < done);
  return (
    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
      <span className="font-mono text-sm tabular-nums text-ink">
        {done}
        <span className="text-ink-mute">/{target}</span>
      </span>
      <div className="flex gap-1" aria-hidden>
        {dots.map((on, i) => (
          <span
            key={i}
            className={[
              "w-2 h-2 rounded-full",
              on
                ? complete
                  ? "bg-moss"
                  : "bg-accent"
                : "bg-paper-deep border border-rule",
            ].join(" ")}
          />
        ))}
      </div>
    </div>
  );
}

function RepeatIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className="text-accent flex-shrink-0"
    >
      <path d="M2.5 8a5.5 5.5 0 019.4-3.9l1.6 1.6" />
      <path d="M13.5 2v3.7H9.8" />
      <path d="M13.5 8a5.5 5.5 0 01-9.4 3.9l-1.6-1.6" />
      <path d="M2.5 14v-3.7h3.7" />
    </svg>
  );
}

function Chevron({ expanded }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 14 14"
      aria-hidden
      style={{
        transition: "transform 220ms cubic-bezier(0.23, 1, 0.32, 1)",
        transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
      }}
    >
      <path
        d="M5 3l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
