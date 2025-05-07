import { BrowserRouter } from 'react-router';

import { AppRoutes } from './routes';

import { ThemeProvider } from '@mui/material';
import { LightTheme } from './shared/themes';

export const App = () => {
  return (
    <ThemeProvider theme={LightTheme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
};
