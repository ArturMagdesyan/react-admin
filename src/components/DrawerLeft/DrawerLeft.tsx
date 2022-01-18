import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useMatch } from 'react-router-dom';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import MuiListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material';
import Typography from '@mui/material/Typography';
import {
  LEFT_BAR_WIDTH,
  TOP_BAR_HEIGHT,
} from '../../common/constants/global-styles-variables.constant';
import navigationData from '../../common/constants/left-bar-navigation.constant';
import type { NavigationItem } from '../../common/constants/left-bar-navigation.constant';
import { ReactComponent as LogoSvg } from '../../assets/logo.svg';
import { LogoutIcon } from '../Icons';
import { useAuth } from '../../app/auth';

const styles = {
  root: {
    display: 'flex',
    '& .MuiListItemIcon-root': {
      minWidth: '40px',
    },
  },
  drawer: {
    width: LEFT_BAR_WIDTH,
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: LEFT_BAR_WIDTH,
      boxShadow: 23,
      borderRight: 0,
    },
  },
  listItem: {
    height: '56px',
    borderLeft: `3px solid ${(theme: Theme) => theme.colors.white}`,
    transition: 'padding 0.4s',
    '&:hover': {
      paddingLeft: (theme: Theme) => theme.spacing(2.25),
      backgroundColor: 'rgba(69, 181, 255, .1)',
      borderColor: 'rgba(69, 181, 255, .1)',
    },
  },
  activeListItem: (isSelected: boolean) => (
    isSelected ? {
      borderColor: (theme: Theme) => theme.palette.primary.dark,
      backgroundColor: 'rgba(69, 181, 255, .1)',
      '& svg': {
        color: (theme: Theme) => theme.palette.primary.main,
      },
      '&:hover': {
        borderColor: (theme: Theme) => theme.palette.primary.dark,
      },
    } : {}),
  listItemLogout: {
    height: '56px',
    marginTop: (theme: Theme) => theme.spacing(3.75),
    '&:hover': {
      backgroundColor: 'rgba(69, 181, 255, .1)',
      '& svg': {
        color: (theme: Theme) => theme.palette.primary.main,
      },
      '& .MuiListItemText-root': {
        transition: 'padding 0.4s',
        paddingLeft: (theme: Theme) => theme.spacing(0.25),
      },
    },
  },
  active: {
    borderColor: (theme: Theme) => theme.palette.primary.dark,
    backgroundColor: 'rgba(69, 181, 255, .1) !important',
    '& svg': {
      color: (theme: Theme) => theme.palette.primary.main,
    },
  },
  childrenView: {
    flexGrow: 1,
    mt: TOP_BAR_HEIGHT,
  },
};

interface ListItemProps {
  to: string;
}

const ListItem: React.FC<ListItemProps> = ({ children, to }) => {
  const match = useMatch({ path: to, end: false });

  return (
    <MuiListItem
      button
      component={NavLink}
      sx={{
        ...styles.listItem,
        ...styles.activeListItem(!!match),
      }}
      to={to}
    >
      {children}
    </MuiListItem>
  );
};

export const DrawerLeft: React.FC = ({ children }) => {
  const { t } = useTranslation();
  const { logout } = useAuth();

  const onLogout = async () => {
    await logout();
  };

  return (
    <Box sx={styles.root}>
      <Drawer
        sx={styles.drawer}
        variant="permanent"
        anchor="left"
      >
        <Toolbar>
          <LogoSvg />
        </Toolbar>
        <List>
          {navigationData.map((navigation: NavigationItem) => {
            const Icon = navigation.icon;

            return (
              <ListItem
                key={navigation.route}
                to={navigation.route}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText
                  primary={(
                    <Typography variant="body2">
                      {t(`leftBarNavigation.${navigation.title}`)}
                    </Typography>
                  )}
                />
              </ListItem>
            );
          })}
          <MuiListItem
            key="logout"
            button
            sx={styles.listItemLogout}
            onClick={onLogout}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText
              primary={(
                <Typography variant="body2">
                  {t('leftBarNavigation.logout')}
                </Typography>
              )}
            />
          </MuiListItem>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={styles.childrenView}
      >
        {children}
      </Box>
    </Box>
  );
};
