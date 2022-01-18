import React from 'react';
import Box from '@mui/material/Box';
import UsersBodySection from '../../components/UsersBodySection';
import { UsersTechniquesProvider } from '../../providers';
import { TechniqueVendorsTable } from '../../components/TechniqueVendorsTable';
import { UserTechniqueCharacter } from '../../components/UserTechniqueCharacter';
import { TabView } from '../../../common/features/tab-view/components';

export const UsersTechniques = () => (
  <TabView
    bodySection={(
      <UsersBodySection
        isLoadingExportCsv={false}
        onExportCsv={() => {}}
      />
    )}
    dataTable={(
      <Box
        sx={{
          display: 'flex',
          gap: 2.2,
        }}
      >
        <Box
          sx={{
            minWidth: '520px',
          }}
        >
          <UserTechniqueCharacter />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: '100%',
          }}
        >
          <UsersTechniquesProvider>
            <TechniqueVendorsTable />
          </UsersTechniquesProvider>
        </Box>
      </Box>
    )}
  />
);
