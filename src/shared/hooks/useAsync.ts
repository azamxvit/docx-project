import { useState, useCallback } from "react";

export function useAsync<T>(asyncFn: () => Promise<T>) {
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async (): Promise<T | null> => {
    try {
      setLoading(true);
      setError(null);

      const result = await asyncFn();
      setValue(result);

      return result;
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
      return null;
    } finally {
      setLoading(false);
    }
  }, [asyncFn]);

  return { execute, loading, value, error };
}
