import { useEffect, useState } from 'react';

import { EmotionCache } from '@emotion/cache';
import {
  Stack,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Box,
} from '@mui/material';
import type { AppProps } from 'next/app';
import { DeviceFrameset } from 'react-device-frameset';

import NotificationProvider from '$application/components/NotificationProvider';
import { AuthProvider } from '$application/lib/auth/AuthProvider';
import { Providers } from '$application/lib/Providers';
import '$application/utils/marvel-devices.min.css';

import '$application/theme/fonts';

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp = ({ Component, pageProps, emotionCache }: MyAppProps) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'), { noSsr: false });
  const [screenMatch, setScreenMatch] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (isMounted) {
      setScreenMatch(matches);
      setReady(true);
    }
  }, [isMounted]);
  return (
    <Providers pageProps={pageProps} emotionCache={emotionCache}>
      <AuthProvider>
        <NotificationProvider>
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{
              height: '100%',
              minWidth: (_theme) => `${_theme.breakpoints.values.xs}px`,
              '& > .screen': { display: 'flex' },
            }}
          >
            {isMounted && ready ? (
              screenMatch ? (
                <DeviceFrameset device="iPhone X">
                  {/* @ts-ignore*/}
                  <Component {...pageProps} />
                </DeviceFrameset>
              ) : (
                // @ts-ignore
                <Component {...pageProps} />
              )
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh',
                }}
              >
                <CircularProgress />
              </Box>
            )}
          </Stack>
        </NotificationProvider>
      </AuthProvider>
    </Providers>
  );
};

export default MyApp;
