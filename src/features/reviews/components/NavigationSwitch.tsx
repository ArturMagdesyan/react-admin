import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  useLocation,
  useNavigate,
} from 'react-router-dom';
import Box from '@mui/material/Box';
import { FilterButton } from '../../../components/FilterButton';

const NavigationSwitch = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        background: (theme) => theme.colors.white,
        borderRadius: '20px',
        '& .MuiButton-root': {
          mr: 0,
        },
      }}
    >
      <FilterButton
        withShadow={false}
        isActive={pathname.search('customers') > 0}
        title={t('users.navigation.vendor')}
        onClick={() => navigate(pathname.replace('vendors', 'customers'))}
      />
      <FilterButton
        withShadow={false}
        isActive={pathname.search('vendors') > 0}
        title={t('users.navigation.customer')}
        onClick={() => navigate(pathname.replace('customers', 'vendors'))}
      />
    </Box>
  );
};

export default NavigationSwitch;
