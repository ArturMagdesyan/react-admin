import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogContentText from '@mui/material/DialogContentText';
import { Dialog } from '../../../components/Dialog';
import { UnlockIcon } from '../../../components/Icons';
import type { DialogProps } from '../types';
import { useUnlockUser } from '../api';

interface Props extends Omit<DialogProps, 'id'> {
  id: string;
}

export const UnlockDialog = ({
  id,
  open,
  onClose,
}: Props) => {
  const { t } = useTranslation();
  const unlockUserMutation = useUnlockUser();

  return (
    <Dialog
      open={open}
      loading={unlockUserMutation.isLoading}
      title={t('dialog.titles.unlock')}
      color="success"
      buttonText={t('buttons.unlock')}
      icon={UnlockIcon}
      onClose={onClose}
      onSuccess={() => {
        unlockUserMutation.mutate(
          id!,
          {
            onSettled: () => {
              onClose();
            },
          },
        );
      }}
    >
      <DialogContentText variant="body2">
        {t('dialog.descriptions.unlock')}
      </DialogContentText>
    </Dialog>
  );
};
