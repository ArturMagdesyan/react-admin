import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { Theme } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { Dialog } from '../../../components/Dialog';
import type { NewOrganization } from '../types';
import {
  bankIdCodeControl,
  paymentAccountControl,
  tinControl,
  organizationNameControl,
} from '../validators/organizationValidator';
import { useAddOrganization } from '../api/addOrganization';

interface Form {
  organizationName: string;
  tin: number;
  bankIdCode: number;
  paymentAccount: number;
}

const styles = {
  root: {
    height: '52px',
    '& .MuiFormHelperText-root': {
      color: (theme: Theme) => theme.palette.error.main,
    },
  },

  initialOrganization: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
};

export const AddOrganizationDialog = ({
  open,
  onClose,
}: NewOrganization) => {
  const { t } = useTranslation();
  const { userId } = useParams();
  const addOrganizationMutate = useAddOrganization();
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useForm<Form>({
    reValidateMode: 'onChange',
  });
  const { bankIdCode, paymentAccount, tin } = getValues();
  const [isPrimary, setIsPrimary] = useState<boolean>(false);

  const onSuccess = () => {
    if (isValid) {
      addOrganizationMutate.mutate(
        {
          tin: tin.toString(),
          userId: Number(userId)!,
          bic: bankIdCode.toString(),
          settlementAccount: paymentAccount.toString(),
          primary: isPrimary,
        },
        {
          onSettled: () => {
            onClose();
          },
        },
      );
    }
  };

  return (
    <Dialog
      open={open}
      loading={addOrganizationMutate.isLoading}
      title={t('dialog.titles.newOrganization')}
      buttonText={t('buttons.add')}
      color="primary"
      size="large"
      onClose={onClose}
      onSuccess={handleSubmit(onSuccess)}
    >
      <FormControl fullWidth>
        <TextField
          sx={styles.root}
          fullWidth
          label={t('addOrganization.organizationName')}
          type="text"
          variant="standard"
          size="small"
          margin="normal"
          error={!!errors.organizationName}
          helperText={errors.organizationName?.message}
          {...register('organizationName', organizationNameControl)}
        />
        <TextField
          sx={styles.root}
          fullWidth
          label={t('addOrganization.tin')}
          type="text"
          variant="standard"
          size="small"
          margin="normal"
          error={!!errors.tin}
          helperText={errors.tin?.message}
          {...register('tin', tinControl)}
        />
        <TextField
          sx={styles.root}
          fullWidth
          label={t('addOrganization.bankIdCode')}
          type="text"
          variant="standard"
          size="small"
          margin="normal"
          error={!!errors.bankIdCode}
          helperText={errors.bankIdCode?.message}
          {...register('bankIdCode', bankIdCodeControl)}
        />
        <TextField
          sx={styles.root}
          fullWidth
          label={t('addOrganization.paymentAccount')}
          type="text"
          variant="standard"
          size="small"
          margin="normal"
          error={!!errors.paymentAccount}
          helperText={errors.paymentAccount?.message}
          {...register('paymentAccount', paymentAccountControl)}
        />
      </FormControl>
      <Box sx={styles.initialOrganization}>
        <Typography color="info" variant="body2">
          {t('addOrganization.initialOrganization')}
        </Typography>
        <FormControlLabel
          control={<Switch checked={isPrimary} color="primary" />}
          label=""
          onChange={() => {
            setIsPrimary(!isPrimary);
          }}
          sx={{ margin: 0 }}
        />
      </Box>
    </Dialog>
  );
};
