import React from 'react';
import { useTranslation } from 'react-i18next';
import Typography from '@mui/material/Typography';
import { MenuItem, Select, Theme } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { TableFilterAction } from '../../common/enums';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'baseline',
  },
  formView: (disabled: boolean) => ({
    border: (theme: Theme) => `1px solid ${theme.colors.solitudeSecondary}`,
    borderRadius: (theme: Theme) => theme.spacing(1.25),
    boxShadow: 2,
    minWidth: (theme: Theme) => theme.spacing(22.5),
    backgroundColor: (theme: Theme) => theme.colors.white,
    '&:hover': {
      borderColor: disabled ? 'none' : (theme: Theme) => theme.palette.primary.dark,
    },
    '& .MuiInput-root': {
      marginTop: 0,
    },
    '& .MuiInputLabel-root': {
      top: (theme: Theme) => theme.spacing(2.8),
    },
    '& .MuiSelect-select': {
      display: 'flex',
      padding: (theme: Theme) => theme.spacing(
        1,
        0,
      ),
    },
  }),
  total1: {
    letterSpacing: 0,
    color: (theme: Theme) => theme.colors.manatee,
    marginLeft: (theme: Theme) => theme.spacing(2),
  },
  selectedView: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

interface Props {
  page: number;
  size: number;
  total: number;
  dispatch: React.Dispatch<any>,
}

export const TablePageSize = ({
  dispatch,
  page,
  size,
  total,
}: Props) => {
  const { t } = useTranslation();

  const handleChange = (e: SelectChangeEvent) => {
    dispatch({ type: TableFilterAction.ADD_CURRENT_PAGE_SIZE, value: e.target.value });
  };

  return (
    <Box sx={styles.root}>
      <FormControl
        sx={styles.formView(!total)}
        disabled={!total}
      >
        <InputLabel shrink color="info">
          <Typography variant="body1" color="info">
            {t('pagination.onPage')}
          </Typography>
        </InputLabel>
        <Select
          autoWidth
          disableUnderline
          value={size.toString()}
          input={<Input />}
          MenuProps={{
            transformOrigin: {
              vertical: 160,
              horizontal: 'center',
            },
          }}
          renderValue={(selected) => (
            <Box sx={styles.selectedView}>
              {selected}
            </Box>
          )}
          onChange={handleChange}
        >
          <MenuItem value={25}>25</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
      <Typography
        variant="body2"
        sx={styles.total1}
      >
        {size * page + 1}
        {' - '}
        {size * page + size}
        {' '}
        {t('pagination.from')}
        {' '}
        {total}
      </Typography>
    </Box>
  );
};
