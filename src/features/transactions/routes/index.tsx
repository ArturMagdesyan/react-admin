import { Route, Routes, Navigate } from 'react-router-dom';
import { Transactions } from './Transactions';
import { TransactionsProvider } from '../providers';

export const TransactionsRoutes = () => (
  <>
    <Routes>
      <Route
        path=""
        element={(
          <TransactionsProvider>
            <Transactions />
          </TransactionsProvider>
        )}
      />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  </>
);
