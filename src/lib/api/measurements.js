import { supabase } from "../supabase.js";

export async function listMeasurements(limit = 120) {
  const { data, error } = await supabase
    .from("measurements")
    .select("*")
    .order("measured_on", { ascending: true })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function createMeasurement(payload) {
  const { data, error } = await supabase
    .from("measurements")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteMeasurement(id) {
  const { error } = await supabase.from("measurements").delete().eq("id", id);
  if (error) throw error;
}
