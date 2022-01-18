import React from 'react';
import Box from '@mui/material/Box';
import ViewBody from '../../../../components/ViewBody';
import { UserPaymentMethod } from '../../components/UserPaymentMethod';
import { UserProfileNavLinks } from '../../components/UserProfileNavLinks';
import { ViewBodySection } from '../../../../components/ViewBodySection';

export const UserPayment = () => (
  <ViewBody>
    <ViewBodySection>
      <UserProfileNavLinks />
    </ViewBodySection>
    <Box
      sx={{
        width: '36%',
        height: '90%',
      }}
    >
      <UserPaymentMethod />
    </Box>
  </ViewBody>
);
