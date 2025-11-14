import axios from "axios";
import { useApiError } from "../context/ApiErrorProvider";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 10000,
});

export const useApi = () => {
  const { setError } = useApiError();

  const request = async (config: any) => {
    try {
      const res = await api(config);
      return res.data;
    } catch (err: any) {
      console.log("API Error:", err.message);
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
      // Auto clear error after 5 seconds
      setTimeout(() => setError(null), 5000);
      throw err;
    }
  };

  return { request };
};
