import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

// SCREENS
const Home = lazy(() => import('./screens/Home'));

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};
