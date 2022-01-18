import { Route, Routes, Navigate } from 'react-router-dom';
import { Statistics } from './Statistics';

export const StatisticsRoutes = () => (
  <>
    <Routes>
      <Route path="" element={<Statistics />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  </>
);
