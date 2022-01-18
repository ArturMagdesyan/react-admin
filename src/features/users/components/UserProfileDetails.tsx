import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Theme } from '@mui/material';
import { useUserProfile } from '../api';
import { GoBackButton } from '../../../components/GoBackButton';
import { TableButton } from '../../../components/TableButton';
import { UnlockIcon, LockIcon, EditIcon } from '../../../components/Icons';
import {
  LockDialog,
  UnlockDialog,
  AddUserCredentialsDialog,
} from '../../dialogs/components';
import { useDialog } from '../../../hooks';
import { NoTableContent } from '../../../components/NoTableContent';
import { UserProfileEditDialog } from '../../dialogs/components/UserProfileEditDialog';
import type { UserManageType } from '../../dialogs/types';
import { UserType } from '../enums';
import { Spinner } from '../../../components/Spinner';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  tabView: {
    display: 'flex',
    alignItems: 'center',
    borderRight: `1px solid ${(theme: Theme) => theme.colors.solitude}`,
  },
  contentView: {
    m: (theme: Theme) => theme.spacing(
      0,
      2,
    ),
  },
  iconView: {
    pt: (theme: Theme) => theme.spacing(1),
    mr: (theme: Theme) => theme.spacing(1),
    color: (theme: Theme) => theme.colors.linkWater,
  },
  icon: {
    cursor: 'pointer',
  },
  subTitle: {
    color: (theme: Theme) => theme.colors.mischka,
    fontWeight: 400,
  },
  fontWeightMedium: {
    fontWeight: 500,
  },
};

export const UserProfileDetails = () => {
  const [specialUserValue, setSpecialUserValue] = useState<number | null>(null);
  const [discountActionType, setDiscountActionType] = useState<UserManageType | null>(null);
  const unlockDialog = useDialog();
  const lockDialog = useDialog();
  const balanceDialog = useDialog();
  const discountDialog = useDialog();
  const addUserCredentialsDialog = useDialog();
  const { t } = useTranslation();
  const { userId } = useParams();
  const {
    data: userProfileData,
    isLoading,
    isFetched,
    isError,
  } = useUserProfile(userId!);

  if (isLoading || !isFetched) {
    return <Spinner size={14} />;
  }

  if (isError) {
    return <NoTableContent />;
  }

  return (
    <Box sx={styles.root}>
      <GoBackButton to="/users" />
      <Box sx={styles.tabView}>
        <Box sx={styles.contentView}>
          <Typography variant="button" component="p">
            {userProfileData?.primaryPhoneNumber}
          </Typography>
          <Typography variant="button" component="p">
            {userProfileData?.email}
          </Typography>
        </Box>
        <Box sx={styles.iconView}>
          <EditIcon
            sx={styles.icon}
            onClick={() => {
              addUserCredentialsDialog.onTrigger();
            }}
          />
        </Box>
      </Box>
      <Box sx={styles.tabView}>
        <Box sx={styles.contentView}>
          <Typography sx={styles.subTitle} variant="caption">
            {t('userProfile.balance')}
          </Typography>
          <Typography
            variant="body1"
            sx={styles.fontWeightMedium}
          >
            {userProfileData?.balance}
          </Typography>
        </Box>
        <Box
          sx={styles.iconView}
          onClick={() => {
            balanceDialog.onTrigger();
          }}
        >
          <EditIcon sx={styles.icon} />
        </Box>
      </Box>
      {(userProfileData?.userType === UserType.VENDOR
        || userProfileData?.userType === UserType.VENDOR_CUSTOMER) && (
        <>
          <Box sx={styles.tabView}>
            <Box sx={styles.contentView}>
              <Typography sx={styles.subTitle} variant="caption">
                {t('userProfile.vendorDiscount')}
              </Typography>
              <Typography
                variant="body1"
                sx={styles.fontWeightMedium}
              >
                {userProfileData?.vendorDiscount}
              </Typography>
            </Box>
            <Box sx={styles.iconView}>
              <EditIcon
                sx={styles.icon}
                onClick={() => {
                  setDiscountActionType('vendorDiscount');
                  setSpecialUserValue(userProfileData?.vendorDiscount);
                  discountDialog.onTrigger();
                }}
              />
            </Box>
          </Box>
          <Box sx={styles.tabView}>
            <Box sx={styles.contentView}>
              <Typography sx={styles.subTitle} variant="caption">
                {t('userProfile.vendorRating')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body1"
                  sx={styles.fontWeightMedium}
                >
                  4.2
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
      {(userProfileData?.userType === UserType.CUSTOMER
        || userProfileData?.userType === UserType.VENDOR_CUSTOMER) && (
        <>
          <Box sx={styles.tabView}>
            <Box sx={styles.contentView}>
              <Typography sx={styles.subTitle} variant="caption">
                {t('userProfile.customerDiscount')}
              </Typography>
              <Typography
                variant="body1"
                sx={styles.fontWeightMedium}
              >
                {userProfileData?.customerDiscount}
              </Typography>
            </Box>
            <Box sx={styles.iconView}>
              <EditIcon
                sx={styles.icon}
                onClick={() => {
                  setDiscountActionType('customerDiscount');
                  setSpecialUserValue(userProfileData?.customerDiscount);
                  discountDialog.onTrigger();
                }}
              />
            </Box>
          </Box>
          <Box
            sx={{
              ...styles.tabView,
              borderRight: 0,
            }}
          >
            <Box sx={styles.contentView}>
              <Typography sx={styles.subTitle} variant="caption">
                {t('userProfile.customerRating')}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography
                  variant="body1"
                  sx={styles.fontWeightMedium}
                >
                  4.2
                </Typography>
              </Box>
            </Box>
          </Box>
        </>
      )}
      <Box ml={2}>
        {
          userProfileData?.locked ? (
            <TableButton
              background="info"
              onClick={() => {
                unlockDialog.onTrigger();
              }}
            >
              <UnlockIcon />
            </TableButton>
          ) : (
            <TableButton
              background="success"
              onClick={() => {
                lockDialog.onTrigger();
              }}
            >
              <LockIcon />
            </TableButton>
          )
        }
      </Box>
      <LockDialog
        id={userId!}
        open={lockDialog.open}
        onClose={lockDialog.onClose}
      />
      <UnlockDialog
        id={userId!}
        open={unlockDialog.open}
        onClose={unlockDialog.onClose}
      />
      <UserProfileEditDialog
        username={userId!}
        type="balance"
        initialValue={userProfileData?.balance}
        open={balanceDialog.open}
        onClose={balanceDialog.onClose}
        title={t('dialog.titles.editBalance')}
        label={t('table.headers.sum')}
      />
      <UserProfileEditDialog
        username={userId!}
        type={discountActionType!}
        initialValue={specialUserValue!}
        open={discountDialog.open}
        onClose={discountDialog.onClose}
        title={t('dialog.titles.discountProvision')}
        label={t('table.headers.quantity')}
      />
      <AddUserCredentialsDialog
        open={addUserCredentialsDialog.open}
        onClose={addUserCredentialsDialog.onClose}
      />
    </Box>
  );
};
