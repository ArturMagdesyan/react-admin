import React from 'react';
import { useIsFetching } from 'react-query';
import AppBar from '@mui/material/AppBar';
import type { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import { LEFT_BAR_WIDTH, TOP_BAR_HEIGHT } from '../../common/constants/global-styles-variables.constant';
import { Spinner } from '../Spinner';

export const TopBar: React.FC = ({ children }) => {
  const isFetching = useIsFetching();

  return (
    <AppBar
      position="fixed"
      sx={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: `calc(100% - ${LEFT_BAR_WIDTH})`,
        paddingLeft: (theme) => theme.spacing(2.5),
        marginLeft: LEFT_BAR_WIDTH,
        height: TOP_BAR_HEIGHT,
        background: (theme: Theme) => theme.colors.white,
        color: 'inherit',
        boxShadow: 22,
      }}
    >
      {children}
      <Box
        sx={{
          pr: (theme) => theme.spacing(3.75),
        }}
      >
        {!!isFetching && <Spinner size={18} />}
      </Box>
    </AppBar>
  );
};
