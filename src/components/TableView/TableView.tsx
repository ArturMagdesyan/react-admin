import React from 'react';
import Box from '@mui/material/Box';

export const TableView: React.FC = ({ children }) => (
  <Box
    sx={{
      height: '84%',
    }}
  >
    {children}
  </Box>
);
