import { supabase } from "../supabase.js";
import { toDateKey } from "../dates.js";

export async function listSessionsForDate(dateKey) {
  const { data, error } = await supabase
    .from("exercise_sessions")
    .select("*")
    .eq("session_date", dateKey)
    .order("created_at", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function listSessionsRange(fromDate, toDate) {
  const { data, error } = await supabase
    .from("exercise_sessions")
    .select("*")
    .gte("session_date", toDateKey(fromDate))
    .lte("session_date", toDateKey(toDate))
    .order("session_date", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createSession(payload) {
  const { data, error } = await supabase
    .from("exercise_sessions")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteSession(id) {
  const { error } = await supabase
    .from("exercise_sessions")
    .delete()
    .eq("id", id);
  if (error) throw error;
}
