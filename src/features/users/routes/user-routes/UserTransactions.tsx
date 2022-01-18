import React from 'react';
import { UserProfileNavLinks } from '../../components/UserProfileNavLinks';
import { UserTransactionsTable } from '../../components/UserTransactionsTable';
import { TabView } from '../../../common/features/tab-view/components';

export const UserTransactions = () => (
  <TabView
    bodySection={<UserProfileNavLinks />}
    dataTable={<UserTransactionsTable />}
  />
);
