import React from 'react';
import { useTranslation } from 'react-i18next';
import type { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Technique } from '../../../components/Technique';
import { useTechniques } from '../../techniques/api/getTechniques';
import { Spinner } from '../../../components/Spinner';
import type { Subscriptions } from '../types';

const styles = {
  techniqueButton: (isActive: boolean) => ({
    minWidth: '60px',
    minHeight: '40px',
    padding: 0,
    '&:disabled': {
      backgroundColor: 'unset',
    },
    '&:hover': {
      padding: 0,
    },
    color: (theme: Theme) => (isActive ? theme.colors.white : theme.colors.manatee),
    '& .MuiSvgIcon-root': {
      color: (theme: Theme) => (isActive ? theme.colors.white : theme.colors.manatee),
    },
  }),
  allButtonColor: (subscribedToAllCategoryOrders: boolean, isActive: boolean) => ({
    color: (theme: Theme) => (
      subscribedToAllCategoryOrders && isActive ? theme.colors.white : theme.colors.manatee),
    '& .MuiSvgIcon-root': {
      color: (theme: Theme) => (
        subscribedToAllCategoryOrders && isActive ? theme.colors.white : theme.colors.manatee),
    },
  }),
  techniquesView: {
    display: 'flex',
    alignItems: 'center',
    gap: 1.25,
  },
};

interface Props {
  disabled: boolean;
  trucksIds: number[];
  subscriptions: Subscriptions;
  onChange: (ids: number[] | null) => void;
}

export const SelectUserSettingsTechnique = ({
  disabled,
  trucksIds,
  subscriptions,
  onChange,
}: Props) => {
  const { t } = useTranslation();
  const {
    data: techniques,
    isLoading,
    isFetched,
    isError,
  } = useTechniques();

  const selectTechniques = (techniquesId: number, isActive: boolean) => {
    let selectedTechniqueIds = [...trucksIds, techniquesId];

    if (isActive) {
      selectedTechniqueIds = selectedTechniqueIds.filter((id: number) => id !== techniquesId);
    }

    onChange(selectedTechniqueIds);
  };

  if (isLoading || !isFetched) {
    return <Spinner />;
  }

  if (isError) {
    return <>{t('errors.fetchTechniques')}</>;
  }

  return (
    <Box sx={styles.techniquesView}>
      <Button
        disabled={
          subscriptions.subscribedToSelectedCategoryOrders
          || subscriptions.subscribedToTruckMatchingOrders
          || disabled
        }
        sx={{
          ...styles.techniqueButton(!trucksIds.length),
          ...styles.allButtonColor(subscriptions.subscribedToAllCategoryOrders, !trucksIds.length),
        }}
        variant="contained"
        color={subscriptions.subscribedToAllCategoryOrders && !trucksIds.length ? 'primary' : 'inherit'}
        onClick={() => {
          onChange(null);
        }}
      >
        {t('userSettings.all')}
      </Button>
      {techniques!.map((technique) => {
        const isActive = trucksIds?.find((id) => technique.id === id);

        return (
          <Button
            disabled={subscriptions.subscribedToAllCategoryOrders || disabled}
            sx={styles.techniqueButton(!!isActive)}
            variant="contained"
            key={technique.name}
            color={isActive ? 'primary' : 'inherit'}
            onClick={() => selectTechniques(technique.id, !!isActive)}
          >
            <Technique
              key={technique.name}
              techniqueName={technique.name}
            />
          </Button>
        );
      })}
    </Box>
  );
};
