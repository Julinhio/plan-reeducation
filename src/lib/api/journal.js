import { supabase } from "../supabase.js";

export async function getEntry(dateKey) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("entry_date", dateKey)
    .maybeSingle();
  if (error) throw error;
  return data;
}

export async function listEntries(limit = 60) {
  const { data, error } = await supabase
    .from("journal_entries")
    .select("*")
    .order("entry_date", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data ?? [];
}

export async function upsertEntry(payload) {
  const { data, error } = await supabase
    .from("journal_entries")
    .upsert(payload, { onConflict: "entry_date" })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteEntry(dateKey) {
  const { error } = await supabase
    .from("journal_entries")
    .delete()
    .eq("entry_date", dateKey);
  if (error) throw error;
}
