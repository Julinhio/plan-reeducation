import { useCallback, useEffect, useState } from "react";
import {
  createMeasurement,
  deleteMeasurement,
  listMeasurements,
} from "../lib/api/measurements.js";

export function useMeasurements() {
  const [measurements, setMeasurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listMeasurements();
      setMeasurements(data);
      setError(null);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const add = useCallback(async (payload) => {
    const created = await createMeasurement(payload);
    setMeasurements((prev) =>
      [...prev, created].sort((a, b) =>
        a.measured_on.localeCompare(b.measured_on)
      )
    );
    return created;
  }, []);

  const remove = useCallback(async (id) => {
    await deleteMeasurement(id);
    setMeasurements((prev) => prev.filter((m) => m.id !== id));
  }, []);

  return { measurements, loading, error, reload, add, remove };
}
