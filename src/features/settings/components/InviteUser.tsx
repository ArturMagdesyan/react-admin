import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { AddIcon } from '../../../components/Icons';
import { TableButton } from '../../../components/TableButton';
import { UserInvitationDialog } from '../../dialogs';
import { useDialog } from '../../../hooks';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
  },
};

export const InviteUser = () => {
  const { t } = useTranslation();
  const addUserDialog = useDialog();

  const handleActionClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    addUserDialog.onTrigger();
    event.stopPropagation();
  };

  return (
    <>
      <Box sx={styles.root}>
        <TableButton
          size="medium"
          background="primary"
          onClick={handleActionClick}
        >
          <AddIcon fontSize="small" />
        </TableButton>
        <Typography
          color="info.main"
          variant="button"
        >
          {t('settings.invite')}
        </Typography>
      </Box>
      <UserInvitationDialog
        onClose={addUserDialog.onClose}
        open={addUserDialog.open}
      />
    </>
  );
};
