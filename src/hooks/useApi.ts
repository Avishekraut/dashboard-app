import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setLoading } from "../store/loadingSlice";

export function useApi<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading(true));
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to fetch");
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err as Error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [url, dispatch]);

  return { data, error };
}
