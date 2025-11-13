// src/context/NetworkProvider.tsx
import React, { createContext, useEffect, useState, ReactNode } from "react";
import NetInfo from "@react-native-community/netinfo";

// Define the context type
interface NetworkContextType {
  isOnline: boolean;
}

// Create the context with a default value
export const NetworkContext = createContext<NetworkContextType>({
  isOnline: true,
});

interface Props {
  children: ReactNode;
}

export const NetworkProvider: React.FC<Props> = ({ children }) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? true);
    });
    return () => unsubscribe();
  }, []);

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
};
