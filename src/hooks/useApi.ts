import { useEffect, useState } from "react";
import axios from "axios";

interface ApiResponse<T> {
  products: T[];
  total: number;
  skip: number;
  limit: number;
}

export const useApi = <T = unknown>(url: string) => {
  const [data, setData] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get<ApiResponse<T>>(url);
        setData(res.data);
      } catch (err) {
        setError(err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, loading, error };
};
