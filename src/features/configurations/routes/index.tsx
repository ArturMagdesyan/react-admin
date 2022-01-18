import { Route, Routes, Navigate } from 'react-router-dom';
import { Configurations } from './Configurations';
import { ConfigurationsProvider } from '../providers';

export const ConfigurationsRoutes = () => (
  <>
    <Routes>
      <Route
        path=""
        element={(
          <ConfigurationsProvider>
            <Configurations />
          </ConfigurationsProvider>
        )}
      />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  </>
);
