import { createTheme } from '@mui/material/styles'
import Silka from './assets/fonts/Silka.ttf'

const theme = createTheme({
  palette: {
    common: {
      black: '#06152B',
      greyDark: '#7E7E7E',
      greyLight: '#D9E1E7',
      shadow: 'rgba(0,123,255,.25)',
      white: '#fff',
    },
    background: {
      default: '#fff',
      blueLight: '#f1f4fa',
    },
    primary: {
      light: 'rgba(51, 51, 51, 0.3)',
      main: 'rgba(18, 50, 145, 1)',
      dark: 'rgba(51, 51, 51, 0.8)',
      contrastText: '#fff',
    },
    secondary: {
      main: '#E5E5E5',
    },
    input: {
      light: 'rgba(254, 0, 130, 0.3)',
      main: 'rgba(237, 241, 253, 1)',
      dark: 'rgba(254, 0, 130, 0.8)',
      contrastText: 'rgba(18, 50, 145, 1)',
    },
    secondInput: {
      light: 'rgba(254, 0, 130, 0.3)',
      main: 'rgba(217, 225, 231, 1)',
      dark: 'rgba(254, 0, 130, 0.8)',
      contrastText: 'rgba(6, 21, 43, 1)',
    },
    error: {
      light: 'rgba(240, 94, 45, 0.3)',
      main: 'rgba(255, 5, 0, 1)',
      dark: 'rgba(255, 5, 0, 1)',
      contrastText: '#fff',
    },
    text: {
      primary: 'rgba(18, 50, 145, 1)',
      secondary: 'rgba(255, 255, 255, 1)',
      error: 'rgba(255, 5, 0, 1)',
    },
  },
  typography: {
    fontFamily: ['Silka'].join(','),
    fontSize: 16,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Silka';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Silka'), local('Silka-regular'), url(${Silka}) format('truetype');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
})

export default theme
