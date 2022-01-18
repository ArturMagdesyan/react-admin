import React, { memo, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { PhoneField } from './PhoneField';
import { useAssignVendors } from '../api';
import type { AssignVendorError } from '../types';

interface ExternalVendorsNumbers {
  phones: string[];
}

const styles = {
  root: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '16px 20px',
    width: '100%',
    margin: '12px 0',
  },
  sendButtonWrap: {
    width: '225px',
    flex: '1 1 auto',
    alignSelf: 'center',
  },
};

const PHONE_NUMBER_CONTROL = {
  pattern: /^[\d]+$/,
  minLength: 9,
  maxLength: 11,
};

const AssignVendorsFormComponent = () => {
  const [disabled, setDisabled] = useState(true);
  const [vendorErrors, setVendorErrors] = useState<AssignVendorError[]>([]);
  const { t } = useTranslation();
  const { orderId } = useParams();
  const assignVendorsMutation = useAssignVendors();
  const {
    register,
    control,
    trigger,
    handleSubmit,
    formState: { errors },
    reset,
    resetField,
    watch,
  } = useForm<ExternalVendorsNumbers>(
    {
      defaultValues: {
        phones: ['', '', '', '', ''],
      },
    },
  );
  const { fields } = useFieldArray({
    name: 'phones',
    control,
  } as {
    name: string,
    control: any
  });
  const watchAllFields = watch();

  useEffect(() => {
    const phoneNumbers = watchAllFields.phones.find((phone) => phone.length);

    if (phoneNumbers) {
      setDisabled(false);
      return;
    }
    if (!disabled) {
      setDisabled(true);
    }
  }, [watchAllFields, disabled]);

  const assignVendors = async (phones: string[]) => {
    const response = await assignVendorsMutation.mutateAsync({
      orderId: Number(orderId),
      phones,
    });

    if (!response) {
      reset();
    }
    setVendorErrors(response);
  };

  const onSubmit = (phonesValues: ExternalVendorsNumbers) => {
    trigger('phones').then((isValid) => {
      if (isValid && orderId) {
        assignVendors(phonesValues.phones);
      }
    });
  };

  const singleVendorError = useMemo(() => (index: number) => {
    const vendorError = vendorErrors.find(
      ({ phoneNumber }) => phoneNumber === `+7${watchAllFields.phones[index]}`,
    );

    return vendorError ? vendorError.reason : '';
  }, [vendorErrors, watchAllFields.phones]);

  return (
    <Box
      flexWrap="wrap"
      sx={styles.root}
    >
      {fields.map((_, index) => (
        <PhoneField
          key={index.toString()}
          label={`${t('orderDetails.phoneNumber')} ${index + 1}`}
          refs={register(`phones.${index}`, PHONE_NUMBER_CONTROL)}
          errorType={
            (errors && errors.phones && errors.phones[index]?.type)
            || singleVendorError(index)
          }
          resetField={() => resetField(`phones.${index}`)}
        />
      ))}
      <Box
        sx={styles.sendButtonWrap}
      >
        <LoadingButton
          disabled={disabled}
          loading={assignVendorsMutation.isLoading}
          variant="contained"
          color="success"
          onClick={handleSubmit(onSubmit)}
        >
          {t('orderDetails.send')}
        </LoadingButton>
      </Box>
    </Box>
  );
};

export const AssignVendorsForm = memo(AssignVendorsFormComponent);
