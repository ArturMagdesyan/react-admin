import { Route, Routes, Navigate } from 'react-router-dom';
import { Alarms } from './Alarms';
import { AlarmsProvider } from '../providers';

export const AlarmsRoutes = () => (
  <Routes>
    <Route
      path="unaccepted"
      element={(
        <AlarmsProvider type="A">
          <Alarms />
        </AlarmsProvider>
        )}
    />
    <Route
      path="unfinished"
      element={(
        <AlarmsProvider type="B">
          <Alarms />
        </AlarmsProvider>
        )}
    />
    <Route path="" element={<Navigate to="unaccepted" />} />
  </Routes>
);
