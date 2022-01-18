import React, { useContext } from 'react';
import { SelectTechniques } from '../../../components/SelectTechniques';
import { TopBar } from '../../../components/TopBar';
import { TransactionsContext } from '../contexts';
import TransactionsTable from '../components/TransactionsTable';
import TransactionsBodySection from '../components/BodySection';
import { TabView } from '../../common/features/tab-view/components';

export const Transactions = () => {
  const { dispatch } = useContext(TransactionsContext);

  return (
    <>
      <TopBar>
        <SelectTechniques
          dispatch={dispatch}
        />
      </TopBar>
      <TabView
        bodySection={<TransactionsBodySection />}
        dataTable={<TransactionsTable />}
      />
    </>
  );
};
