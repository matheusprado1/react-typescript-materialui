import { BrowserRouter } from 'react-router';

import './shared/utils/yupTranslations';

import { AppThemeProvider, DrawerProvider } from './shared/contexts';
import { SideMenu } from './shared/components';
import { AppRoutes } from './routes';

export const App = () => {
  return (
    <AppThemeProvider>
      <DrawerProvider>
        <BrowserRouter>
          <SideMenu>
            <AppRoutes />
          </SideMenu>
        </BrowserRouter>
      </DrawerProvider>
    </AppThemeProvider>
  );
};
