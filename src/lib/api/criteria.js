import { supabase } from "../supabase.js";

export async function listCriteria(targetPhase) {
  const { data, error } = await supabase
    .from("phase_criteria")
    .select("*")
    .eq("target_phase", targetPhase)
    .order("order_index", { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function updateCriterion(id, patch) {
  const { data, error } = await supabase
    .from("phase_criteria")
    .update(patch)
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data;
}
