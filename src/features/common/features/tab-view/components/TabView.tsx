import React from 'react';
import { ViewBodySection } from '../../../../../components/ViewBodySection';
import { TableView } from '../../../../../components/TableView';
import ViewBody from '../../../../../components/ViewBody';

interface Props {
  bodySection: React.ReactNode;
  dataTable: React.ReactNode;
}

export const TabView = ({
  bodySection,
  dataTable,
}: Props) => (
  <ViewBody>
    <ViewBodySection>
      {bodySection}
    </ViewBodySection>
    <TableView>
      {dataTable}
    </TableView>
  </ViewBody>
);
