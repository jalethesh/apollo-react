import '$application/theme/fonts';
import { ReactNode, useEffect } from 'react';

import { EmotionCache } from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';

import createEmotionCache from '$application/createEmotionCache';
import { theme as baseTheme } from '$application/theme/theme';

const theme = createTheme(baseTheme);

interface ThemeProviderProps {
  fontFamily?: string;
  children: ReactNode;
  emotionCache?: EmotionCache;
}

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    fontFamily = 'Source Sans Pro',
    emotionCache = clientSideEmotionCache,
  } = props;

  useEffect(() => {
    document.body.style.fontFamily = fontFamily;
  }, [fontFamily]);

  return (
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {props.children}
      </MuiThemeProvider>
    </CacheProvider>
  );
};
