import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Notifications } from './Notifications';
import { NotificationsProvider } from '../providers';

export const NotificationsRoutes = () => (
  <Routes>
    <Route
      path=""
      element={(
        <NotificationsProvider>
          <Notifications />
        </NotificationsProvider>
      )}
    />
  </Routes>
);
