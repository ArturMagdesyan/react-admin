import React from 'react';
import { useTranslation } from 'react-i18next';
import LoadingButton from '@mui/lab/LoadingButton';
import { Theme } from '@mui/material';
import { DownloadIcon } from '../Icons';

const styles = {
  button: {
    typography: 'body2',
    minHeight: '38px',
    minWidth: '140px',
    backgroundColor: (theme: Theme) => theme.colors.white,
    boxShadow: 2,
    gap: 1.5,
    '& .MuiSvgIcon-root': {
      color: (theme: Theme) => theme.palette.primary.main,
    },
    color: (theme: Theme) => theme.palette.info.main,
    '&:hover': {
      padding: (theme: Theme) => theme.spacing(0.8, 1),
      color: (theme: Theme) => theme.colors.white,
      background: (theme: Theme) => theme.palette.primary.main,
      '& .MuiSvgIcon-root': {
        color: (theme: Theme) => theme.colors.pattensBlue,
      },
    },
  },
};

interface Props {
  isLoading: boolean,
  onClick: () => void;
}

export const CsvExportButton = ({
  isLoading,
  onClick,
}: Props) => {
  const { t } = useTranslation();

  return (
    <LoadingButton
      sx={styles.button}
      disabled={isLoading}
      onClick={onClick}
      loading={isLoading}
      loadingPosition="end"
      endIcon={<DownloadIcon />}
    >
      {t('buttons.exportCsv')}
    </LoadingButton>
  );
};
