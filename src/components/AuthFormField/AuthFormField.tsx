import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import { Theme } from '@mui/material';
import {
  ArrowRightIcon,
  EyeInactiveIcon,
  EyeIcon,
} from '../Icons';

const styles = {
  textFiled: {
    width: '100%',
    '& .MuiInput-root': {
      '&:after': {
        borderBottom: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
      },
      '&:before': {
        borderBottom: '1px solid #151516',
      },
      '&:hover:not(.Mui-disabled):before': {
        borderBottom: (theme: Theme) => `1px solid ${theme.palette.primary.main}`,
      },
      '& .MuiInput-input': {
        fontFamily: 'Roboto, sans-serif',
        fontSize: '2.188rem',
        height: '90px',
        color: '#151516',

        '&::placeholder': {
          color: '#DEE0EA',
          opacity: 1,
        },
      },
    },
    '& .MuiInputLabel-root': {
      top: '16px',
      color: '#151516',

      '&.Mui-focused': {
        color: (theme: Theme) => theme.palette.primary.main,
      },
    },
    '& .MuiInputAdornment-root': {
      width: '26px',
      height: '100%',
      cursor: 'pointer',
      '& .MuiButton-root': {
        minWidth: 'auto',
        color: (theme: Theme) => theme.colors.echoBlue,
        padding: 0,

        '&:hover': {
          paddingLeft: '1px',
          backgroundColor: (theme: Theme) => theme.colors.white,
        },
      },
    },
  },
  activeIcon: {
    color: (theme: Theme) => theme.palette.primary.main,
  },
  inactiveIcon: {
    color: (theme: Theme) => theme.colors.solitudeSecondary,
  },
};

interface Props {
  fieldIndicator: string;
  label: string;
  placeholder: string;
  type: string;
  error: boolean;
  loading?: boolean;
  refs: any;
  onClick: () => void;
}

const AuthFormField = ({
  fieldIndicator,
  label,
  placeholder,
  type,
  error,
  loading = false,
  refs,
  onClick,
}: Props) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const onTriggerEyeIcon = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      sx={styles.textFiled}
      {...refs}
      variant="standard"
      label={label}
      error={error}
      placeholder={placeholder}
      autoComplete="off"
      type={
        (type === 'password' && showPassword) ? 'text' : type
      }
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        endAdornment: (
          <>
            {
              fieldIndicator === 'password' && (
                <InputAdornment position="end">
                  <Button type="button" onClick={onTriggerEyeIcon}>
                    {
                      showPassword ? (
                        <EyeIcon
                          sx={styles.activeIcon}
                          fontSize="small"
                        />
                      ) : (
                        <EyeInactiveIcon
                          sx={styles.inactiveIcon}
                          fontSize="small"
                        />
                      )
                    }
                  </Button>
                </InputAdornment>
              )
            }
            <InputAdornment position="end">
              <LoadingButton
                loading={loading}
                onClick={onClick}
              >
                {!loading && (
                  <ArrowRightIcon
                    fontSize="small"
                    viewBox="0 0 26 24"
                  />
                )}
              </LoadingButton>
            </InputAdornment>
          </>
        ),
      }}
    />
  );
};

export default AuthFormField;
