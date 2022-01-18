import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { lazyImport } from '../utils/lazyImport';
import { DrawerLeft } from '../components/DrawerLeft';
import { Spinner } from '../components/Spinner';

const { StatisticsRoutes } = lazyImport(
  () => import('../features/statistics'),
  'StatisticsRoutes',
);
const { OrdersRoutes } = lazyImport(
  () => import('../features/orders'),
  'OrdersRoutes',
);
const { UsersRoutes } = lazyImport(
  () => import('../features/users'),
  'UsersRoutes',
);
const { ConfigurationsRoutes } = lazyImport(
  () => import('../features/configurations'),
  'ConfigurationsRoutes',
);
const { TransactionsRoutes } = lazyImport(
  () => import('../features/transactions'),
  'TransactionsRoutes',
);
const { AlarmsRoutes } = lazyImport(
  () => import('../features/alarms'),
  'AlarmsRoutes',
);
const { NotificationsRoutes } = lazyImport(
  () => import('../features/notifications'),
  'NotificationsRoutes',
);
const { SettingsRoutes } = lazyImport(
  () => import('../features/settings'),
  'SettingsRoutes',
);
const { DocumentsRoutes } = lazyImport(
  () => import('../features/documents'),
  'DocumentsRoutes',
);
const { ReviewsRoutes } = lazyImport(
  () => import('../features/reviews'),
  'ReviewsRoutes',
);

const App = () => (
  <Box>
    <Suspense
      fallback={(
        <Box sx={{ height: '100vh' }}>
          <Spinner logo />
        </Box>
      )}
    >
      <DrawerLeft>
        <Outlet />
      </DrawerLeft>
    </Suspense>
  </Box>
);

export const protectedRoutes = [
  {
    path: '',
    element: <App />,
    children: [
      { path: '/statistics', element: <StatisticsRoutes /> },
      { path: '/orders/*', element: <OrdersRoutes /> },
      { path: '/users/*', element: <UsersRoutes /> },
      { path: '/configurations/*', element: <ConfigurationsRoutes /> },
      { path: '/transactions/*', element: <TransactionsRoutes /> },
      { path: '/alarms/*', element: <AlarmsRoutes /> },
      { path: '/notifications/*', element: <NotificationsRoutes /> },
      { path: '/settings/*', element: <SettingsRoutes /> },
      { path: '/documents/*', element: <DocumentsRoutes /> },
      { path: '/reviews/*', element: <ReviewsRoutes /> },
      { path: '*', element: <Navigate to="/orders" replace /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
