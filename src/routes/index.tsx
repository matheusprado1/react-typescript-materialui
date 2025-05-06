import { Routes, Route, Navigate } from 'react-router';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path='/pagina-inicial' element={<h1>Página Inicial</h1>} />

      <Route path='*' element={<Navigate to='/pagina-inicial' />} />
    </Routes>
  );
}
