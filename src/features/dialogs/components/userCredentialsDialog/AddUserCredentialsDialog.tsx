import React, {
  useCallback,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { LoadingButton } from '@mui/lab';
import type { Theme } from '@mui/material';
import type { DialogProps } from '../../types';
import { PrimaryDialog } from '../../../../components/Dialog';
import type { SwitchType } from './UserCredentialSwitch';
import { UserCredentialSwitch } from './UserCredentialSwitch';
import { PhoneNumberField } from './PhoneNumberField';
import { PhoneNumberVerificationField } from './PhoneNumberVerificationField';
import { EmailField } from './EmailField';
import { useUserProfile } from '../../../users/api/user-profile';
import { CredentialList } from './CredentialList';
import { Spinner } from '../../../../components/Spinner';
import { useDeletePhoneNumbers } from '../../api';

const styles = {
  container: {
    paddingTop: (theme: Theme) => theme.spacing(1.25),
    paddingBottom: (theme: Theme) => theme.spacing(1.25),
  },
  header: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  editButton: {
    minWidth: 0,
    minHeight: 0,
    padding: 0,
    marginRight: '25px',
    '&:disabled': {
      backgroundColor: 'transparent',
      color: (theme: Theme) => theme.palette.info,
    },
    '&:hover': {
      padding: 0,
      backgroundColor: 'transparent',
    },
  },
  dialogTitle: {
    padding: 0,
  },
  spacing: {
    marginRight: (theme: Theme) => theme.spacing(5),
  },
  titleView: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    borderWidth: (theme: Theme) => theme.spacing(0.25),
  },
  dividerColor: {
    borderColor: '#EEF0F6',
  },
};

export type Step = 'phone' | 'code' | 'email';
interface Props extends Omit<DialogProps, 'id'> {}

export const AddUserCredentialsDialog = ({
  open,
  onClose,
}: Props) => {
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [step, setStep] = useState<Step>('phone');
  const [activateEditMode, setActivateEditMode] = useState<boolean>(false);
  const [activeSwitchType, setActiveSwitchType] = useState<Omit<Step, 'code'>>('phone');
  const [checkedPhoneNumbers, setCheckedPhoneNumbers] = useState<string[]>([]);
  const { userId } = useParams();
  const { t } = useTranslation();
  const { data: profile, isFetched, isError, isLoading } = useUserProfile(userId!);
  const deletePhoneNumbersMutation = useDeletePhoneNumbers();

  const onChangeActiveMode = useCallback(() => {
    setActivateEditMode(!activateEditMode);
    if (checkedPhoneNumbers.length) {
      setCheckedPhoneNumbers([]);
    }
  }, [checkedPhoneNumbers, activateEditMode]);

  const onSwitch = (type: SwitchType | Step) => {
    setActiveSwitchType(type);
    setStep(type as Step);
  };

  const onSuccess = useCallback((phone: string) => {
    setStep('code');
    setPhoneNumber(phone);
  }, []);

  const onDeletePhoneNumbers = () => {
    if (!userId) return;

    deletePhoneNumbersMutation.mutate(
      { userId, phoneNumbers: checkedPhoneNumbers },
      {
        onSuccess: () => {
          setActivateEditMode(false);
        },
      },
    );
  };

  if (!isFetched || isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <>{t('errors.wentWrong')}</>;
  }

  return (
    <PrimaryDialog
      open={open}
      onClose={onClose}
      size="small"
    >
      <Box sx={step !== 'email' ? styles.header : styles.titleView}>
        <DialogTitle sx={step !== 'email' ? { ...styles.dialogTitle, ...styles.spacing } : styles.dialogTitle}>
          {t('dialog.titles.contacts')}
        </DialogTitle>
        {activeSwitchType !== 'email' && (
          <Button
            disabled={!profile!.additionalPhoneNumbers.length}
            sx={styles.editButton}
            variant="text"
            color="primary"
            size="small"
            onClick={onChangeActiveMode}
          >
            {t(`buttons.${activateEditMode ? 'save' : 'edit'}`)}
          </Button>
        )}
      </Box>
      <DialogContent sx={styles.container}>
        <Box px={2} py={2}>
          <UserCredentialSwitch
            onSwitch={onSwitch}
            switchType={activeSwitchType}
            disableSwitch={activateEditMode}
          />
        </Box>
        {!activateEditMode && (
          <Box py={2}>
            {step === 'phone' && (
              <PhoneNumberField
                onSuccess={onSuccess}
              />
            )}
            {step === 'code' && (
              <PhoneNumberVerificationField
                phoneNumber={phoneNumber}
                setStep={setStep}
              />
            )}
            {step === 'email' && (
              <EmailField />
            )}
          </Box>
        )}
      </DialogContent>
      {!activateEditMode && (<Divider sx={{ ...styles.divider, ...styles.dividerColor }} />)}
      <DialogContent>
        <CredentialList
          activateEditMode={activateEditMode}
          credential={activeSwitchType === 'phone' ? profile!.additionalPhoneNumbers : null}
          primaryCredential={activeSwitchType === 'phone' ? profile!.primaryPhoneNumber : profile!.email}
          onChecked={(phone: string) => {
            setCheckedPhoneNumbers((prevPhoneNumbers) => [...prevPhoneNumbers, phone]);
          }}
        />
        <DialogActions>
          {activateEditMode ? (
            <LoadingButton
              loading={deletePhoneNumbersMutation.isLoading}
              disabled={deletePhoneNumbersMutation.isLoading}
              variant="contained"
              color="error"
              onClick={onDeletePhoneNumbers}
            >
              {t('buttons.delete')}
            </LoadingButton>
          ) : (
            <Button
              variant="outlined"
              color="info"
              onClick={onClose}
            >
              {t('buttons.back')}
            </Button>
          )}
        </DialogActions>
      </DialogContent>
    </PrimaryDialog>
  );
};
