import type { FC } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Router from 'next/router';

import nProgress from 'nprogress';
import { SnackbarProvider } from 'notistack';

import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/cache';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '../theme';
import { createEmotionCache } from '../utils/create-emotion-cache';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';


import ApplicationProvider from '../contexts/applicationContext';

type EnhancedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

Router.events.on('routeChangeStart', nProgress.start);
Router.events.on('routeChangeError', nProgress.done);
Router.events.on('routeChangeComplete', nProgress.done);

const clientSideEmotionCache = createEmotionCache();

const App: FC<EnhancedAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>Next App built with MUI</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

        <ThemeProvider theme={createTheme({ mode: 'light' })}>
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={2000}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <CssBaseline />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <ApplicationProvider>
                <Component {...pageProps} />
              </ApplicationProvider>
            </LocalizationProvider>
          </SnackbarProvider>
        </ThemeProvider>
    </CacheProvider>
  );
};

export default App;
