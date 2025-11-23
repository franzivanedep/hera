// src/context/NetworkProvider.tsx
import React, { createContext, useEffect, useState, ReactNode } from "react";
import NetInfo, { NetInfoState, NetInfoStateType } from "@react-native-community/netinfo";

interface NetworkContextType {
  isOnline: boolean;
  isConnectionFast: boolean;
  refreshConnection: () => Promise<void>;
}

export const NetworkContext = createContext<NetworkContextType>({
  isOnline: true,
  isConnectionFast: true,
  refreshConnection: async () => {},
});

export function NetworkProvider({ children }: { children: ReactNode }) {
  const [isOnline, setIsOnline] = useState(true);
  const [isConnectionFast, setIsConnectionFast] = useState(true);

  const evaluateConnection = (state: NetInfoState) => {
    let fast = true;

    if (!state.isConnected) {
      fast = false;
    } else if (
      state.type === NetInfoStateType.cellular &&
      ["2g", "3g"].includes(state.details?.cellularGeneration || "")
    ) {
      fast = false;
    } else if (state.type === NetInfoStateType.none) {
      fast = false;
    }

    setIsOnline(state.isConnected || false);
    setIsConnectionFast(fast);
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(evaluateConnection);
    return () => unsubscribe();
  }, []);

  const refreshConnection = async () => {
    const state = await NetInfo.fetch();
    evaluateConnection(state);
  };

  return (
    <NetworkContext.Provider value={{ isOnline, isConnectionFast, refreshConnection }}>
      {children}
    </NetworkContext.Provider>
  );
}
