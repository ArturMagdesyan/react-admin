import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GoBackButton } from '../../../components/GoBackButton';
import { PRIMARY } from '../../../common/constants/global-styles-variables.constant';
import InternalLink from '../../../components/InternalLink';
import { OrderInnerContext } from '../contexts';
import { Spinner } from '../../../components/Spinner';

const styles = {
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    textDecoration: 'none',
    color: PRIMARY,
    paddingLeft: '4px',
  },
};

const OrderInnerTopBar = () => {
  const { t } = useTranslation();
  const {
    orderDetails,
    isErrorDetails,
    isFetchedDetails,
    isLoadingDetails,
  } = useContext(OrderInnerContext);

  if (!isFetchedDetails || isLoadingDetails) {
    return <Spinner size={14} />;
  }

  return (
    <Box sx={styles.root}>
      <GoBackButton to="/orders" />
      {
        !isErrorDetails && (
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                color: (theme) => theme.colors.blackRussian,
              }}
              variant="button"
            >
              {t('orderInner.bar.orderNumber')}
              {orderDetails?.orderId}
            </Typography>
            <Typography
              sx={{
                color: (theme) => theme.colors.blackRussian,
              }}
              variant="button"
            >
              {t('orderInner.bar.customer')}
              <InternalLink
                style={styles.link}
                target="_blank"
                to={`/users/customers/${orderDetails?.phoneNumber}`}
              >
                {orderDetails?.phoneNumber}
              </InternalLink>
            </Typography>
          </Box>
        )
      }
    </Box>
  );
};

export default OrderInnerTopBar;
