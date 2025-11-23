import React, { createContext, useState, useContext } from "react";

interface ApiErrorContextType {
  error: string | null;
  setError: (msg: string | null) => void;
  clearError: () => void;
}

const ApiErrorContext = createContext<ApiErrorContextType>({
  error: null,
  setError: () => {},
  clearError: () => {},
});

export const useApiError = () => useContext(ApiErrorContext);

export const ApiErrorProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  return (
    <ApiErrorContext.Provider value={{ error, setError, clearError }}>
      {children}
    </ApiErrorContext.Provider>
  );
};
