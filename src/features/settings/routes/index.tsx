import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { SettingsProvider } from '../providers';
import { Settings } from './Settings';

export const SettingsRoutes = () => (
  <Routes>
    <Route
      path=""
      element={(
        <SettingsProvider>
          <Settings />
        </SettingsProvider>
      )}
    />
    <Route path="*" element={<Navigate to="." />} />
  </Routes>
);
