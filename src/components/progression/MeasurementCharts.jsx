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
import { chartTheme, lineAccents } from "../../lib/chartTheme.js";

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
    deficit:
      m.extension_deficit_degrees === null
        ? null
        : Number(m.extension_deficit_degrees),
    vmo: m.vmo_quality ?? null,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartCard
        title="Déficit d'extension"
        subtitle="En degrés, plus bas = mieux"
        accent="amber"
        data={data}
        dataKey="deficit"
        unit="°"
        yDomain={[0, "auto"]}
        invert
      />
      <ChartCard
        title="Qualité contraction VMO"
        subtitle="1 à 10, plus haut = mieux"
        accent="accent"
        data={data}
        dataKey="vmo"
        unit="/10"
        yDomain={[0, 10]}
      />
    </div>
  );
}

function ChartCard({ title, subtitle, accent, data, dataKey, unit, yDomain, invert }) {
  const a = lineAccents[accent] ?? lineAccents.accent;
  return (
    <article className="bg-paper-card border border-rule-soft rounded-2xl p-4 sm:p-5">
      <header className="mb-3">
        <p className="overline text-ink-mute">{title}</p>
        <p className="text-xs text-ink-mute mt-0.5">{subtitle}</p>
      </header>
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
              formatter={(v) => [`${v}${unit}`, title]}
              labelStyle={{ color: chartTheme.tooltipLabel }}
            />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={a.stroke}
              strokeWidth={2}
              dot={{ r: 3, fill: a.stroke, strokeWidth: 0 }}
              activeDot={{ r: 5 }}
              connectNulls
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
}
