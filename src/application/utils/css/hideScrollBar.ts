import { css } from '@emotion/react';

export const hideScrollBar = css`
  -ms-overflow-style: none; /* IE */
  scrollbar-width: none; /* fireFox */
  ::-webkit-scrollbar {
    display: none; /* Chrome and Safari */
  }
`;
