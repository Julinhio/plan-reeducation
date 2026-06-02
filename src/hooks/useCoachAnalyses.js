import { useCallback, useEffect, useState } from "react";
import { askCoach, listAnalyses } from "../lib/api/coach.js";

export function useCoachAnalyses() {
  const [analyses, setAnalyses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [asking, setAsking] = useState(false);
  const [newestId, setNewestId] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const data = await listAnalyses();
      setAnalyses(data);
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

  const ask = useCallback(async ({ promptType, userPrompt, model }) => {
    setAsking(true);
    setError(null);
    try {
      const result = await askCoach({ promptType, userPrompt, model });
      const optimistic = {
        id: result.analysisId,
        created_at: result.createdAt,
        prompt_type: result.promptType,
        user_prompt: result.userPrompt,
        response: result.response,
        model_used: result.model,
      };
      setAnalyses((prev) => [optimistic, ...prev]);
      setNewestId(result.analysisId);
      return optimistic;
    } catch (e) {
      setError(e);
      throw e;
    } finally {
      setAsking(false);
    }
  }, []);

  return { analyses, loading, error, asking, ask, reload, newestId };
}
