import {
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { lazyImport } from '../../../utils/lazyImport';
import {
  VendorsProvider,
  VendorOrdersProvider,
  CustomersProvider,
  UsersProvider,
  CustomerOrdersProvider,
  VendorsCustomersProvider,
  BlockListProvider,
  UserTransactionsProvider,
  UserDocumentsProvider,
  UserReviewsProvider,
} from '../providers';
import { Vendors, Users } from './users-routes';
import { UserProfile, UserSettings, VendorOrders } from './user-routes';

const { Customers } = lazyImport(
  () => import('./users-routes'),
  'Customers',
);
const { CustomerOrders } = lazyImport(
  () => import('./user-routes'),
  'CustomerOrders',
);
const { VendorsCustomers } = lazyImport(
  () => import('./users-routes'),
  'VendorsCustomers',
);
const { BlockList } = lazyImport(
  () => import('./users-routes'),
  'BlockList',
);
const { UsersTechniques } = lazyImport(
  () => import('./users-routes'),
  'UsersTechniques',
);
const { UserTransactions } = lazyImport(
  () => import('./user-routes'),
  'UserTransactions',
);
const { UserPayment } = lazyImport(
  () => import('./user-routes'),
  'UserPayment',
);
const { UserDocuments } = lazyImport(
  () => import('./user-routes'),
  'UserDocuments',
);
const { UserReviews } = lazyImport(
  () => import('./user-routes'),
  'UserReviews',
);

const VendorsRoutes = () => (
  <Routes>
    <Route
      path="orders"
      element={(
        <VendorOrdersProvider>
          <VendorOrders />
        </VendorOrdersProvider>
      )}
    />
    <Route
      path="transactions"
      element={(
        <UserTransactionsProvider>
          <UserTransactions />
        </UserTransactionsProvider>
      )}
    />
    <Route
      path="payment"
      element={(<UserPayment />)}
    />
    <Route
      path="documents"
      element={(
        <UserDocumentsProvider>
          <UserDocuments />
        </UserDocumentsProvider>
      )}
    />
    <Route
      path="reviews"
      element={(
        <UserReviewsProvider>
          <UserReviews />
        </UserReviewsProvider>
      )}
    />
    <Route
      path="settings"
      element={(
        <UserSettings />
      )}
    />
    <Route path="*" element={<Navigate to="orders" />} />
  </Routes>
);

const CustomerRoutes = () => (
  <Routes>
    <Route
      path="orders"
      element={(
        <CustomerOrdersProvider>
          <CustomerOrders />
        </CustomerOrdersProvider>
      )}
    />
    <Route
      path="transactions"
      element={(
        <UserTransactionsProvider>
          <UserTransactions />
        </UserTransactionsProvider>
      )}
    />
    <Route
      path="payment"
      element={(<UserPayment />)}
    />
    <Route
      path="documents"
      element={(
        <UserDocumentsProvider>
          <UserDocuments />
        </UserDocumentsProvider>
      )}
    />
    <Route
      path="reviews"
      element={(
        <UserReviewsProvider>
          <UserReviews />
        </UserReviewsProvider>
      )}
    />
    <Route path="*" element={<Navigate to="orders" />} />
  </Routes>
);

export const UsersRoutes = () => (
  <Routes>
    <Route element={<UserProfile />}>
      <Route
        path="vendors/:userId/*"
        element={<VendorsRoutes />}
      />
      <Route
        path="customers/:userId/*"
        element={<CustomerRoutes />}
      />
    </Route>
    <Route element={<UsersProvider><Users /></UsersProvider>}>
      <Route
        path="vendors"
        element={<VendorsProvider><Vendors /></VendorsProvider>}
      />
      <Route
        path="customers"
        element={<CustomersProvider><Customers /></CustomersProvider>}
      />
      <Route
        path="vendors-customers"
        element={<VendorsCustomersProvider><VendorsCustomers /></VendorsCustomersProvider>}
      />
      <Route
        path="block-list"
        element={<BlockListProvider><BlockList /></BlockListProvider>}
      />
      <Route
        path="technique"
        element={<UsersTechniques />}
      />
    </Route>
    <Route path="*" element={<Navigate to="vendors" />} />
  </Routes>
);
