import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#7CD4FD' },
    secondary: { main: '#C4B5FD' },
    background: {
      default: '#0B1220',
      paper: '#0F172A',
    },
  },
  components: {},
  typography: {
    fontFamily: 'Ubuntu Sans, sans-serif',
  },
  shape: { borderRadius: 14 },
});
