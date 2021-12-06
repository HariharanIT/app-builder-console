import React, {createContext, useState, useContext} from 'react';

interface ApiStatusContext {
  apiLoading: boolean;
  APIError: string;
  setAPIError: (error: string) => void;
  setLoading: (loading: boolean) => void;
}

const ApiStatusContext = createContext(null as unknown as ApiStatusContext);

export function ApiStatusProvider({children}: React.PropsWithChildren<{}>) {
  const [APIError, setAPIError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <ApiStatusContext.Provider
      value={{
        APIError,
        setAPIError,
        apiLoading: loading,
        setLoading,
      }}>
      {children}
    </ApiStatusContext.Provider>
  );
}
export function useApiStatus() {
  const context = useContext(ApiStatusContext);
  if (context === undefined) {
    throw new Error(`useApiStatus must be used within a ApiStatusContext`);
  }
  return context;
}

export default ApiStatusContext;
