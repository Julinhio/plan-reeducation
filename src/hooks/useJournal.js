import { useCallback, useEffect, useState } from "react";
import {
  getEntry,
  listEntries,
  upsertEntry,
  deleteEntry,
} from "../lib/api/journal.js";

export function useJournalEntry(dateKey) {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getEntry(dateKey);
      setEntry(data);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [dateKey]);

  useEffect(() => {
    reload();
  }, [reload]);

  const save = useCallback(async (payload) => {
    const saved = await upsertEntry(payload);
    setEntry(saved);
    return saved;
  }, []);

  const remove = useCallback(async () => {
    await deleteEntry(dateKey);
    setEntry(null);
  }, [dateKey]);

  return { entry, loading, error, save, remove, reload };
}

export function useJournalHistory(limit = 60) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listEntries(limit);
      setEntries(data);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    reload();
  }, [reload]);

  return { entries, loading, error, reload };
}
