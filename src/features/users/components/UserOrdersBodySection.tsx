import React from 'react';
import Box from '@mui/material/Box';
import { UserProfileNavLinks } from './UserProfileNavLinks';
import NavigationSwitch from './NavigationSwitch';

const UserOrdersBodySection = () => (
  <Box
    sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
    }}
  >
    <UserProfileNavLinks />
    <NavigationSwitch />
  </Box>
);

export default UserOrdersBodySection;
