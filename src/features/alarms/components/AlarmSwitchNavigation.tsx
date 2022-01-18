import Box from '@mui/material/Box';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterButton } from '../../../components/FilterButton';

export const AlarmSwitchNavigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        background: (theme) => theme.colors.white,
        borderRadius: '10px',
        boxShadow: 2,
        '& .MuiButton-root': {
          marginRight: 0,
        },
      }}
    >
      <FilterButton
        withShadow={false}
        isActive={pathname === '/alarms/unaccepted'}
        title={t('filters.unaccepted')}
        onClick={() => navigate(pathname.replace('unfinished', 'unaccepted'))}
      />
      <FilterButton
        withShadow={false}
        isActive={pathname === '/alarms/unfinished'}
        title={t('filters.unfinished')}
        onClick={() => navigate(pathname.replace('unaccepted', 'unfinished'))}
      />
    </Box>
  );
};
