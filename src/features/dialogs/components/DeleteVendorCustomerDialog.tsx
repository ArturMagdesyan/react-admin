import React from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import { useTranslation } from 'react-i18next';
import { DeleteIcon } from '../../../components/Icons';
import { Dialog } from '../../../components/Dialog';
import type { DialogProps } from '../types';
import { useDeleteVendorCustomer } from '../api';

export const DeleteVendorCustomerDialog = ({
  id,
  open,
  onClose,
}: DialogProps) => {
  const { t } = useTranslation();
  const deleteVendorCustomerMutation = useDeleteVendorCustomer();

  return (
    <Dialog
      open={open}
      loading={deleteVendorCustomerMutation.isLoading}
      title={t('dialog.titles.delete')}
      color="error"
      buttonText={t('buttons.delete')}
      icon={DeleteIcon}
      onClose={onClose}
      onSuccess={() => {
        deleteVendorCustomerMutation.mutate(
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
