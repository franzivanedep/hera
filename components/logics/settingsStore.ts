import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

const key = "settings";
type Settings = { notifications: boolean; darkMode: boolean };

const defaults: Settings = { notifications: true, darkMode: false };

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaults);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(key);
        if (raw) setSettings(JSON.parse(raw));
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const update = async (patch: Partial<Settings>) => {
    const next = { ...settings, ...patch };
    setSettings(next);
    await AsyncStorage.setItem(key, JSON.stringify(next));
  };

  return { settings, update, ready };
};
