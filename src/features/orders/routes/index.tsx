import { Route, Routes, Navigate } from 'react-router-dom';
import { lazyImport } from '../../../utils/lazyImport';
import { Orders } from './Orders';
import { OrdersProvider, OrderInnerProvider } from '../providers';

const { OrderInner } = lazyImport(
  () => import('./OrderInner'),
  'OrderInner',
);

export const OrdersRoutes = () => (
  <>
    <Routes>
      <Route path="" element={<OrdersProvider><Orders /></OrdersProvider>} />
      <Route path=":orderId/*" element={<OrderInnerProvider><OrderInner /></OrderInnerProvider>} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  </>
);
