import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import { TopBar } from '../../../components/TopBar';
import ViewBody from '../../../components/ViewBody';
import ConfigurationsTable from '../components/ConfigurationsTable';
import { SelectTechniques } from '../../../components/SelectTechniques';
import { ConfigurationsContext } from '../contexts';
import { Technique } from '../../../common/enums';

export const Configurations = () => {
  const { dispatch } = useContext(ConfigurationsContext);

  return (
    <Box>
      <TopBar>
        <SelectTechniques
          dispatch={dispatch}
          multiple={false}
          defaultValue={Technique.MANIPULATOR}
        />
      </TopBar>
      <ViewBody>
        <ConfigurationsTable />
      </ViewBody>
    </Box>
  );
};
