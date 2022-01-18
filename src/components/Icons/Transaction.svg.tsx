import React from 'react';
import { createSvgIcon } from '@mui/material';

const TransactionIcon = createSvgIcon(
  <path
    d="M0,12.015H15V13.56H3.751l3.2,3.207L5.857,17.861ZM0,5.846V4.3H11.25l-3.2-3.207L9.143,0,15,5.846Z"
    transform="translate(4.5 3)"
  />,
  'Transaction',
);

export default TransactionIcon;
