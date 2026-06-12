// Palette des graphiques recharts, accordée au thème dark athlétique.
// Recharts prend des couleurs en dur (pas de classes Tailwind), on
// centralise ici les valeurs alignées sur les tokens de index.css.

export const chartTheme = {
  grid: "#23262b",
  axis: "#6b7177",
  axisLine: "#2f343b",
  tooltipBg: "#17191c",
  tooltipBorder: "#2f343b",
  tooltipLabel: "#9aa0a6",
};

// Séries empilées : data viz multi-couleurs lisibles sur fond sombre.
// C'est l'exception assumée à la règle de l'accent unique.
export const seriesColors = ["#ff5a1f", "#4f9cd1", "#3fa968", "#d98a3d"];

// Lignes simples, accent par métrique.
export const lineAccents = {
  accent: { stroke: "#ff5a1f", fill: "rgba(255, 90, 31, 0.10)" },
  amber: { stroke: "#d98a3d", fill: "rgba(217, 138, 61, 0.10)" },
  moss: { stroke: "#3fa968", fill: "rgba(63, 169, 104, 0.10)" },
};
