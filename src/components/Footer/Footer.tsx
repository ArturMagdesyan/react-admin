import React from 'react';
import { useTranslation } from 'react-i18next';
import { Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {
  FacebookIcon,
  TwitterIcon,
  InstagramIcon,
  VKIcon,
  YoutubeIcon,
} from '../Icons';

const styles = {
  root: {
    bgcolor: (theme: Theme) => theme.colors.white,
    width: '100%',
    height: '54px',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTop: '1px solid #c7d3db',
  },
  iconsView: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    marginRight: (theme: Theme) => theme.spacing(1.5),
    color: (theme: Theme) => theme.palette.info.main,
    '&:hover': {
      color: (theme: Theme) => theme.palette.primary.main,
    },
  },
};

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={styles.root}
      position="fixed"
    >
      <Box sx={styles.iconsView}>
        <Link
          sx={styles.link}
          href="https://phedon.ru/"
          target="_blank"
        >
          <FacebookIcon
            fontSize="small"
          />
        </Link>
        <Link
          sx={styles.link}
          href="https://phedon.ru/"
          target="_blank"
        >
          <TwitterIcon
            fontSize="small"
          />
        </Link>
        <Link
          sx={styles.link}
          href="https://phedon.ru/"
          target="_blank"
        >
          <InstagramIcon
            fontSize="small"
          />
        </Link>
        <Link
          sx={styles.link}
          href="https://phedon.ru/"
          target="_blank"
        >
          <VKIcon
            fontSize="small"
          />
        </Link>
        <Link
          sx={styles.link}
          href="https://phedon.ru/"
          target="_blank"
        >
          <YoutubeIcon
            fontSize="small"
          />
        </Link>
      </Box>
      <Box>
        <Typography variant="caption">
          {t('footer.text')}
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
