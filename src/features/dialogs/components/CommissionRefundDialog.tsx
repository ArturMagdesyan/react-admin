import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogContentText from '@mui/material/DialogContentText';
import { Dialog } from '../../../components/Dialog';
import { PercentIcon } from '../../../components/Icons';
import type { DialogProps } from '../types';
import { useOrderFeeRefund } from '../api';

export const CommissionRefundDialog = ({
  id,
  open,
  onClose,
}: DialogProps) => {
  const { t } = useTranslation();
  const orderFeeRefundMutation = useOrderFeeRefund();

  return (
    <Dialog
      open={open}
      loading={orderFeeRefundMutation.isLoading}
      title={t('dialog.titles.feeRefund')}
      color="warning"
      buttonText={t('buttons.feeRefund')}
      icon={PercentIcon}
      onClose={onClose}
      onSuccess={() => {
        orderFeeRefundMutation.mutate(
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
        {t('dialog.descriptions.feeRefund')}
      </DialogContentText>
    </Dialog>
  );
};
