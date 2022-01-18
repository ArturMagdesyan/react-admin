import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Theme } from '@mui/material';

const styles = {
  addButton: {
    minHeight: '32px',
  },
  editText: {
    cursor: 'pointer',
    color: (theme: Theme) => theme.colors.manatee,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

interface Props {
  comment: string | null;
  onSubmit: () => void;
}

export const TableCommentField = ({
  comment,
  onSubmit,
}: Props) => {
  const { t } = useTranslation();

  return (
    <Box>
      {
        comment ? (
          <Typography variant="body2" component="span">
            {comment}
            <Typography
              sx={styles.editText}
              variant="body2"
              component="span"
              onClick={onSubmit}
            >
              {' '}
              {t('buttons.editComment')}
            </Typography>
          </Typography>
        ) : (
          <Button
            sx={styles.addButton}
            onClick={onSubmit}
          >
            {t('buttons.addComment')}
          </Button>
        )
      }
    </Box>
  );
};
