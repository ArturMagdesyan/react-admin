import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import type { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import type { Theme } from '@mui/material';
import { UserRole } from '../../../common/enums';
import { UserRolesData } from '../constants';
import { useUpdateSettings } from '../api';

const styles = {
  height: '30px',
  width: '134px',
  '& .MuiSelect-icon': {
    fontSize: (theme: Theme) => theme.spacing(2),
  },
  '& .MuiSelect-select': {
    display: 'flex',
    alignItems: 'center',
    background: 'inherit',
  },
};

interface Props {
  role: UserRole;
  userId: number;
}

const SelectRole = ({ role, userId }: Props) => {
  const { t } = useTranslation();
  const updateSettingsMutation = useUpdateSettings();

  const onChange = ({ target: { value } }: SelectChangeEvent) => {
    updateSettingsMutation.mutate({
      userId,
      data: {
        roleName: value as UserRole,
      },
    });
  };

  return (
    <Select
      sx={styles}
      value={role}
      variant="standard"
      onChange={onChange}
      disableUnderline
      renderValue={(selectedRole) => (
        <Typography color="primary" variant="body2">
          {t(`settings.userRoles.${selectedRole}`)}
        </Typography>
      )}
    >
      {UserRolesData.map((userRole) => (
        <MenuItem value={userRole.key} key={userRole.key}>
          <Typography color={role === userRole.key ? 'primary' : 'info'}>
            {t(`settings.userRoles.${userRole.key}`)}
          </Typography>
        </MenuItem>
      ))}
    </Select>
  );
};

export default SelectRole;
