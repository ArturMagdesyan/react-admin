import React from 'react';
import MuiDialog from '@mui/material/Dialog';

interface Props {
  hasMinHeight?: boolean;
  size?: 'small' | 'medium' | 'large';
  open: boolean;
  onClose: () => void;
}

const dialogSizes = {
  small: 'auto',
  medium: '410px',
  large: '600px',
};

export const PrimaryDialog: React.FC<Props> = ({
  hasMinHeight = false,
  size = 'small',
  open,
  onClose,
  children,
}) => (
  <MuiDialog
    open={open}
    onClose={onClose}
    sx={{
      '& .MuiPaper-root': {
        borderRadius: '40px',
        width: hasMinHeight ? '410px' : 'auto',
        height: dialogSizes[size],
        textAlign: 'center',
        padding: '20px 0',
        overflowY: 'visible',
        zIndex: 1,
        '& .MuiDialogActions-root': {
          flexDirection: 'column',
          '& > :not(:first-of-type)': {
            marginLeft: 0,
          },
        },
      },
    }}
  >
    {children}
  </MuiDialog>
);
