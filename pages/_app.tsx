import React from 'react';
import Head from 'next/head';
import {AppProps} from 'next/app';
import {ThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../components/theme';
import Router from 'next/router';
import ProtectedRoutes from '../components/ProtectedRoutes';
// @ts-ignore
import withGA from 'next-ga';
import {MDXProvider} from '@mdx-js/react';
import components from '../MDXComponents';
import Header from '../components/Header';
import '../styles.css';
function MyApp(props: AppProps) {
  const {Component, pageProps} = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Agora App Builder</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ThemeProvider theme={theme}>
        <MDXProvider components={components}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {/* <Header /> */}
          {/* <ProtectedRoutes> */}
            <Component {...pageProps} />
          {/* </ProtectedRoutes> */}
        </MDXProvider>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default withGA('UA-180502649-1', Router)(MyApp);
