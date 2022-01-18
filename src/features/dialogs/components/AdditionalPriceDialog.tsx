import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddIcon } from '../../../components/Icons';
import { Dialog } from '../../../components/Dialog';
import { TableInputField } from '../../../components/TableInputField';
import type { DialogProps } from '../types';
import { useOrderAdditionalPrice } from '../api';

export const AdditionalPriceDialog = ({
  id,
  open,
  onClose,
}: DialogProps) => {
  const { t } = useTranslation();
  const [price, setPrice] = useState<number | null>(null);
  const additionalPriceMutation = useOrderAdditionalPrice();

  const onChange = (value: string) => {
    setPrice(parseInt(value, 10));
  };

  return (
    <Dialog
      open={open}
      title={t('dialog.titles.extraPrice')}
      buttonText={t('buttons.extraPrice')}
      color="secondary"
      icon={AddIcon}
      disable={!price}
      loading={additionalPriceMutation.isLoading}
      onClose={onClose}
      onSuccess={() => {
        additionalPriceMutation.mutate(
          {
            orderId: id,
            amount: price!,
          },
          {
            onSettled: () => {
              onClose();
            },
          },
        );
      }}
    >
      <TableInputField
        focused
        label="Сумма (₽)"
        placeholder="7600"
        type="number"
        onChange={onChange}
      />
    </Dialog>
  );
};
