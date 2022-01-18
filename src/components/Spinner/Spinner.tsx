import React from 'react';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ReactComponent as LogoSvg } from '../../assets/logo.svg';

const styles = {
  root: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoSpinner: {
    animation: 'logo-spin infinite 3s ease',
    '@keyframes logo-spin': {
      '0%': {
        transform: 'rotate(0deg)',
      },
      '50%': {
        transform: 'rotate(360deg)',
      },
      '100%': {
        transform: 'rotate(0deg)',
      },
    },
  },
};

interface Props {
  size?: number;
  logo?: boolean;
}

export const Spinner = ({
  size = 18,
  logo = false,
}: Props) => (
  <Box sx={styles.root}>
    {logo
      ? (
        <Box sx={styles.logoSpinner}>
          <LogoSvg />
        </Box>
      ) : (
        <CircularProgress size={size} />
      )}
  </Box>
);
