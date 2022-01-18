import React from 'react';
import Box from '@mui/material/Box';
import { Theme } from '@mui/material';
import { TOP_BAR_HEIGHT } from '../../common/constants/global-styles-variables.constant';

const ViewBody: React.FC = ({ children }) => (
  <Box
    sx={{
      padding: (theme) => theme.spacing(2.5, 2.5, 3.75),
      background: (theme: Theme) => theme.colors.solitude,
      height: `calc(100vh - ${TOP_BAR_HEIGHT})`,
    }}
  >
    {children}
  </Box>
);

export default ViewBody;
