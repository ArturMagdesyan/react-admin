import React, { ChangeEvent, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';
import { Theme } from '@mui/material';
import TextField from '@mui/material/TextField';

const regExp = {
  number: /^[\d]+$/,
  negativeNumber: /^[\d-]+$/,
  phone: /^[\d+]+$/,
  text: /.*/,
};

const styles = {
  height: '60px',
  '& .MuiInputLabel-root': {
    height: '18px',
    textAlign: 'left',
    font: 'normal normal normal 13px/13px Roboto',
    letterSpacing: 0,
    color: (theme: Theme) => theme.colors.manatee,
    top: (theme: Theme) => theme.spacing(0.75),
  },
  '& .MuiInput-root:after': {
    borderBottom: '1px solid rgba(41, 170, 255, 1)',
  },
  '&:hover': {
    '& .MuiInput-root:hover:not(.Mui-disabled):before': {
      borderBottom: '1px solid rgba(41, 170, 255, 1)',
    },
  },
};

type InputType =
  | 'text'
  | 'phone'
  | 'number'
  | 'negativeNumber';

interface Props {
  type: InputType;
  defaultValue?: number | string;
  placeholder?: string;
  label: string;
  focused?: boolean;
  includeNegativeNumbers?: boolean
  onChange: (value: string) => void;
}

export const TableInputField = ({
  type,
  label,
  onChange,
  defaultValue,
  ...props
}: Props) => {
  const [value, setValue] = useState(defaultValue!);

  const debounced = useDebouncedCallback((newValue) => {
    onChange(newValue);
  }, 400);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;

    if (
      targetValue === ''
      || !!targetValue.match(regExp[type])
    ) {
      setValue(targetValue.trim());
      let currentValue = targetValue.trim();
      if (type === 'phone') {
        currentValue = targetValue.replace('+', '');
      }
      debounced(currentValue);
    }
  };

  return (
    <TextField
      sx={styles}
      label={label}
      variant="standard"
      value={value}
      size="small"
      onChange={handleChange}
      {...props}
    />
  );
};

TableInputField.defaultProps = {
  placeholder: '',
  focused: false,
  defaultValue: '',
};
