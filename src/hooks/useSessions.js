import { useCallback, useEffect, useState } from "react";
import {
  createSession,
  deleteSession,
  listSessionsForDate,
  listSessionsRange,
} from "../lib/api/sessions.js";

export function useSessionsForDate(dateKey) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listSessionsForDate(dateKey);
      setSessions(data);
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

  const add = useCallback(
    async (payload) => {
      const created = await createSession(payload);
      setSessions((prev) => [...prev, created]);
      return created;
    },
    []
  );

  const remove = useCallback(async (id) => {
    await deleteSession(id);
    setSessions((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return { sessions, loading, error, reload, add, remove };
}

export function useSessionsRange(from, to) {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    listSessionsRange(from, to)
      .then((data) => {
        if (alive) {
          setSessions(data);
          setError(null);
        }
      })
      .catch((e) => alive && setError(e))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [from, to]);

  return { sessions, loading, error };
}
