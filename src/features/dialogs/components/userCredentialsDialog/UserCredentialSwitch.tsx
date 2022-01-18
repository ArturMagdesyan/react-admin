import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import type { Theme } from '@mui/material';
import type { Step } from './AddUserCredentialsDialog';
import { FilterButton } from '../../../../components/FilterButton';

const styles = {
  switch: {
    backgroundColor: (theme: Theme) => theme.colors.solitudeSecondary,
    height: '32px',
    borderRadius: '20px',
  },
};

export type SwitchType = Omit<Step, 'code'>;
interface Props {
  onSwitch: (type: SwitchType) => void;
  switchType: SwitchType;
  disableSwitch: boolean;
}

export const UserCredentialSwitch = ({
  onSwitch,
  switchType,
  disableSwitch,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Box sx={styles.switch}>
      <FilterButton
        withShadow={false}
        isActive={switchType === 'phone'}
        minHeight={32}
        minWidth={134}
        title={t('userCredentialsDialog.phone')}
        defaultColor="solitudeSecondary"
        onClick={() => onSwitch('phone')}
      />
      <FilterButton
        withShadow={false}
        disabled={disableSwitch}
        isActive={switchType === 'email'}
        minHeight={32}
        minWidth={134}
        title={t('userCredentialsDialog.email')}
        defaultColor="solitudeSecondary"
        onClick={() => onSwitch('email')}
      />
    </Box>
  );
};
