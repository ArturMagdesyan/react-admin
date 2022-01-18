import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogContentText from '@mui/material/DialogContentText';
import { Dialog } from '../../../components/Dialog';
import { LockIcon } from '../../../components/Icons';
import type { DialogProps } from '../types';
import { useLockUser } from '../api';

interface Props extends Omit<DialogProps, 'id'> {
  id: string;
}

export const LockDialog = ({
  id,
  open,
  onClose,
}: Props) => {
  const { t } = useTranslation();
  const lockUserMutation = useLockUser();

  return (
    <Dialog
      open={open}
      loading={lockUserMutation.isLoading}
      title={t('dialog.titles.lock')}
      color="info"
      buttonText={t('buttons.lock')}
      icon={LockIcon}
      onClose={onClose}
      onSuccess={() => {
        lockUserMutation.mutate(
          id,
          {
            onSettled: () => {
              onClose();
            },
          },
        );
      }}
    >
      <DialogContentText variant="body2">
        {t('dialog.descriptions.lock')}
      </DialogContentText>
    </Dialog>
  );
};
