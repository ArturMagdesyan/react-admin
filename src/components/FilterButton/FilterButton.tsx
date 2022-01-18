import React from 'react';
import { Theme } from '@mui/material';
import Button from '@mui/material/Button';

const styles = {
  root: (
    minWidth: number,
    withShadow: boolean | undefined,
    minHeight: number,
    defaultColor: 'white' | 'solitudeSecondary',
  ) => ({
    typography: 'body2',
    minWidth: `${minWidth}px`,
    minHeight: `${minHeight}px`,
    backgroundColor: (theme: Theme) => theme.colors[defaultColor],
    boxShadow: withShadow ? 2 : 0,
    color: (theme: Theme) => theme.palette.info.main,
    '&:hover': {
      padding: (theme: Theme) => theme.spacing(0.8, 1),
      color: (theme: Theme) => theme.palette.primary.main,
      background: (theme: Theme) => theme.colors[defaultColor],
    },
    '&:disabled': {
      color: (theme: Theme) => theme.colors.echoBlue,
    },
  }),
  active: (
    isActive: boolean | undefined,
    withShadow: boolean | undefined,
  ) => (
    isActive ? {
      color: (theme: Theme) => theme.colors.white,
      background: (theme: Theme) => theme.palette.primary.main,
      boxShadow: withShadow ? 5 : 0,
      '&:hover': {
        color: (theme: Theme) => theme.colors.white,
        padding: (theme: Theme) => theme.spacing(0.8, 1),
        background: (theme: Theme) => theme.palette.primary.main,
      },
    } : {}
  ),
};

interface Props {
  title: string;
  defaultColor?: 'white' | 'solitudeSecondary';
  minWidth?: number;
  minHeight?: number;
  disabled?: boolean;
  isActive?: boolean;
  withShadow?: boolean;
  onClick: (props: any) => void;
}

export const FilterButton = ({
  title,
  disabled = false,
  isActive = false,
  withShadow = true,
  minHeight = 40,
  minWidth = 38,
  defaultColor = 'white',
  onClick,
}: Props) => (
  <Button
    sx={{
      ...styles.root(minWidth, withShadow, minHeight, defaultColor),
      ...styles.active(isActive, withShadow),
    }}
    onClick={onClick}
    disabled={disabled}
    type="button"
  >
    {title}
  </Button>
);
