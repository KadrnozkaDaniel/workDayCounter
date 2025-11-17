import { theme } from 'theme';
import { BrowserRouter } from 'react-router-dom';
import { Router } from 'Router';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

export const App = () => {
  return (
    <StyledEngineProvider injectFirst>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Router />
        </ThemeProvider>
      </BrowserRouter>
    </StyledEngineProvider>
  );
};
