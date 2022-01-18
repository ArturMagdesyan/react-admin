import React, { useContext } from 'react';
import { TopBar } from '../../../components/TopBar';
import { SelectTechniques } from '../../../components/SelectTechniques';
import { NotificationsContext } from '../contexts';
import NotificationsTable from '../components/NotificationsTable';
import NotificationsFilters from '../components/NotificationsFilters';
import { TabView } from '../../common/features/tab-view/components';

export const Notifications = () => {
  const { dispatch } = useContext(NotificationsContext);

  return (
    <>
      <TopBar>
        <SelectTechniques dispatch={dispatch} />
      </TopBar>
      <TabView
        bodySection={<NotificationsFilters />}
        dataTable={<NotificationsTable />}
      />
    </>
  );
};
