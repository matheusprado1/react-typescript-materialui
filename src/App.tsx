import { BrowserRouter } from 'react-router';

import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/contexts/ThemeContext';
import { SideMenu } from './shared/components';

export const App = () => {
  return (
    <AppThemeProvider>
      <BrowserRouter>
        <SideMenu>
          <AppRoutes />
        </SideMenu>
      </BrowserRouter>
    </AppThemeProvider>
  );
};
