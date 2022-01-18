import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';
import Box from '@mui/material/Box';
import { FilterButton } from '../../../components/FilterButton';
import { useUserProfile } from '../api';
import { UserType } from '../enums';

const NavigationSwitch = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const location = useLocation();
  const { t } = useTranslation();
  const {
    data: userDetails,
    isLoading,
    isError,
  } = useUserProfile(userId!);

  if (isLoading || isError) return null;
  const { userType } = userDetails!;
  const { pathname } = location;

  return (
    <Box
      sx={{
        background:
          userType === UserType.VENDOR_CUSTOMER
            ? (theme) => theme.colors.white
            : (theme) => theme.colors.solitudeSecondary,
        borderRadius: '20px',
      }}
    >
      <FilterButton
        withShadow={false}
        isActive={pathname.search('customers') > 0}
        disabled={userType === UserType.VENDOR}
        title={t('users.navigation.vendor')}
        onClick={() => navigate(pathname.replace('vendors', 'customers'))}
      />
      <FilterButton
        withShadow={false}
        isActive={pathname.search('vendors') > 0}
        disabled={userType === UserType.CUSTOMER}
        title={t('users.navigation.customer')}
        onClick={() => navigate(pathname.replace('customers', 'vendors'))}
      />
    </Box>
  );
};

export default NavigationSwitch;
