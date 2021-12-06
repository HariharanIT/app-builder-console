import React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider, makeStyles, Theme} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import {ApolloProvider} from '@apollo/client';
import MuiAlert from '@material-ui/lab/Alert';
import client from '../graphql/apollo';
import theme from '../components/theme';
import Router from 'next/router';
import ProtectedRoutes from '../components/ProtectedRoutes';
// @ts-ignore
import withGA from 'next-ga';
import {MDXProvider} from '@mdx-js/react';
import {Snackbar, Backdrop, CircularProgress} from '@material-ui/core';
import components from '../MDXComponents';
import ApiStatusContext from '../components/contexts/APIContext';
import '../styles.css';

function Alert(props: any) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useBackDropStyles = makeStyles((theme: Theme) => ({
  backdrop: {
    zIndex: theme.zIndex.modal + 1,
    color: '#099DFD',
  },
}));

function MyApp(props: AppProps) {
  const {Component, pageProps} = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);
  const BackDropStyle = useBackDropStyles();
  const [APIError, setAPIError] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);

  return (
    <React.Fragment>
      <Head>
        <title>Agora App Builder</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <MDXProvider components={components}>
            <ApiStatusContext.Provider
              value={{
                setAPIError,
                setLoading,
                apiLoading: loading,
                APIError,
              }}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {/* <Header /> */}
              <ProtectedRoutes>
                <Component {...pageProps} />
                <Backdrop className={BackDropStyle.backdrop} open={loading}>
                  <CircularProgress color="inherit" />
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
              </ProtectedRoutes>
            </ApiStatusContext.Provider>
          </MDXProvider>
        </ThemeProvider>
      </ApolloProvider>
    </React.Fragment>
  );
}

export default withGA('UA-180502649-1', Router)(MyApp);
