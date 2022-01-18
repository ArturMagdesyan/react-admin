import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CloseIcon } from '../../../components/Icons';

interface Props {
  value?: string;
  label: string;
  refs: UseFormRegisterReturn;
  errorType: string;
  resetField: () => void;
}

const styles = {
  field: {
    width: '225px',
    flex: '1 1 auto',
    '& .MuiInput-input': {
      color: '#484c5b',
    },
    '& .MuiTypography-root': {
      color: (theme: Theme) => theme.palette.warning.contrastText,
      typography: 'body2',
    },

    '& .MuiFormHelperText-root': {
      color: (theme: Theme) => theme.palette.error.main,
    },
  },
  closeIconWrap: {
    width: '24px',
    height: '24px',
    '& .MuiSvgIcon-root': {
      fontSize: '0.8rem',
    },
  },
};

export const PhoneField = ({
  label,
  refs,
  errorType,
  resetField,
}: Props) => {
  const { t } = useTranslation();

  return (
    <TextField
      {...refs}
      sx={styles.field}
      error={!!errorType}
      variant="standard"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            +7
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              sx={styles.closeIconWrap}
              onClick={resetField}
            >
              <CloseIcon />
            </IconButton>
          </InputAdornment>
        ),
      }}
      label={label}
      helperText={errorType && t(`orderDetails.errorMessages.${errorType}`)}
      InputLabelProps={{ shrink: true }}
    />
  );
};
