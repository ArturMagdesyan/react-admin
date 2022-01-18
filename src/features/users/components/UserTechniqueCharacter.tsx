import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Switch from '@mui/material/Switch';
import type { Theme } from '@mui/material';
import { TechniqueCharacterButtons } from './TechniqueCharacterButtons';

const styles = {
  root: {
    boxShadow: 1,
    height: '100%',
    borderRadius: (theme: Theme) => theme.spacing(2.5),
    backgroundColor: (theme: Theme) => theme.colors.white,
    overflow: 'auto',
    padding: (theme: Theme) => theme.spacing(2.25, 0),
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    color: (theme: Theme) => theme.colors.blackRussian,
  },
  headerButton: {
    padding: 0,
    minWidth: 'unset',
    '&:hover': {
      padding: 0,
      backgroundColor: 'transparent',
    },
  },
  text: {
    color: (theme: Theme) => theme.colors.manatee,
  },
  dividerBorderHeight: {
    borderWidth: (theme: Theme) => theme.spacing(0.25),
  },
  dividerBorderColor: {
    borderColor: '#EEF0F6',
  },
};

export const UserTechniqueCharacter = () => {
  const [switchValue, setSwitchValue] = useState<boolean>(true);
  const { t } = useTranslation();

  return (
    <Box sx={styles.root}>
      <Box sx={styles.box} px={3} pb={2}>
        <Typography
          sx={styles.headerText}
          variant="h6"
        >
          {t('technicCharacter.characteristics')}
        </Typography>
        <Button
          sx={styles.headerButton}
          color="primary"
          variant="text"
        >
          {t('technicCharacter.clear')}
        </Button>
      </Box>
      <Divider sx={styles.dividerBorderColor} />
      <Box px={3} py={2}>
        <Box mb={1}>
          <Typography
            gutterBottom
            sx={styles.text}
            variant="body2"
          >
            {t('technicCharacter.boardCarryingCapacity')}
          </Typography>
          <TechniqueCharacterButtons characters={[5, 8, 10, 12, 15, 20]} />
        </Box>
        <Box mb={1}>
          <Typography
            gutterBottom
            sx={styles.text}
            variant="body2"
          >
            {t('technicCharacter.boomLiftingCapacity')}
          </Typography>
          <TechniqueCharacterButtons characters={[3, 5, 7, 9, 12]} />
        </Box>
        <Box mb={1}>
          <Typography
            gutterBottom
            sx={styles.text}
            variant="body2"
          >
            {t('technicCharacter.boardLength')}
          </Typography>
          <TechniqueCharacterButtons characters={[5, 6, 7, 8, 9, 12, 14]} />
        </Box>
      </Box>
      <Divider
        sx={{
          ...styles.dividerBorderColor,
          ...styles.dividerBorderHeight,
        }}
      />
      <Box px={3}>
        <Box sx={styles.box}>
          <Typography
            sx={styles.text}
            variant="body1"
          >
            {t('technicCharacter.crossCountryVehicle')}
          </Typography>
          <Switch
            checked={switchValue}
            onChange={(e, value) => {
              setSwitchValue(value);
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            sx={styles.text}
            variant="body1"
          >
            {t('technicCharacter.length')}
          </Typography>
          <Switch
            checked={switchValue}
            onChange={(e, value) => {
              setSwitchValue(value);
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            sx={styles.text}
            variant="body1"
          >
            {t('technicCharacter.lowLoader')}
          </Typography>
          <Switch
            checked={switchValue}
            onChange={(e, value) => {
              setSwitchValue(value);
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            sx={styles.text}
            variant="body1"
          >
            {t('technicCharacter.trailer')}
          </Typography>
          <Switch
            checked={switchValue}
            onChange={(e, value) => {
              setSwitchValue(value);
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            sx={styles.text}
            variant="body1"
          >
            {t('technicCharacter.slingingServices')}
          </Typography>
          <Switch
            checked={switchValue}
            onChange={(e, value) => {
              setSwitchValue(value);
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            sx={styles.text}
            variant="body1"
          >
            {t('technicCharacter.cradle')}
          </Typography>
          <Switch
            checked={switchValue}
            onChange={(e, value) => {
              setSwitchValue(value);
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            sx={styles.text}
            variant="body1"
          >
            {t('technicCharacter.konik')}
          </Typography>
          <Switch
            checked={switchValue}
            onChange={(e, value) => {
              setSwitchValue(value);
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            sx={styles.text}
            variant="body1"
          >
            {t('technicCharacter.pyramid')}
          </Typography>
          <Switch
            checked={switchValue}
            onChange={(e, value) => {
              setSwitchValue(value);
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            sx={styles.text}
            variant="body1"
          >
            {t('technicCharacter.sucker')}
          </Typography>
          <Switch
            checked={switchValue}
            onChange={(e, value) => {
              setSwitchValue(value);
            }}
          />
        </Box>
        <Box sx={styles.box}>
          <Typography
            sx={styles.text}
            variant="body1"
          >
            {t('technicCharacter.rearOverhang')}
          </Typography>
          <Switch
            checked={switchValue}
            onChange={(e, value) => {
              setSwitchValue(value);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};
