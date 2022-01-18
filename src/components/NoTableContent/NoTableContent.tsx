import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const NoTableContent = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      <Typography
        variant="button"
        color="info.main"
      >
        {t('errors.fetchError')}
      </Typography>
    </Box>
  );
};
