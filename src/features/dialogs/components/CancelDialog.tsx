import React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import { useTranslation } from 'react-i18next';
import { Dialog } from '../../../components/Dialog';
import { CloseIcon } from '../../../components/Icons';
import type { DialogProps } from '../types';
import { useOrderCancel } from '../api';

export const CancelDialog = ({
  id,
  open,
  onClose,
}: DialogProps) => {
  const { t } = useTranslation();
  const orderCancelMutation = useOrderCancel();

  return (
    <Dialog
      open={open}
      loading={orderCancelMutation.isLoading}
      title={t('dialog.titles.cancel')}
      buttonText={t('buttons.cancel')}
      color="error"
      icon={CloseIcon}
      onClose={onClose}
      onSuccess={() => {
        orderCancelMutation.mutate(
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
        {t('dialog.descriptions.cancel')}
      </DialogContentText>
    </Dialog>
  );
};
