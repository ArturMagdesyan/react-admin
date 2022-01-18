import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { t, i18n } = useTranslation();

  return (
    <Box display="flex" flexDirection="row">
      <Box m={2}>
        <Button
          variant={i18n.language === 'en' ? 'contained' : 'outlined'}
          onClick={() => i18n.changeLanguage('en')}
        >
          {t('english')}
        </Button>
      </Box>
      <Box m={2}>
        <Button
          variant={i18n.language === 'es' ? 'contained' : 'outlined'}
          onClick={() => i18n.changeLanguage('es')}
        >
          {t('spanish')}
        </Button>
      </Box>
    </Box>
  );
};

export default LanguageSelector;
