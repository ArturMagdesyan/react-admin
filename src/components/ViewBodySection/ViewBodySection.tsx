import React from 'react';
import Box from '@mui/material/Box';

export const ViewBodySection: React.FC = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      height: '40px',
      mb: (theme) => theme.spacing(2.4),
    }}
  >
    {children}
  </Box>
);
