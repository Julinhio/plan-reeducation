import { getActiveExercises } from "../../content/phases.js";
import { useMeasurements } from "../../hooks/useMeasurements.js";
import ComplianceChart from "./ComplianceChart.jsx";
import MeasurementCharts from "./MeasurementCharts.jsx";
import MeasurementForm from "./MeasurementForm.jsx";
import { formatShort } from "../../lib/dates.js";

export default function ProgressionView({ phase }) {
  const exercises = getActiveExercises(phase.meta.id);
  const { measurements, loading, error, add, remove } = useMeasurements();

  return (
    <section className="flex flex-col gap-6">
      <header>
        <p className="overline text-ink-mute">Progression</p>
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1 leading-tight">
          Tendances et mesures
        </h2>
        <p className="text-sm text-ink-soft mt-1 max-w-prose">
          Compliance, sensation VMO, déficit d'extension. Juste l'essentiel pour voir si on avance.
        </p>
      </header>

      {error && (
        <p className="text-sm text-amber-deep bg-amber-wash border border-amber/30 rounded-lg px-4 py-3">
          Erreur de chargement. {String(error.message ?? error)}
        </p>
      )}

      <ComplianceChart exercises={exercises} />

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-4 lg:gap-6 items-start">
        <div className="flex flex-col gap-4">
          {loading ? (
            <p className="text-sm text-ink-mute">Chargement...</p>
          ) : (
            <MeasurementCharts measurements={measurements} />
          )}
          {measurements.length > 0 && (
            <details className="bg-paper-card border border-rule-soft rounded-2xl">
              <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-ink-soft hover:text-ink select-none">
                Historique des mesures, {measurements.length}
              </summary>
              <ul className="px-4 pb-4 flex flex-col gap-1.5">
                {measurements
                  .slice()
                  .reverse()
                  .map((m) => (
                    <li
                      key={m.id}
                      className="grid grid-cols-[auto_1fr_auto_auto_auto] items-baseline gap-3 text-xs font-mono py-2 border-t border-rule-soft"
                    >
                      <span className="text-ink-mute">
                        {formatShort(m.measured_on)}
                      </span>
                      <span className="text-ink-soft truncate">
                        {m.notes || "—"}
                      </span>
                      <span className="text-ink tabular-nums">
                        Ext {m.extension_deficit_degrees ?? "—"}°
                      </span>
                      <span className="text-ink tabular-nums">
                        VMO {m.vmo_quality ?? "—"}/10
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm("Supprimer cette mesure ?")) remove(m.id);
                        }}
                        className="text-ink-mute hover:text-amber-deep"
                        aria-label="Supprimer"
                      >
                        ×
                      </button>
                    </li>
                  ))}
              </ul>
            </details>
          )}
        </div>
        <MeasurementForm onSubmit={add} />
      </div>
    </section>
  );
}
