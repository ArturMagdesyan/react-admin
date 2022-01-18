import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { FilterButton } from '../../../components/FilterButton';
import { usersTabNavigationData } from '../constants';

const UsersNavLinks = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: 'flex', gap: 0.5 }}>
      {
        usersTabNavigationData.map((route) => (
          <FilterButton
            key={route.path}
            title={t(`users.navigation.${route.title}`)}
            onClick={() => onNavigate(route.path)}
            isActive={location.pathname === route.path}
          />
        ))
      }
    </Box>
  );
};

export default UsersNavLinks;
