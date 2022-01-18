import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import { userProfileTabNavigationData } from '../constants';
import { FilterButton } from '../../../components/FilterButton';
import { useUserProfile } from '../api';
import { UserType } from '../enums';

export const UserProfileNavLinks = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useParams();
  const {
    data: userDetails,
    isLoading,
    isError,
  } = useUserProfile(userId!);

  if (isError || isLoading) return null;

  const { userType } = userDetails!;

  const onNavigate = (path: string) => {
    navigate(
      location
        .pathname
        .replace(/[^/]*$/, path),
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 0.5,
      }}
    >
      {
        userProfileTabNavigationData.map((route) => (
          <FilterButton
            key={route.path}
            title={t(`users.navigation.${route.title}`)}
            onClick={() => onNavigate(route.path)}
            isActive={
              location.pathname.split('/').slice(-1)[0] === route.path
            }
            disabled={
              route.path === 'settings' && userType === UserType.CUSTOMER
            }
          />
        ))
      }
    </Box>
  );
};
