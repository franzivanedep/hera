import React, { createContext, useState, useContext } from "react";

interface ApiErrorContextType {
  error: string | null;
  setError: (msg: string | null) => void;
}

const ApiErrorContext = createContext<ApiErrorContextType>({
  error: null,
  setError: () => {},
});

export const useApiError = () => useContext(ApiErrorContext);

export const ApiErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  return (
    <ApiErrorContext.Provider value={{ error, setError }}>
      {children}
    </ApiErrorContext.Provider>
  );
};
