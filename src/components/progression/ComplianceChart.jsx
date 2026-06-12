import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { subDays } from "date-fns";
import { toDateKey, formatShort } from "../../lib/dates.js";
import { useSessionsRange } from "../../hooks/useSessions.js";
import { chartTheme, seriesColors } from "../../lib/chartTheme.js";

const COLORS = seriesColors;

export default function ComplianceChart({ exercises }) {
  const today = new Date();
  const from = useMemo(() => subDays(today, 13), []);
  const fromKey = toDateKey(from);
  const toKey = toDateKey(today);
  const { sessions, loading } = useSessionsRange(fromKey, toKey);

  const { data, keys } = useMemo(() => {
    const days = [];
    for (let i = 0; i < 14; i++) {
      const d = subDays(today, 13 - i);
      days.push({ key: toDateKey(d), label: formatShort(d) });
    }
    const exerciseKeys = exercises.map((e) => e.key);
    const grid = days.map((day) => {
      const row = { label: day.label, key: day.key };
      for (const exKey of exerciseKeys) {
        row[exKey] = 0;
      }
      return row;
    });

    for (const s of sessions) {
      const row = grid.find((r) => r.key === s.session_date);
      if (row && row[s.exercise_key] !== undefined) {
        row[s.exercise_key] += 1;
      }
    }

    return { data: grid, keys: exerciseKeys };
  }, [sessions, exercises]);

  return (
    <article className="bg-paper-card border border-rule-soft rounded-2xl p-4 sm:p-5">
      <header className="mb-3 flex items-baseline justify-between gap-2 flex-wrap">
        <div>
          <p className="overline text-ink-mute">Compliance, 14 derniers jours</p>
          <p className="text-xs text-ink-mute mt-0.5">
            Sessions loggées par exercice et par jour.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2 text-xs">
          {exercises.map((ex, i) => (
            <li
              key={ex.key}
              className="inline-flex items-center gap-1.5 text-ink-soft"
            >
              <span
                className="w-2.5 h-2.5 rounded-sm"
                style={{ background: COLORS[i % COLORS.length] }}
              />
              {ex.title}
            </li>
          ))}
        </ul>
      </header>

      {loading ? (
        <p className="text-sm text-ink-mute">Chargement...</p>
      ) : (
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 12, right: 8, left: -4, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 6"
                stroke={chartTheme.grid}
                vertical={false}
              />
              <XAxis
                dataKey="label"
                stroke={chartTheme.axis}
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: chartTheme.axisLine }}
              />
              <YAxis
                allowDecimals={false}
                stroke={chartTheme.axis}
                fontSize={11}
                tickLine={false}
                axisLine={{ stroke: chartTheme.axisLine }}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                contentStyle={{
                  background: chartTheme.tooltipBg,
                  border: `1px solid ${chartTheme.tooltipBorder}`,
                  borderRadius: 10,
                  fontSize: 12,
                  fontFamily: "var(--font-mono)",
                  color: "#f7f8f9",
                }}
                labelStyle={{ color: chartTheme.tooltipLabel }}
              />
              {keys.map((key, i) => (
                <Bar
                  key={key}
                  dataKey={key}
                  stackId="a"
                  fill={COLORS[i % COLORS.length]}
                  isAnimationActive={false}
                  radius={i === keys.length - 1 ? [3, 3, 0, 0] : 0}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </article>
  );
}
