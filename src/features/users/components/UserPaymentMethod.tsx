import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import type { Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Divider from '@mui/material/Divider';
import { AddIcon, CheckIcon, DeleteIcon } from '../../../components/Icons';
import { TableButton } from '../../../components/TableButton';
import { useDialog } from '../../../hooks';
import { DeleteOrganization, AddOrganizationDialog } from '../../dialogs/components';
import { useGetCompany } from '../api/user-payment-method';

const styles = {
  root: {
    boxShadow: 1,
    height: '100%',
    borderRadius: '20px',
    backgroundColor: (theme: Theme) => theme.colors.white,
    overflow: 'auto',
    padding: (theme: Theme) => theme.spacing(2.25, 3.75),
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleView: {
    color: (theme: Theme) => theme.colors.blackRussian,
  },
  generalText: {
    color: (theme: Theme) => theme.colors.mischka,
  },
  organizationTitle: {
    color: (theme: Theme) => theme.colors.mischka,
    mt: (theme: Theme) => theme.spacing(3),
  },
  addOrganizationButton: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
      padding: 0,
    },
  },
  paymentMethod: {
    display: 'flex',
    alignItems: 'center',
    gap: (theme: Theme) => theme.spacing(2.25),
    mt: (theme: Theme) => theme.spacing(1),
    padding: (theme: Theme) => theme.spacing(1),
  },
  editButton: {
    minWidth: 'unset',
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  space: {
    marginTop: '4px',
  },
};

export const UserPaymentMethod = () => {
  const { t } = useTranslation();
  const addOrganizationDialog = useDialog();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [tin, setTin] = useState<string>('');
  const { userId } = useParams();
  const deleteOrganizationDialog = useDialog();
  const { data } = useGetCompany(userId!);

  const triggerEditMode = () => {
    setEditMode(!editMode);
  };

  return (
    <>
      <Box sx={styles.root}>
        <Box sx={styles.box}>
          <Typography variant="h5" sx={styles.titleView}>{t('paymentMethod.title')}</Typography>
          <Button
            sx={styles.editButton}
            color="primary"
            onClick={triggerEditMode}
          >
            {t('paymentMethod.edit')}
          </Button>
        </Box>
        <Box mt={3}>
          <Box sx={styles.paymentMethod}>
            <AddIcon color="primary" />
            <Typography color="info">{t('paymentMethod.cash')}</Typography>
          </Box>
          <Divider />
          <Box sx={styles.paymentMethod}>
            <AddIcon color="primary" />
            <Box>
              <Typography color="info">Visa - 1486</Typography>
              <Typography
                sx={styles.generalText}
                variant="body2"
                mt={1}
              >
                08/23
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={styles.paymentMethod}>
            <AddIcon color="primary" />
            <Box>
              <Typography color="info">Mir - 1789</Typography>
              <Typography
                sx={styles.generalText}
                variant="body2"
                mt={1}
              >
                06/14
              </Typography>
            </Box>
          </Box>
          <Divider />
          <Box sx={styles.paymentMethod}>
            <AddIcon color="primary" />
            <Box>
              <Typography color="info">MasterCard - 2059</Typography>
              <Typography
                sx={styles.generalText}
                variant="body2"
                mt={1}
              >
                10/24
              </Typography>
            </Box>
          </Box>
          <Divider />
        </Box>
        <Typography sx={styles.organizationTitle}>{t('paymentMethod.organization')}</Typography>
        {data?.map((company) => (
          <Box sx={styles.box} my={2} key={company.tin}>
            <Box>
              <Typography
                sx={styles.titleView}
                variant="button"
              >
                {company.organizationName}
              </Typography>
              <Typography
                sx={styles.generalText}
                variant="body2"
              >
                {t('paymentMethod.tin')}
                {' '}
                {company.tin}
              </Typography>
              <Typography
                sx={styles.generalText}
                variant="body2"
              >
                {t('paymentMethod.crr')}
                {' '}
                {company.kpp}
              </Typography>
              <Typography
                sx={styles.generalText}
                variant="body2"
              >
                {t('paymentMethod.paymentAccount')}
                {' '}
                {company.ogrn}
              </Typography>
              <Divider sx={styles.space} variant="fullWidth" />
            </Box>
            {editMode ? (
              <TableButton
                background="error"
                onClick={() => {
                  setTin(company.tin);
                  deleteOrganizationDialog.onTrigger();
                }}
              >
                <DeleteIcon />
              </TableButton>
            ) : (
              company.primary && (
                <Box sx={styles.box}>
                  <Typography color="primary">
                    {t('paymentMethod.basic')}
                  </Typography>
                  <CheckIcon color="primary" />
                </Box>
              )
            )}
          </Box>
        ))}
        <Button
          sx={styles.addOrganizationButton}
          startIcon={<AddIcon color="primary" />}
          color="info"
          onClick={() => {
            addOrganizationDialog.onTrigger();
          }}
        >
          {t('paymentMethod.addOrganization')}
        </Button>
      </Box>
      <AddOrganizationDialog
        open={addOrganizationDialog.open}
        onClose={addOrganizationDialog.onClose}
      />
      <DeleteOrganization
        id={Number(userId)}
        tin={tin}
        open={deleteOrganizationDialog.open}
        onClose={deleteOrganizationDialog.onClose}
      />
    </>
  );
};
