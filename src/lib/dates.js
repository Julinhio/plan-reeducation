import { format, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export function toDateKey(date) {
  if (typeof date === "string") return date.slice(0, 10);
  return format(date, "yyyy-MM-dd");
}

export function fromDateKey(key) {
  return parseISO(key);
}

export function formatDay(date) {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "EEEE d MMMM", { locale: fr });
}

export function formatShort(date) {
  const d = typeof date === "string" ? parseISO(date) : date;
  return format(d, "d MMM", { locale: fr });
}

export function isToday(dateKey) {
  return dateKey === toDateKey(new Date());
}
