import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogContentText from '@mui/material/DialogContentText';
import { RefundIcon } from '../../../components/Icons';
import { Dialog } from '../../../components/Dialog';
import type { DialogProps } from '../types';
import { useOrderFullRefund } from '../api';

export const TotalRefundDialog = ({
  id,
  open,
  onClose,
}: DialogProps) => {
  const { t } = useTranslation();
  const orderTotalRefundMutation = useOrderFullRefund();

  return (
    <Dialog
      open={open}
      loading={orderTotalRefundMutation.isLoading}
      title={t('dialog.titles.fullRefund')}
      color="success"
      buttonText={t('buttons.fullRefund')}
      icon={RefundIcon}
      onClose={onClose}
      onSuccess={() => {
        orderTotalRefundMutation.mutate(
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
        {t('dialog.descriptions.fullRefund')}
      </DialogContentText>
    </Dialog>
  );
};
