import React, { useContext } from 'react';
import { OrdersTable } from '../components';
import { TopBar } from '../../../components/TopBar';
import { SelectTechniques } from '../../../components/SelectTechniques';
import { OrdersContext } from '../contexts';
import OrdersFilter from '../components/OrdersFilters';
import { TabView } from '../../common/features/tab-view/components';

export const Orders = () => {
  const { dispatch } = useContext(OrdersContext);

  return (
    <>
      <TopBar>
        <SelectTechniques dispatch={dispatch} />
      </TopBar>
      <TabView
        bodySection={<OrdersFilter />}
        dataTable={<OrdersTable />}
      />
    </>
  );
};
