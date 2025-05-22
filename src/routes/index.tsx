import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard, PersonsListing } from '../pages';

export const AppRoutes = () => {
  const { setDrawerOptions } = useDrawerContext();

  useEffect(() => {
    setDrawerOptions([
      {
        icon: 'home',
        path: '/home',
        label: 'Página inicial',
      },
      {
        icon: 'people',
        path: '/persons',
        label: 'Pessoas',
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />

      <Route path="/persons" element={<PersonsListing />} />
      <Route path="/persons/detail/:id" element={<p>detalhe</p>} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
