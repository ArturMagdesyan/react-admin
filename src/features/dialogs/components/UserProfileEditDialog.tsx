import React, {
  useCallback,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '../../../components/Dialog';
import { TableInputField } from '../../../components/TableInputField';
import type { DialogProps, UserManageType } from '../types';
import { useManageUserProfile } from '../api';

interface Props extends Omit<DialogProps, 'id'> {
  username: string;
  initialValue?: number;
  title: string;
  label: string;
  type: UserManageType;
}

export const UserProfileEditDialog = ({
  open,
  title,
  label,
  onClose,
  username,
  initialValue,
  type,
}: Props) => {
  const { t } = useTranslation();
  const [editValue, setEditValue] = useState<number>();
  const mutateBalance = useManageUserProfile();

  const onEditConfiguration = useCallback(() => {
    if (!editValue) return;

    mutateBalance.mutate({
      username,
      type,
      data: editValue,
    });
    onClose();
  }, [editValue, mutateBalance, onClose, type, username]);

  const onChange = (value: string) => {
    setEditValue(parseInt(value, 10));
  };

  return (
    <Dialog
      disable={!editValue}
      isLight
      open={open}
      title={title}
      color="primary"
      buttonText={t('buttons.confirm')}
      onClose={onClose}
      onSuccess={onEditConfiguration}
    >
      <TableInputField
        focused
        label={label}
        placeholder="7600"
        type="negativeNumber"
        defaultValue={initialValue}
        onChange={onChange}
      />
    </Dialog>
  );
};
