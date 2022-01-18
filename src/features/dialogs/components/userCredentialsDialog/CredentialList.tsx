import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import { SinglePhoneNumber } from './singlePhoneNumber';
import {
  CheckboxIcon,
  CheckIcon,
} from '../../../../components/Icons';

const styles = {
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dividerColor: {
    borderColor: '#EEF0F6',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  fullWidth: {
    width: '100%',
  },
};

interface Props {
  activateEditMode: boolean;
  credential: string[] | null;
  primaryCredential: string | null;
  onChecked: (phoneNumber: string) => void;
}

export const CredentialList = ({
  activateEditMode,
  credential,
  primaryCredential,
  onChecked,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Box mb={4}>
      <Box sx={styles.wrapper}>
        {activateEditMode && (
          <Checkbox
            disabled
            icon={<CheckboxIcon />}
          />
        )}
        <Box sx={styles.fullWidth}>
          <Box sx={styles.box} my={2}>
            <Typography color="info.main">{primaryCredential}</Typography>
            <Box sx={styles.box}>
              {!activateEditMode && (
                <Typography variant="body2" color="primary">
                  {t('userCredentialsDialog.primary')}
                </Typography>
              )}
              <CheckIcon color={activateEditMode ? 'info' : 'primary'} />
            </Box>
          </Box>
          <Divider sx={styles.dividerColor} />
        </Box>
      </Box>
      {
        credential?.map((phoneNumber) => (
          <SinglePhoneNumber
            key={phoneNumber}
            activateEditMode={activateEditMode}
            phoneNumber={phoneNumber}
            onChecked={onChecked}
          />
        ))
      }
    </Box>
  );
};
