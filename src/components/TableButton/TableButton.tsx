import React from 'react';
import { Theme } from '@mui/material';
import Button from '@mui/material/Button';
import { MaterialColors } from '../TableStatus';

interface Props {
  disabled?: boolean;
  isColorLight?: boolean;
  size?: 'small' | 'medium';
  background: MaterialColors;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const buttonSizes = {
  small: '24px',
  medium: '38px',
};

export const TableButton: React.FC<Props> = ({
  disabled,
  background,
  isColorLight,
  size = 'small',
  onClick,
  children,
}) => (
  <Button
    disabled={disabled}
    type="button"
    onClick={onClick}
    sx={{
      minWidth: buttonSizes[size],
      minHeight: buttonSizes[size],
      padding: 0,
      mr: (theme) => theme.spacing(0.75),
      mb: (theme) => theme.spacing(0.25),
      color: (theme: Theme) => theme.colors.white,
      bgcolor: `${background}.${isColorLight ? 'light' : 'main'}`,
      boxShadow: 2,
      transition: 'transform .4s',
      '&:hover': {
        bgcolor:
          (theme) => (isColorLight
            ? theme.palette[background].light
            : theme.palette[background].main),
        padding: 0,
      },
      '&:disabled': {
        color: (theme: Theme) => theme.colors.white,
        bgcolor: (theme: Theme) => theme.colors.linkWater,
        boxShadow: 24,
      },
    }}
  >
    {children}
  </Button>
);
