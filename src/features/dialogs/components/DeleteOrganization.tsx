import React from 'react';
import { useTranslation } from 'react-i18next';
import DialogContentText from '@mui/material/DialogContentText';
import { useDeleteOrganization } from '../api';
import { DeleteIcon } from '../../../components/Icons';
import { Dialog } from '../../../components/Dialog';
import type { DialogProps } from '../types';

interface Props extends DialogProps {
  tin: string;
}

export const DeleteOrganization = ({
  open,
  onClose,
  id,
  tin,
}: Props) => {
  const { t } = useTranslation();
  const deleteOrganizationMutate = useDeleteOrganization();

  const onSuccess = () => {
    deleteOrganizationMutate.mutate(
      { tin, userId: id },
      {
        onSettled: () => {
          onClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      title={t('dialog.titles.delete')}
      color="error"
      loading={deleteOrganizationMutate.isLoading}
      buttonText={t('buttons.delete')}
      icon={DeleteIcon}
      onClose={onClose}
      onSuccess={onSuccess}
    >
      <DialogContentText variant="body2">
        {t('dialog.descriptions.organization')}
      </DialogContentText>
    </Dialog>
  );
};
