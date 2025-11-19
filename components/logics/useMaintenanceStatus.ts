import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from '../../config';

const BASE_URL = API_URL;

export function useMaintenanceStatus() {
  const [isMaintenance, setIsMaintenance] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const checkMaintenance = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/maintenance/status`);
        if (isMounted) setIsMaintenance(res.data.maintenance);
      } catch {
        if (isMounted) setIsMaintenance(false);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    // Run immediately + every 15 seconds
    checkMaintenance();
    const interval = setInterval(checkMaintenance, 15000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return { isMaintenance, loading };
}
