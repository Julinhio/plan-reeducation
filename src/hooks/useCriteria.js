import { useCallback, useEffect, useState } from "react";
import { listCriteria, updateCriterion } from "../lib/api/criteria.js";

export function useCriteria(targetPhase) {
  const [criteria, setCriteria] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listCriteria(targetPhase);
      setCriteria(data);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [targetPhase]);

  useEffect(() => {
    reload();
  }, [reload]);

  const update = useCallback(async (id, patch) => {
    const saved = await updateCriterion(id, patch);
    setCriteria((prev) => prev.map((c) => (c.id === id ? saved : c)));
    return saved;
  }, []);

  return { criteria, loading, error, reload, update };
}
