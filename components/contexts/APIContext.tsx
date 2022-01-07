import React, {createContext, useState, useContext, useMemo} from 'react';
import {Box} from '@material-ui/core';
import {makeStyles, Theme} from '@material-ui/core/styles';
import {Snackbar, Backdrop, CircularProgress} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

interface ApiStatusContext {
  setAPIError: (error: string) => void;
  setLoading: (loading: boolean, loadingMessage?: string) => void;
}

const ApiStatusContext = createContext(null as unknown as ApiStatusContext);

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useBackDropStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: '#099DFD',
    display: 'flex',
    alignItems: 'column',
  },
}));

export function ApiStatusProvider({children}: React.PropsWithChildren<{}>) {
  const BackDropStyle = useBackDropStyles();
  const [APIError, setAPIError] = useState<string>('');
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [loading, setLoader] = useState<boolean>(false);
  const setLoading = (
    isLoading: boolean,
    loadingMessage: string | undefined = 'Loading',
  ) => {
    setLoader(isLoading);
    if (loadingMessage) setLoadingMessage(loadingMessage);
  };
  // since, this is a global API context, and it's value is being used within this component,
  // children are used just to trigger the state, we use useMemo to avoid unnecessart rerenders.
  const value = useMemo(
    () => ({
      setAPIError,
      setLoading,
    }),
    [],
  );
  return (
    <ApiStatusContext.Provider value={value}>
      {children}
      <Backdrop className={BackDropStyle.backdrop} open={loading}>
        {loading && loadingMessage && (
          <Box color="#fff" fontSize="24">
            {loadingMessage}
          </Box>
        )}
        <Box>
          <CircularProgress color="inherit" />
        </Box>
      </Backdrop>
      <Snackbar
        open={APIError !== ''}
        autoHideDuration={6000}
        onClose={() => {
          setAPIError('');
        }}>
        <Alert
          onClose={() => {
            setAPIError('');
          }}
          severity="error">
          {APIError}
        </Alert>
      </Snackbar>
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
