import React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import { useTranslation } from 'react-i18next';
import { DeleteIcon } from '../../../components/Icons';
import { Dialog } from '../../../components/Dialog';
import type { DialogProps } from '../types';
import { useDeleteCustomer } from '../api';

export const DeleteCustomerDialog = ({
  id,
  open,
  onClose,
}: DialogProps) => {
  const { t } = useTranslation();
  const deleteCustomerMutation = useDeleteCustomer();

  return (
    <Dialog
      open={open}
      loading={deleteCustomerMutation.isLoading}
      title={t('dialog.titles.delete')}
      color="error"
      buttonText={t('buttons.delete')}
      icon={DeleteIcon}
      onClose={onClose}
      onSuccess={() => {
        deleteCustomerMutation.mutate(
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
        {t('dialog.descriptions.delete')}
      </DialogContentText>
    </Dialog>
  );
};
