import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router';

import { useDrawerContext } from '../shared/contexts';
import { Dashboard, CityListing } from '../pages';

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
        icon: 'location_city',
        path: '/cities',
        label: 'Cidades',
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route path="/home" element={<Dashboard />} />

      <Route path="/cities" element={<CityListing />} />

      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
};
