import React from 'react';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import type { Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import type { FieldError, UseFormRegister } from 'react-hook-form';
import { UserRole } from '../../../common/enums';
import {
  phoneNumberControl,
  userNameControl,
  emailControl,
} from '../../dialogs/validators';
import type { UserInvitation } from '../../dialogs/types';

const styles = {
  root: {
    height: '52px',
    '& .MuiFormHelperText-root': {
      color: (theme: Theme) => theme.palette.error.main,
    },
  },
  radioSpace: {
    marginTop: (theme: Theme) => theme.spacing(2.5),
  },
};

interface Props {
  register: UseFormRegister<UserInvitation>;
  errors: Record<string, FieldError>;
}

const UserInvitationForm = ({ register, errors }: Props) => {
  const { t } = useTranslation();

  return (
    <FormControl fullWidth>
      <TextField
        sx={styles.root}
        fullWidth
        label={t('table.headers.email')}
        placeholder="ivan.ivanov@gmail.com"
        type="text"
        variant="standard"
        size="small"
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
        InputLabelProps={{ shrink: true }}
        {...register('email', emailControl)}
      />
      <TextField
        sx={styles.root}
        fullWidth
        label={t('settings.fullName')}
        placeholder={t('settings.fullName')}
        type="text"
        variant="standard"
        size="small"
        margin="normal"
        error={!!errors.name}
        helperText={errors.name?.message}
        InputLabelProps={{ shrink: true }}
        {...register('name', userNameControl)}
      />
      <TextField
        sx={styles.root}
        fullWidth
        label={t('settings.phoneNumber')}
        placeholder={t('settings.phoneNumber')}
        type="text"
        variant="standard"
        size="small"
        margin="normal"
        error={!!errors.phone}
        helperText={errors.phone?.message}
        InputLabelProps={{ shrink: true }}
        {...register('phone', phoneNumberControl)}
      />
      <RadioGroup
        defaultValue={UserRole.ROLE_ADMIN}
        sx={styles.radioSpace}
      >
        <FormControlLabel
          {...register('roleName')}
          value={UserRole.ROLE_ADMIN}
          control={<Radio color="primary" />}
          label={t(`settings.userRoles.${UserRole.ROLE_ADMIN}`)}
        />
        <FormControlLabel
          {...register('roleName')}
          value={UserRole.ROLE_PARTICIPANT_ADMIN}
          control={<Radio color="primary" />}
          label={t(`settings.userRoles.${UserRole.ROLE_PARTICIPANT_ADMIN}`)}
        />
        <FormControlLabel
          {...register('roleName')}
          value={UserRole.ROLE_VIEWER_ADMIN}
          control={<Radio color="primary" />}
          label={t(`settings.userRoles.${UserRole.ROLE_VIEWER_ADMIN}`)}
        />
      </RadioGroup>
    </FormControl>
  );
};

export default UserInvitationForm;
