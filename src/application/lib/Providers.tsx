import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';

import NotificationProvider from '$application/components/NotificationProvider';
import { QueryProvider } from '$application/lib/QueryProvider';
import { GlobalStyle } from '$application/theme/GlobalStyles';
import { MyAppProps } from '$pages/_app';

import AlertModalProvider from './AlertModalProvider';
import { AuthProvider } from './auth/AuthProvider';
import { ReactQueryProviders } from './ReactQueryProvider';
import { ThemeProvider } from './ThemeProvider';

interface ProvidersProps
  extends Pick<MyAppProps, 'emotionCache' | 'pageProps'> {
  children: JSX.Element;
}

export const Providers = ({
  children,
  emotionCache,
  pageProps,
}: ProvidersProps) => {
  TimeAgo.addLocale(en);
  return (
    <QueryProvider>
      <ReactQueryProviders>
        <ThemeProvider emotionCache={emotionCache}>
          <GlobalStyle />
          <NotificationProvider>
            <AlertModalProvider>
              <AuthProvider>{children}</AuthProvider>
            </AlertModalProvider>
          </NotificationProvider>
        </ThemeProvider>
      </ReactQueryProviders>
    </QueryProvider>
  );
};

export default Providers;
