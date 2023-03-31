import Head from 'next/head';
import { CacheProvider } from '@emotion/react';

import authReducer from "./state/index";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/integration/react';
import { createWrapper } from 'next-redux-wrapper';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { AuthConsumer, AuthProvider } from 'src/contexts/auth-context';
import { useNProgress } from 'src/hooks/use-nprogress';
import { createTheme } from 'src/theme';
import { createEmotionCache } from 'src/utils/create-emotion-cache';
import 'simplebar-react/dist/simplebar.min.css';
import { Provider } from 'react-redux';

const persistConfig = { key: "root", storage, version:1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const wrapper = createWrapper(() => store);

const clientSideEmotionCache = createEmotionCache();

const SplashScreen = () => null;

const App = (params) => {
  const { Component, emotionCache = clientSideEmotionCache, ...rest } = params;

  useNProgress();

  const getLayout = Component.getLayout ?? ((page) => page);

  const theme = createTheme();

  const {store, props} = wrapper.useWrappedStore(rest);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <title>
          KT&G NEXT
        </title>
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistStore(store)}>
            <AuthProvider>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthConsumer>
                  {
                    (auth) => auth.isLoading
                      ? <SplashScreen />
                      : getLayout(<Component {...props.pageProps} />)
                  }
                </AuthConsumer>
              </ThemeProvider>
            </AuthProvider>
          </PersistGate>
        </Provider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
