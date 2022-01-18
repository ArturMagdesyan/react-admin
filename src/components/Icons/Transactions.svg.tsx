import React from 'react';
import { createSvgIcon } from '@mui/material';

const TransactionsIcon = createSvgIcon(
  <g>
    <path
      d="M6.5 8.5L6.5 18.5L8.5 18.5L8.5 8.5L11 8.5L7.5 3.5L4 8.5L6.5 8.5Z"
      fill="#30CC72"
    />
    <path
      d="M17.5 15.5V5.5H15.5V15.5H13L16.5 20.5L20 15.5H17.5Z"
      fill="#FF2949"
    />
  </g>,
  'Transactions',
);

export default TransactionsIcon;
