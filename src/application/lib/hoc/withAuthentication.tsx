import React, { ComponentType } from 'react';

import { useAtomValue } from 'jotai/utils';
import { useRouter } from 'next/router';

import { accessTokenAtom } from '$application/lib/auth/store';

const withAuthentication = <P extends any>(
  Component: ComponentType<P>
): ((props) => JSX.Element | null) =>
  // eslint-disable-next-line react/display-name
  function (props) {
    const accessTokenValue = useAtomValue(accessTokenAtom);

    const isAuthenticated = !!accessTokenValue;
    const router = useRouter();
    if (!isAuthenticated) {
      router.replace({
        pathname: '/login',
        query: { referrer: router.pathname },
      });
      return null;
    } else {
      return <Component {...props} />;
    }
  };

export default withAuthentication;
