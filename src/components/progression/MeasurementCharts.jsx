import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { formatShort } from "../../lib/dates.js";
import { chartTheme, lineAccents, seriesColors } from "../../lib/chartTheme.js";

export default function MeasurementCharts({ measurements }) {
  if (!measurements.length) {
    return (
      <p className="text-sm text-ink-mute italic">
        Pas encore de mesures. Saisis ta première mesure pour commencer à suivre l'évolution.
      </p>
    );
  }

  const data = measurements.map((m) => ({
    date: m.measured_on,
    label: formatShort(m.measured_on),
    deficit: toNum(m.extension_deficit_degrees),
    vmo: m.vmo_quality ?? null,
    thighOp: toNum(m.thigh_circ_op_cm),
    thighSain: toNum(m.thigh_circ_sain_cm),
    flexActive: m.flexion_active_degrees ?? null,
    flexPassive: m.flexion_passive_degrees ?? null,
  }));

  const hasThigh = data.some((d) => d.thighOp !== null || d.thighSain !== null);
  const hasFlex = data.some((d) => d.flexActive !== null || d.flexPassive !== null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard
        title="Circonférence de cuisse"
        subtitle="En cm, l'écart op/sain mesure l'atrophie quadri"
        data={data}
        unit=" cm"
        yDomain={["auto", "auto"]}
        series={[
          { dataKey: "thighOp", name: "Opérée", stroke: lineAccents.accent.stroke },
          { dataKey: "thighSain", name: "Saine", stroke: seriesColors[1] },
        ]}
        empty={!hasThigh}
        emptyHint="Mètre-ruban, 10 cm au-dessus de la rotule, les deux cuisses."
      />
      <ChartCard
        title="Flexion"
        subtitle="En degrés, actif et passif (secteur 0-90° en phase 1)"
        data={data}
        unit="°"
        yDomain={[0, 160]}
        series={[
          { dataKey: "flexActive", name: "Active", stroke: lineAccents.accent.stroke },
          { dataKey: "flexPassive", name: "Passive", stroke: seriesColors[1] },
        ]}
        empty={!hasFlex}
        emptyHint="Estimation kiné ou goniomètre d'app mobile."
      />
      <ChartCard
        title="Déficit d'extension"
        subtitle="En degrés, plus bas = mieux"
        data={data}
        unit="°"
        yDomain={[0, "auto"]}
        invert
        series={[
          { dataKey: "deficit", name: "Déficit", stroke: lineAccents.amber.stroke },
        ]}
      />
      <ChartCard
        title="Qualité contraction VMO"
        subtitle="1 à 10, plus haut = mieux"
        data={data}
        unit="/10"
        yDomain={[0, 10]}
        series={[
          { dataKey: "vmo", name: "VMO", stroke: lineAccents.accent.stroke },
        ]}
      />
    </div>
  );
}

function toNum(v) {
  return v === null || v === undefined ? null : Number(v);
}

function ChartCard({ title, subtitle, data, unit, yDomain, invert, series, empty, emptyHint }) {
  return (
    <article className="bg-paper-card border border-rule-soft rounded-2xl p-4 sm:p-5">
      <header className="mb-3 flex items-baseline justify-between gap-2 flex-wrap">
        <div>
          <p className="overline text-ink-mute">{title}</p>
          <p className="text-xs text-ink-mute mt-0.5">{subtitle}</p>
        </div>
        {series.length > 1 && (
          <ul className="flex gap-3 text-xs">
            {series.map((s) => (
              <li key={s.dataKey} className="inline-flex items-center gap-1.5 text-ink-soft">
                <span
                  className="w-2.5 h-[3px] rounded-full"
                  style={{ background: s.stroke }}
                />
                {s.name}
              </li>
            ))}
          </ul>
        )}
      </header>
      {empty ? (
        <div className="h-56 grid place-items-center px-6">
          <p className="text-sm text-ink-mute italic text-center leading-relaxed">
            Pas encore de données. {emptyHint}
          </p>
        </div>
      ) : (
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 12, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 6" stroke={chartTheme.grid} vertical={false} />
              <XAxis
                dataKey="label"
                stroke={chartTheme.axis}
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: chartTheme.axisLine }}
              />
              <YAxis
                stroke={chartTheme.axis}
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: chartTheme.axisLine }}
                domain={yDomain}
                reversed={invert}
                allowDecimals={false}
                width={38}
              />
              <Tooltip
                contentStyle={{
                  background: chartTheme.tooltipBg,
                  border: `1px solid ${chartTheme.tooltipBorder}`,
                  borderRadius: 10,
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "#f7f8f9",
                }}
                formatter={(v, name) => [`${v}${unit}`, name]}
                labelStyle={{ color: chartTheme.tooltipLabel }}
              />
              {series.map((s) => (
                <Line
                  key={s.dataKey}
                  type="monotone"
                  dataKey={s.dataKey}
                  name={s.name}
                  stroke={s.stroke}
                  strokeWidth={2}
                  dot={{ r: 3, fill: s.stroke, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                  connectNulls
                  isAnimationActive={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}
