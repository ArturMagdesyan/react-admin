import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import MuiDateRangePicker, { DateRange } from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material';
import { useDialog } from '../../hooks';
import { ArrowDownIcon, ArrowUpIcon } from '../Icons';
import { dateFormatted } from '../../utils/dateFormat';

const styles = {
  button: {
    minWidth: '294px',
    height: '40px',
    bgcolor: (theme: Theme) => theme.colors.white,
    justifyContent: 'flex-start',
    boxShadow: 2,
    ml: (theme: Theme) => theme.spacing(1.5),
    padding: (theme: Theme) => theme.spacing(1.215),
    '&:hover': {
      bgcolor: (theme: Theme) => theme.colors.white,
      padding: (theme: Theme) => theme.spacing(1.215),
      '&>.MuiTypography-root': {
        color: (theme: Theme) => theme.palette.primary.main,
      },
    },
  },
  infoText: {
    color: (theme: Theme) => theme.palette.info.main,
    pr: (theme: Theme) => theme.spacing(2),
  },
  dateText: {
    color: (theme: Theme) => theme.colors.echoBlue,
  },
  iconView: {
    right: (theme: Theme) => theme.spacing(0.5),
  },
};

interface Props {
  onFilter: ({
    startDate,
    endDate,
  }: {
    startDate: string,
    endDate: string,
  }) => void;
}

export const DateRangePicker = ({ onFilter }: Props) => {
  const [value, setValue] = React.useState<DateRange<Date>>([null, null]);
  const datePickerDialog = useDialog();
  const { t } = useTranslation();
  const location = useLocation();

  const onChange = (newValue: DateRange<Date>) => {
    if (!!newValue[0] && !!newValue[1]) {
      onFilter({
        startDate: dateFormatted(newValue[0]),
        endDate: dateFormatted(newValue[1]),
      });
    }
    setValue(newValue);
  };

  useEffect(() => {
    setValue([null, null]);
  }, [location.pathname]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiDateRangePicker
        value={value}
        onChange={onChange}
        open={datePickerDialog.open}
        onClose={datePickerDialog.onClose}
        inputFormat="dd/MM/yyyy"
        renderInput={(
          startProps: any,
          endProps: any,
        ) => (
          <Button
            sx={styles.button}
            onClick={datePickerDialog.onTrigger}
          >
            <Typography
              sx={styles.infoText}
              variant="body2"
            >
              {t('filters.statisticsFor')}
            </Typography>
            <Box>
              {
                (startProps.inputProps.value && endProps.inputProps.value) && (
                  <Typography
                    sx={styles.dateText}
                    variant="body2"
                  >
                    {startProps.inputProps.value}
                    {' - '}
                    {endProps.inputProps.value}
                  </Typography>
                )
              }
            </Box>
            <Box
              position="absolute"
              sx={styles.iconView}
            >
              {
                datePickerDialog.open
                  ? (
                    <ArrowUpIcon color="info" />
                  ) : (
                    <ArrowDownIcon color="info" />
                  )
              }
            </Box>
          </Button>
        )}
      />
    </LocalizationProvider>
  );
};
