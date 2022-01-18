import React from 'react';
import Box from '@mui/material/Box';
import { TopBar } from '../../../components/TopBar';
import ViewBody from '../../../components/ViewBody';
import OrderInnerTopBar from '../components/OrderInnerTopBar';
import OrderDetails from '../components/OrderDetails';
import BucketTable from '../components/BucketTable';

export const OrderInner = () => (
  <>
    <TopBar>
      <OrderInnerTopBar />
    </TopBar>
    <ViewBody>
      <Box
        sx={{
          float: 'left',
          marginRight: '2%',
          width: '48%',
          height: '100%',
        }}
      >
        <OrderDetails />
      </Box>
      <Box
        sx={{
          float: 'left',
          width: '50%',
          height: '100%',
        }}
      >
        <BucketTable />
      </Box>
    </ViewBody>
  </>
);
