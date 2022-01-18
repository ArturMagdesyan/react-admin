import React from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Slider from '@mui/material/Slider';
import Switch from '@mui/material/Switch';
import type { Theme } from '@mui/material';
import { LocationIcon } from '../../../components/Icons';
import { useGetUserSettings } from '../api/user-settings';
import { useUpdateUserSettings } from '../api/user-settings/updateUserSettings';
import { UserSettings } from '../types';
import { SelectUserSettingsTechnique } from './SelectUserSettingsTechnique';
import { Spinner } from '../../../components/Spinner';

const COST_MIN_MAX_VALUES = {
  min: 1000,
  max: 120000,
};

const RADIUS_MIN_MAX_VALUES = {
  min: 1,
  max: 150,
};

const styles = {
  root: {
    boxShadow: 1,
    width: '560px',
    height: 'calc(100% - 60px)',
    borderRadius: '20px',
    backgroundColor: (theme: Theme) => theme.colors.white,
    overflow: 'auto',
    padding: (theme: Theme) => theme.spacing(2.25, 0),
  },
  titleView: {
    color: (theme: Theme) => theme.colors.blackRussian,
  },
  subtitle: {
    color: (theme: Theme) => theme.colors.mischka,
  },
  inputField: {
    '& .MuiOutlinedInput-root': {
      height: '40px',
    },
  },
  notificationText: {
    color: (theme: Theme) => theme.colors.manatee,
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const UserProfileSettings = () => {
  const { t } = useTranslation();
  const { userId } = useParams();
  const { data: userSettings } = useGetUserSettings(userId!);
  const updateUserSettingsMutate = useUpdateUserSettings();

  const onChange = (key: string, value: any) => {
    if (!userId || !userSettings) return;
    updateUserSettingsMutate.mutate({
      userId,
      data: _.set(userSettings, key, value) as UserSettings,
    });
  };

  if (!userSettings) {
    return <Spinner />;
  }

  return (
    <Box sx={styles.root}>
      <Box px={3}>
        <Typography
          variant="h5"
          sx={styles.titleView}
        >
          {t('userSettings.title')}
        </Typography>
        <Box mt={2}>
          <Typography
            variant="body2"
            sx={styles.subtitle}
            mb={1}
          >
            {t('userSettings.selectCategory')}
          </Typography>
          <SelectUserSettingsTechnique
            disabled={updateUserSettingsMutate.isLoading}
            trucksIds={userSettings.trucksIds || []}
            subscriptions={userSettings.subscriptions}
            onChange={(trucksIds) => {
              onChange('trucksIds', trucksIds);
              if (!trucksIds) {
                onChange('subscriptions.subscribedToAllCategoryOrders', true);
              }
            }}
          />
        </Box>
        <Box my={2}>
          <Typography
            variant="body2"
            sx={styles.subtitle}
            mb={1}
          >
            {t('userSettings.location')}
          </Typography>
          <TextField
            fullWidth
            sx={styles.inputField}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box my={2}>
          <Box sx={styles.box}>
            <Typography
              gutterBottom
              variant="body2"
              sx={styles.subtitle}
            >
              {t('userSettings.cost')}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="primary"
            >
              {userSettings.priceRange.min}
              {' - '}
              {userSettings.priceRange.max}
            </Typography>
          </Box>
          <Slider
            disableSwap
            disabled={updateUserSettingsMutate.isLoading}
            defaultValue={Object.values(userSettings.priceRange)}
            valueLabelDisplay="auto"
            min={COST_MIN_MAX_VALUES.min}
            max={COST_MIN_MAX_VALUES.max}
            onChangeCommitted={(e, value) => {
              const [min, max] = value as number[];
              onChange('priceRange', { min, max });
            }}
          />
          <Box sx={styles.box}>
            <Typography
              variant="caption"
              sx={styles.subtitle}
            >
              {t('userSettings.min')}
              {' '}
              {COST_MIN_MAX_VALUES.min}
            </Typography>
            <Typography
              variant="caption"
              sx={styles.subtitle}
            >
              {t('userSettings.max')}
              {' '}
              {COST_MIN_MAX_VALUES.max}
            </Typography>
          </Box>
        </Box>
        <Box mb={2}>
          <Box sx={styles.box}>
            <Typography
              gutterBottom
              variant="body2"
              sx={styles.subtitle}
            >
              {t('userSettings.radius')}
            </Typography>
            <Typography
              gutterBottom
              variant="h6"
              color="primary"
            >
              {userSettings.radius}
            </Typography>
          </Box>
          <Slider
            disabled={updateUserSettingsMutate.isLoading}
            defaultValue={userSettings.radius}
            valueLabelDisplay="auto"
            min={RADIUS_MIN_MAX_VALUES.min}
            max={RADIUS_MIN_MAX_VALUES.max}
            onChangeCommitted={(e, value) => {
              onChange('radius', value);
            }}
          />
          <Box sx={styles.box}>
            <Typography
              variant="caption"
              sx={styles.subtitle}
            >
              {t('userSettings.min')}
              {' '}
              {RADIUS_MIN_MAX_VALUES.min}
            </Typography>
            <Typography
              variant="caption"
              sx={styles.subtitle}
            >
              {t('userSettings.max')}
              {' '}
              {RADIUS_MIN_MAX_VALUES.max}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box px={3}>
        <Typography
          variant="body2"
          sx={styles.subtitle}
          mt={2}
          mb={0.5}
        >
          {t('userSettings.notification')}
        </Typography>
        <Box sx={styles.box}>
          <Typography
            variant="button"
            sx={styles.notificationText}
          >
            {t('userSettings.allCategories')}
          </Typography>
          <Switch
            checked={userSettings.subscriptions.subscribedToAllCategoryOrders}
            disabled={
              userSettings.subscriptions.subscribedToTruckMatchingOrders
              || userSettings.subscriptions.subscribedToSelectedCategoryOrders
              || updateUserSettingsMutate.isLoading
            }
            onChange={(e, value) => {
              onChange(
                'subscriptions.subscribedToAllCategoryOrders',
                value,
              );
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            variant="button"
            sx={styles.notificationText}
          >
            {t('userSettings.selectedCategories')}
          </Typography>
          <Switch
            checked={userSettings.subscriptions.subscribedToSelectedCategoryOrders}
            disabled={
              userSettings.subscriptions.subscribedToAllCategoryOrders
              || userSettings.subscriptions.subscribedToTruckMatchingOrders
              || updateUserSettingsMutate.isLoading
            }
            onChange={(e, value) => {
              onChange(
                'subscriptions.subscribedToSelectedCategoryOrders',
                value,
              );
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            variant="button"
            sx={styles.notificationText}
          >
            {t('userSettings.ownCategories')}
          </Typography>
          <Switch
            checked={userSettings.subscriptions.subscribedToTruckMatchingOrders}
            disabled={
              userSettings.subscriptions.subscribedToAllCategoryOrders
              || userSettings.subscriptions.subscribedToSelectedCategoryOrders
              || updateUserSettingsMutate.isLoading
            }
            onChange={(e, value) => {
              onChange(
                'subscriptions.subscribedToTruckMatchingOrders',
                value,
              );
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            variant="button"
            sx={styles.notificationText}
          >
            {t('userSettings.cashless')}
          </Typography>
          <Switch
            checked={userSettings.subscriptions.subscribedToNotCashOrders}
            disabled={updateUserSettingsMutate.isLoading}
            onChange={(e, value) => {
              onChange(
                'subscriptions.subscribedToNotCashOrders',
                value,
              );
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
