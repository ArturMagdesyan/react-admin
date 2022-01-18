import React, { useEffect, useState } from 'react';
import DialogContentText from '@mui/material/DialogContentText';
import type { Theme } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { Dialog } from '../../../components/Dialog';
import type { DialogProps } from '../types';

const styles = {
  dialogContent: {
    marginBottom: (theme: Theme) => theme.spacing(4.75),
  },
};

interface Props extends Omit<DialogProps, 'id'> {
  initialComment: string;
  onSuccess: (newCommit: string) => void;
}

export const EditCommentDialog = ({
  open,
  initialComment,
  onSuccess,
  onClose,
}: Props) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState<string>('');

  const onSubmit = () => {
    onSuccess(comment);
    onClose();
  };

  useEffect(() => {
    setComment(initialComment);
  }, [initialComment]);

  return (
    <Dialog
      disable={!comment}
      hasMinHeight
      open={open}
      size="medium"
      color="primary"
      title={t(`dialog.titles.${initialComment ? 'editComment' : 'addComment'}`)}
      buttonText={t(`buttons.${initialComment ? 'save' : 'add'}`)}
      onClose={onClose}
      onSuccess={onSubmit}
    >
      <DialogContentText
        sx={styles.dialogContent}
        variant="body2"
      >
        {t('dialog.descriptions.comment')}
      </DialogContentText>
      <TextField
        fullWidth
        multiline
        variant="standard"
        type="text"
        placeholder={t('dialog.placeholders.editComment')}
        value={comment}
        onChange={({ target: { value } }) => {
          setComment(value);
        }}
      />
    </Dialog>
  );
};
