import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material';
import {
  ArrowDropUpIcon,
  ArrowDropDownIcon,
  ArrowUpAndDownIcon,
} from '../Icons';
import { TableSortType } from '../../common/types';

const styles = {
  button: {
    minHeight: '44px',
    minWidth: '84px',
    gap: 0.5,
    justifyContent: 'space-between',
    padding: (theme: Theme) => theme.spacing(0.5),
    '&:hover': {
      padding: (theme: Theme) => theme.spacing(0.5),
    },
  },
  subTitle: {
    color: '#B5B8C5',
  },
};

interface Props {
  title: string;
  subTitle?: string;
  orderType: TableSortType | null,
  onClick: () => void;
}

export const TableSortButton = ({
  title,
  subTitle = '',
  orderType,
  onClick,
}: Props) => (
  <Button
    sx={styles.button}
    onClick={onClick}
    color="info"
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        variant="body2"
        noWrap
      >
        {title}
      </Typography>
      <Typography
        variant="body2"
        noWrap
        sx={styles.subTitle}
      >
        {subTitle}
      </Typography>
    </Box>
    {!orderType && <ArrowUpAndDownIcon />}
    {orderType === 'DESC' && <ArrowDropDownIcon />}
    {orderType === 'ASC' && <ArrowDropUpIcon />}
  </Button>
);
