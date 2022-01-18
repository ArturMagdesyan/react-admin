import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { Dialog } from '../../../components/Dialog';
import { useInviteUser } from '../api';
import type { DialogProps, UserInvitation } from '../types';
import UserInvitationForm from '../../settings/components/UserInvitationForm';

interface Props extends Omit<DialogProps, 'id'> {}

const UserInvitationDialogComponent = ({
  open,
  onClose,
}: Props) => {
  const { t } = useTranslation();
  const inviteUserMutation = useInviteUser();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<UserInvitation>({
    mode: 'onChange',
    reValidateMode: 'onChange',
  });

  const onSuccess = async (userInvitationDetails: UserInvitation) => {
    try {
      if (isValid) {
        await inviteUserMutation.mutateAsync(
          userInvitationDetails,
          {
            onSettled: () => {
              onClose();
            },
          },
        );
      }
    } catch (error) {
      // TODO: handle errors - PHE-523
    }
  };

  return (
    <Dialog
      open={open}
      loading={inviteUserMutation.isLoading}
      size="large"
      title={t('settings.invite')}
      buttonText={t('settings.send')}
      color="primary"
      onSuccess={handleSubmit(onSuccess)}
      onClose={onClose}
      disable={!isValid}
    >
      <UserInvitationForm register={register} errors={errors} />
    </Dialog>
  );
};

export const UserInvitationDialog = memo(UserInvitationDialogComponent);
