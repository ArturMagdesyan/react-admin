import React from 'react';
import { useTranslation } from 'react-i18next';
import type { UseFormRegisterReturn } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import LoadingButton from '@mui/lab/LoadingButton';
import type { Theme } from '@mui/material';
import { AddIcon, ArrowRightIcon } from '../../../../components/Icons';

interface Props {
  loading: boolean;
  inputType: 'phone' | 'email' | 'phoneNumberVerificationCode';
  errorMessage: string;
  refs: UseFormRegisterReturn;
  onSubmit: () => void;
}

const placeholders = {
  phone: '(916) 123-4567',
  phoneNumberVerificationCode: '1234',
  email: 'i.ivanov@info.ru',
};

const styles = {
  textFiled: {
    '& .MuiInput-root': {
      padding: (theme: Theme) => theme.spacing(1.25, 0),
      fontSize: (theme: Theme) => theme.spacing(2.25),
    },
  },
  addButton: {
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    '&:hover': {
      padding: 0,
    },
  },
  suffix: {
    color: (theme: Theme) => theme.colors.blackRussian,
  },
};

export const UserCredentialTypeField = ({
  loading,
  inputType,
  refs,
  onSubmit,
  errorMessage,
}: Props) => {
  const { t } = useTranslation();

  return (
    <TextField
      fullWidth
      size="medium"
      sx={styles.textFiled}
      variant="standard"
      label={t(`userCredentialsDialog.${inputType}`)}
      error={!!errorMessage}
      placeholder={placeholders[inputType]}
      helperText={errorMessage}
      {...refs}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Typography variant="h6" sx={styles.suffix}>
              {inputType === 'phone' && '+7'}
            </Typography>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            <LoadingButton
              loading={loading}
              sx={styles.addButton}
              type="button"
              onClick={onSubmit}
            >
              {inputType === 'phoneNumberVerificationCode'
                ? (
                  !loading && (
                    <ArrowRightIcon
                      sx={{ color: (theme) => theme.colors.blackRussian }}
                      fontSize="small"
                      viewBox="0 0 26 24"
                    />
                  )
                ) : (
                  !loading && (
                    <AddIcon
                      fontSize="small"
                      viewBox="0 0 26 24"
                    />
                  )
                )}
            </LoadingButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
