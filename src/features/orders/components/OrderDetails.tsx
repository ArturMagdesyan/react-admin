import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap, Theme } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Technique } from '../../../components/Technique';
import {
  RouteIcon,
  CalendarIcon,
  LocationAIcon,
  LocationBIcon,
  PercentIcon,
  MoreIcon,
} from '../../../components/Icons';
import { OrderInnerContext } from '../contexts';
import { AssignVendorsForm } from './AssignVendorsForm';
import { NoTableContent } from '../../../components/NoTableContent';
import { Spinner } from '../../../components/Spinner';
import { distanceFromNowFormatted, fullMonthDateFormatted } from '../../../utils/dateFormat';
import { OrderDetailServices, TechnicBody } from '../enums';

interface Icons {
  [key: number]: OverridableComponent<SvgIconTypeMap>;
}

const icons: Icons = {
  0: LocationAIcon,
  1: LocationBIcon,
};

const styles = {
  root: {
    boxShadow: 1,
    height: '100%',
    borderRadius: '20px',
    backgroundColor: (theme: Theme) => theme.colors.white,
    overflow: 'auto',
  },
  mapView: {
    width: '100%',
    height: '250px',
  },
  detailsGrid: {
    padding: (theme: Theme) => theme.spacing(2.25, 1.25),
    borderBottom: `4px solid ${(theme: Theme) => theme.colors.solitudeSecondary}`,
  },
  iconItemView: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: (theme: Theme) => theme.spacing(0.5),
    '& p': {
      paddingLeft: (theme: Theme) => theme.spacing(0.8),
    },
  },
  subTitle: {
    color: (theme: Theme) => theme.colors.mischka,
    fontWeight: 500,
  },
  comment: {
    paddingTop: (theme: Theme) => theme.spacing(1),
    color: (theme: Theme) => theme.palette.info.main,
    lineHeight: 1.5,
  },
  iconView: {
    display: 'contents',
    color: (theme: Theme) => theme.colors.manatee,
  },
  techniqueType: {
    display: 'inline-block',
    padding: (theme: Theme) => theme.spacing(0.5, 1),
    bgcolor: (theme: Theme) => theme.colors.solitudeSecondary,
    mr: (theme: Theme) => theme.spacing(0.215),
    borderRadius: '10px',
    color: (theme: Theme) => theme.palette.info.main,
  },
};

const OrderDetails = () => {
  const { t } = useTranslation();
  const {
    orderDetails,
    isErrorDetails,
    isFetchedDetails,
    isLoadingDetails,
  } = useContext(OrderInnerContext);

  if (!isFetchedDetails || isLoadingDetails) {
    return <Spinner />;
  }

  if (isErrorDetails || !orderDetails) {
    return <NoTableContent />;
  }

  return (
    <Box sx={styles.root}>
      <Box style={styles.mapView}>
        Map
      </Box>
      <Grid
        container
        spacing={1}
        sx={styles.detailsGrid}
      >
        <Grid xs={6} md={1} item>
          <Technique
            techniqueName={orderDetails!.truck}
            color="info"
          />
        </Grid>
        <Grid xs={6} md={7} item>
          <Typography
            variant="h6"
            sx={{
              color: (theme) => theme.colors.blackRussian,
            }}
          >
            {t(`techniques.${orderDetails.truck}`)}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.palette.info.main,
            }}
          >
            {distanceFromNowFormatted(orderDetails.creationDate)}
          </Typography>
        </Grid>
        <Grid xs={6} md={4} item>
          <Typography
            variant="h5"
            sx={{
              color: (theme) => theme.colors.blackRussian,
            }}
          >
            {orderDetails.price}
            {' '}
            {t('units.price')}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: (theme) => theme.colors.manatee,
            }}
          >
            {t(`orderPaymentMethod.${orderDetails.paymentMethod}`)}
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <Typography
            sx={styles.techniqueType}
            variant="body2"
          >
            {t(`orderDetails.technicBody.${TechnicBody[orderDetails.body.name]}`)}
          </Typography>
          {orderDetails.options.map((service) => (
            <Typography
              sx={styles.techniqueType}
              key={service.id}
              variant="body2"
            >
              {t(`orderDetails.services.${OrderDetailServices[service.name]}`)}
            </Typography>
          ))}
        </Grid>
        <Grid xs={6} md={4} mt={1} item>
          {orderDetails.duration.address.map((addressDetails, index) => {
            const Icon = icons[index];

            return (
              <Grid
                item
                xs={12}
                sx={styles.iconItemView}
                key={index.toString()}
              >
                <Icon />
                <Typography
                  noWrap
                  variant="body2"
                  sx={{
                    color: (theme) => theme.palette.info.main,
                  }}
                >
                  {addressDetails.name}
                </Typography>
              </Grid>
            );
          })}
        </Grid>
        <Grid xs={6} md={4} item>
          <Grid xs={12} item sx={styles.iconItemView}>
            <Box sx={styles.iconView}>
              <RouteIcon />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.info.main,
              }}
            >
              {t('orderDetails.totalDistance')}
              {' '}
              {orderDetails.distance}
              {t('units.km')}
            </Typography>
          </Grid>
          <Grid xs={12} item sx={styles.iconItemView}>
            <Box sx={styles.iconView}>
              <CalendarIcon />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.info.main,
              }}
            >
              {fullMonthDateFormatted(orderDetails.creationDate)}
            </Typography>
          </Grid>
        </Grid>
        <Grid xs={6} md={4} item>
          <Grid xs={12} item sx={styles.iconItemView}>
            <Box sx={styles.iconView}>
              <PercentIcon />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.info.main,
              }}
            >
              {t('orderDetails.commission')}
              {orderDetails.fee}
              {' '}
              {t('units.price')}
            </Typography>
          </Grid>
          <Grid xs={12} item sx={styles.iconItemView}>
            <MoreIcon />
            <Typography
              variant="body2"
              sx={{
                color: (theme) => theme.palette.info.main,
              }}
            >
              {t(`orderStatus.${orderDetails.orderStatus}`)}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={styles.detailsGrid}
      >
        <Grid xs={10} item>
          <Typography variant="body2" sx={styles.subTitle}>
            {t('orderDetails.description')}
          </Typography>
          <Typography
            variant="button"
            sx={styles.comment}
          >
            {orderDetails.comment}
          </Typography>
        </Grid>
        <Grid xs={12} item>
          {/* TODO: attach photo when backend will be ready */}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        sx={styles.detailsGrid}
      >
        <Grid xs={12} item>
          <Typography
            variant="button"
            sx={{
              color: (theme) => theme.colors.mischka,
            }}
          >
            {t('orderDetails.boardLoadCapacity')}
          </Typography>
          <Typography
            variant="button"
            sx={{
              color: (theme) => theme.palette.info.main,
            }}
          >
            {orderDetails.spec.boardLoadCapacity}
            {' '}
            {t('units.tons')}
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <Typography
            variant="button"
            sx={{
              color: (theme) => theme.colors.mischka,
            }}
          >
            {t('orderDetails.boomLoadCapacity')}
          </Typography>
          <Typography
            variant="button"
            sx={{
              color: (theme) => theme.palette.info.main,
            }}
          >
            {orderDetails?.spec?.boomLoadCapacity}
            {' '}
            {t('units.tons')}
          </Typography>
        </Grid>
        <Grid xs={12} item>
          <Typography
            variant="button"
            sx={{
              color: (theme) => theme.colors.mischka,
            }}
          >
            {t('orderDetails.loadLength')}
          </Typography>
          <Typography
            variant="button"
            sx={{
              color: (theme) => theme.palette.info.main,
            }}
          >
            {orderDetails?.spec?.boardLength}
            {' '}
            {t('units.meters')}
          </Typography>
        </Grid>
      </Grid>
      <Box py={2} px={2}>
        <Typography
          variant="body2"
          sx={styles.subTitle}
        >
          {t('orderDetails.assignPerformer')}
        </Typography>
        <AssignVendorsForm />
      </Box>
    </Box>
  );
};

export default OrderDetails;
