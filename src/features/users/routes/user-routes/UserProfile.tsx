import { Outlet } from 'react-router-dom';
import Box from '@mui/material/Box';
import { TopBar } from '../../../../components/TopBar';
import { UserProfileDetails } from '../../components/UserProfileDetails';

export const UserProfile = () => (
  <Box>
    <TopBar>
      <UserProfileDetails />
    </TopBar>
    <Box sx={{ height: '100%' }}>
      <Outlet />
    </Box>
  </Box>
);
