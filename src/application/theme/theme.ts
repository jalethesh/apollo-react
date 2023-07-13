import { ThemeOptions } from '@mui/material';

export const theme: ThemeOptions = {
  typography: {
    fontFamily: 'SF Pro Text',
    h1: {
      fontFamily: 'SF Pro Display',
      fontWeight: '700',
      fontSize: '2.125rem',
      letterSpacing: '0.023rem',
      lineHeight: '2.563rem',
    },
    h2: {
      fontFamily: 'SF Pro Display',
      fontWeight: '700',
      fontSize: '1.365rem',
      letterSpacing: '0.021875rem',
      lineHeight: '1.75rem',
    },
    h3: {
      fontFamily: 'SF Pro Display',
      fontWeight: '600',
      fontSize: '1.25rem',
      letterSpacing: '0.024rem',
      lineHeight: '1.5rem',
    },
    // h4: {
    //   fontFamily: 'SF Pro Display',
    //   fontWeight: '700',
    //   fontSize: '2.125rem',
    //   letterSpacing: '0.023rem',
    //   lineHeight: '2.563rem',
    // },
    h5: {
      fontFamily: 'SF Pro Display',
      fontWeight: '700',
      fontSize: '1.75rem',
      letterSpacing: '0.023rem',
      lineHeight: '2.088rem',
    },
    h6: {
      fontFamily: 'SF Pro Display',
      fontWeight: '700',
      fontSize: '1.375rem',
      letterSpacing: '0.022rem',
      lineHeight: '1.75rem',
    },
    body1: {
      fontFamily: 'SF Pro Text',
      fontWeight: '400',
      fontSize: '1.0625rem',
      lineHeight: '1.375rem',
      letterSpacing: '-0.0255rem',
    },
    body2: {
      fontFamily: 'SF Pro Text',
      fontWeight: '600',
      fontSize: '1.063rem',
      lineHeight: '1.375rem',
      letterSpacing: '-0.026rem',
    },
    caption: {
      fontFamily: 'SF Pro Text',
      fontWeight: '400',
      fontSize: '0.813rem',
      lineHeight: '1.125rem',
      letterSpacing: '-0.005rem',
      color: 'rgba(60, 60, 67, 0.6)',
    },
  },
  breakpoints: {
    values: {
      xs: 360,
      sm: 400,
      md: 1024,
      lg: 1280,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: '#007AFF',
      light: '#8E87DF',
    },
    secondary: {
      main: '#04bfbf',
      dark: '#06a1a1',
      '100': '#43cfcf',
      '200': '#81dfdf',
      light: '#c0efef',
      contrastText: '#fff',
    },
    success: {
      main: '#40C800',
      dark: '#248A3D',
      '100': '#53c5b0',
      '200': '#8dd9cb',
      light: '#c6ece5',
    },
    info: {
      main: '#03b9ff',
      dark: '#00a5e5',
      '100': '#42cbff',
      '200': '#81dcff',
      light: '#c0eeff',
    },
    error: {
      main: '#ff0000',
      dark: '#b51d00',
      '100': '#f6927e',
      '200': '#f8b5a8',
      light: '#fcdad4',
    },
    warning: {
      main: '#f5d650',
      dark: '#ecc622',
      '100': '#f7e07b',
      '200': '#faeaa7',
      light: '#fcf4d4',
    },
    grey: {
      '100':
        'linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), #C2C9D1',
      '200': '#3C3C43',
      '300': '#8E8E93',
      '400': '#AEAEB2',
      '500': '#C7C7CC',
      '600': '#D1D1D6',
      '700': '#E5E5EA',
      '800': '#fafafacc',
      '900': '#fff',
    },
    text: {
      primary: '#000000',
      secondary: '#4E5765',
      disabled: '#a1a1a1',
    },
  },
};