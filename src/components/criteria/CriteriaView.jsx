import { useCriteria } from "../../hooks/useCriteria.js";
import { toDateKey, formatDay } from "../../lib/dates.js";

const STATUS_LABELS = {
  pending: "À valider",
  in_progress: "En cours",
  validated: "Validé",
};

const STATUS_STYLES = {
  pending: {
    chip: "bg-paper-deep text-ink-mute border-rule",
    dot: "bg-ink-faint",
    card: "border-rule-soft",
  },
  in_progress: {
    chip: "bg-amber-wash text-amber-deep border-amber/30",
    dot: "bg-amber",
    card: "border-amber/30 bg-amber-wash/40",
  },
  validated: {
    chip: "bg-moss-wash text-moss-deep border-moss/30",
    dot: "bg-moss",
    card: "border-moss/40 bg-moss-wash/40",
  },
};

const STATUSES = ["pending", "in_progress", "validated"];

export default function CriteriaView({ targetPhase }) {
  const { criteria, loading, error, update } = useCriteria(targetPhase);

  async function handleStatus(crit, nextStatus) {
    const patch = { status: nextStatus };
    if (nextStatus === "validated" && !crit.validated_on) {
      patch.validated_on = toDateKey(new Date());
    } else if (nextStatus !== "validated") {
      patch.validated_on = null;
    }
    try {
      await update(crit.id, patch);
    } catch (err) {
      console.error(err);
      alert("Erreur, voir console.");
    }
  }

  return (
    <section className="flex flex-col gap-6">
      <header>
        <p className="overline text-ink-mute">Critères</p>
        <h2 className="font-display text-2xl sm:text-3xl font-medium text-ink mt-1 leading-tight">
          Entrée en phase {targetPhase}
        </h2>
        <p className="text-sm text-ink-soft mt-1 max-w-prose">
          Coche au fil de l'eau. On ne change pas de phase tant qu'au moins les
          critères verts ne sont pas tous validés.
        </p>
      </header>

      {error && (
        <p className="text-sm text-amber-deep bg-amber-wash border border-amber/30 rounded-lg px-4 py-3">
          Erreur de chargement. {String(error.message ?? error)}
        </p>
      )}

      {loading ? (
        <p className="text-sm text-ink-mute">Chargement...</p>
      ) : criteria.length === 0 ? (
        <p className="text-sm text-ink-mute italic">
          Pas encore de critères pour cette phase, à seeder ou à préciser.
        </p>
      ) : (
        <ol className="flex flex-col gap-3">
          {criteria.map((c) => {
            const s = STATUS_STYLES[c.status] ?? STATUS_STYLES.pending;
            return (
              <li key={c.id}>
                <article
                  className={`bg-paper-card rounded-xl p-5 sm:p-6 border transition-colors duration-200 ${s.card}`}
                >
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2.5 mb-1">
                        <span className={`w-2 h-2 rounded-full ${s.dot}`} />
                        <span
                          className={`font-mono text-[10px] uppercase tracking-[0.14em] px-2 py-0.5 rounded-full border ${s.chip}`}
                        >
                          {STATUS_LABELS[c.status]}
                        </span>
                        {c.validated_on && (
                          <span className="font-mono text-[10px] text-ink-mute">
                            le {formatDay(c.validated_on)}
                          </span>
                        )}
                      </div>
                      <h3 className="font-display text-base sm:text-lg text-ink leading-snug">
                        {c.label}
                      </h3>
                      {c.description && (
                        <p className="mt-1.5 text-sm text-ink-soft leading-relaxed">
                          {c.description}
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 flex-shrink-0">
                      {STATUSES.map((status) => {
                        const isActive = c.status === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => handleStatus(c, status)}
                            className={[
                              "px-3 py-1.5 rounded-full text-xs font-medium btn-press border",
                              isActive
                                ? "bg-ink text-paper-soft border-ink"
                                : "bg-paper-soft text-ink-soft border-rule hover:border-rule-strong hover:text-ink",
                            ].join(" ")}
                          >
                            {STATUS_LABELS[status]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
