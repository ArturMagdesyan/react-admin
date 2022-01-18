import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogContentText from '@mui/material/DialogContentText';
import { Dialog } from '../../../components/Dialog';
import { LockIcon } from '../../../components/Icons';
import type { DialogProps } from '../types';
import { useAdminLockManager } from '../api';

export interface LockManager {
  type: 'lock' | 'unlock',
  color: 'success' | 'info'
}

export const AdminLockManagerDialog = ({
  color,
  id,
  open,
  onClose,
  type,
}: DialogProps & LockManager) => {
  const { t } = useTranslation();
  const adminLockManagerMutation = useAdminLockManager();

  return (
    <Dialog
      open={open}
      loading={adminLockManagerMutation.isLoading}
      title={t(`dialog.titles.${type}`)}
      color={color}
      buttonText={t(`buttons.${type}`)}
      icon={LockIcon}
      onClose={onClose}
      onSuccess={() => {
        adminLockManagerMutation.mutate(
          {
            userId: id,
            enabled: type === 'unlock',
          },
          {
            onSettled: () => {
              onClose();
            },
          },
        );
      }}
    >
      <DialogContentText variant="body2">
        {t(`dialog.descriptions.${type}`)}
      </DialogContentText>
    </Dialog>
  );
};
