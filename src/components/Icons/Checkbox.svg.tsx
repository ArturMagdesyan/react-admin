import React from 'react';
import { createSvgIcon } from '@mui/material';

const CheckboxIcon = createSvgIcon(
  <g fill="none" stroke="#c7cad7" strokeWidth="1">
    <circle cx="11" cy="11" r="11" stroke="none" />
    <circle cx="11" cy="11" r="10.5" fill="none" />
  </g>,
  'CheckboxIcon',
);

export default CheckboxIcon;
