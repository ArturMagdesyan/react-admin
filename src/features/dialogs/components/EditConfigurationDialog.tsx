import React, {
  useCallback,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog } from '../../../components/Dialog';
import { EditIcon } from '../../../components/Icons';
import { TableInputField } from '../../../components/TableInputField';
import type { DialogProps } from '../types';
import { useEditConfiguration } from '../api';

interface Props extends Omit<DialogProps, 'id'> {
  configurationKey: string;
  initialValue: string;
}

export const EditConfigurationDialog = ({
  open,
  onClose,
  inputType,
  configurationKey,
  initialValue,
}: Props) => {
  const { t } = useTranslation();
  const [editValue, setEditValue] = useState<number | string>();
  const mutateConfiguration = useEditConfiguration();

  const onEditConfiguration = useCallback(() => {
    if (!editValue) return;

    mutateConfiguration.mutate({
      configurationKey,
      data: {
        value: editValue,
      },
    },
    {
      onSettled: () => {
        onClose();
      },
    });
  }, [
    editValue,
    configurationKey,
    mutateConfiguration,
    onClose,
  ]);

  const onChange = (value: string) => {
    if (inputType === 'phone') {
      setEditValue(!value ? '' : `+${value}`);
      return;
    }
    setEditValue(parseInt(value, 10));
  };

  return (
    <Dialog
      disable={!editValue}
      isLight
      open={open}
      loading={mutateConfiguration.isLoading}
      title={t('dialog.titles.edit')}
      color="info"
      buttonText={t('buttons.confirm')}
      icon={EditIcon}
      onClose={onClose}
      onSuccess={onEditConfiguration}
    >
      <TableInputField
        focused
        label={t('table.headers.value')}
        placeholder="7600"
        type={inputType!}
        defaultValue={initialValue}
        onChange={onChange}
      />
    </Dialog>
  );
};
