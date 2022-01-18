import React from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { UserCompanyType } from '../../features/users/enums';
import { BucketStatus } from '../../features/orders/enums';
import { TransactionStatus } from '../../features/transactions/enums';
import { AlarmStatus } from '../../features/alarms/enums';
import { UserStatus } from '../../features/settings/enums';
import { OrderStatus } from '../../common/enums';

export type MaterialColors =
  | 'secondary'
  | 'info'
  | 'warning'
  | 'primary'
  | 'error'
  | 'success';

type StatusKey =
  | OrderStatus
  | UserCompanyType
  | BucketStatus
  | TransactionStatus
  | AlarmStatus
  | UserStatus;

type TranslationKey =
  | 'orderStatus'
  | 'userCompanyType'
  | 'bucketListStatus'
  | 'transactions.status'
  | 'alarms.statuses'
  | 'settings.userStatuses';

const getBackgroundColor = (statusKey: StatusKey): MaterialColors => {
  let color: MaterialColors = 'info';
  switch (statusKey) {
    case OrderStatus.SENT_TO_MANAGER:
      color = 'warning';
      break;
    case UserCompanyType.INDIVIDUAL:
      color = 'primary';
      break;
    case OrderStatus.IN_PROGRESS:
      color = 'primary';
      break;
    case OrderStatus.CANCELED:
      color = 'error';
      break;
    case UserCompanyType.OOO:
      color = 'success';
      break;
    case OrderStatus.FINISHED:
      color = 'success';
      break;
    case UserCompanyType.IP:
      color = 'secondary';
      break;
    case OrderStatus.ISSUED:
      color = 'secondary';
      break;
    case BucketStatus.ACCEPTED: {
      color = 'primary';
      break;
    }
    case BucketStatus.FINISHED: {
      color = 'success';
      break;
    }
    case BucketStatus.DECLINED: {
      color = 'warning';
      break;
    }
    case BucketStatus.READ: {
      color = 'secondary';
      break;
    }
    case BucketStatus.REJECTED: {
      color = 'error';
      break;
    }
    case TransactionStatus.APPROVED: {
      color = 'primary';
      break;
    }
    case TransactionStatus.PENDING: {
      color = 'warning';
      break;
    }
    case AlarmStatus.VENDOR_CONFIRMED: {
      color = 'primary';
      break;
    }
    case AlarmStatus.NOT_CONFIRMED: {
      color = 'warning';
      break;
    }
    case UserStatus.LOCKED: {
      color = 'error';
      break;
    }
    case UserStatus.NOT_VERIFIED: {
      color = 'warning';
      break;
    }
    case UserStatus.UNLOCKED: {
      color = 'success';
      break;
    }
    default:
      break;
  }

  return color;
};

interface Props {
  statusKey: StatusKey;
  translationKey: TranslationKey;
}

export const TableStatus = ({
  statusKey,
  translationKey,
}:Props) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '84px',
        height: '24px',
        borderRadius: '8px',
        padding: '4px',
        background: (theme) => theme.palette[getBackgroundColor(statusKey)].main,
      }}
    >
      <Typography
        variant="caption"
        color="#FFFFFF"
        noWrap
      >
        {t(`${translationKey}.${statusKey}`)}
      </Typography>
    </Box>
  );
};
