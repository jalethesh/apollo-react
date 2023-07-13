import { Global, css } from '@emotion/react';

export const GlobalStyle = () => {
  return (
    <Global
      styles={css`
        @font-face {
          font-family: 'SF Pro Text';
          src: url('/fonts/SFProText/SFProTextRegular.woff2') format('woff2');
        }

        @font-face {
          font-family: 'SF Pro Display';
          src: url('/fonts/SFProDisplay/SFProDisplayMedium.woff2')
            format('woff2');
        }

        * {
          box-sizing: border-box;
        }

        .screen {
          display: flex !important;
          flex-direction: column;
        }

        html,
        body,
        #__next {
          height: 100%;
          overflow: hidden;
          background-color: #000000;
        }
      `}
    />
  );
};
