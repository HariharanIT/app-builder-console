import React, {createContext, useState, useContext} from 'react';

interface ApiStatusContext {
  apiLoading: boolean;
  APIError: string;
  setAPIError: (error: string) => void;
  setLoading: (loading: boolean, loadingMessage?: string) => void;
  loadingMessage: string;
}

const ApiStatusContext = createContext(null as unknown as ApiStatusContext);

export function ApiStatusProvider({children}: React.PropsWithChildren<{}>) {
  const [APIError, setAPIError] = useState<string>('');
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [loading, setLoader] = useState<boolean>(false);
  const setLoading = (isLoading: boolean, loadingMessage?: string) => {
    setLoader(isLoading);
    if (loadingMessage) setLoadingMessage(loadingMessage);
  };
  return (
    <ApiStatusContext.Provider
      value={{
        APIError,
        setAPIError,
        apiLoading: loading,
        setLoading,
        loadingMessage,
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
