import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type {
  SvgIconTypeMap,
  Theme,
} from '@mui/material';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import LoadingButton from '@mui/lab/LoadingButton';
import type { MaterialColors } from '../TableStatus';
import { PrimaryDialog } from './PrimaryDialog';

interface Props {
  open: boolean;
  isLight?: boolean;
  hasMinHeight?: boolean;
  disable?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large';
  title: string;
  buttonText: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
  color: MaterialColors;
  onClose: () => void;
  onSuccess: () => void;
}

const styles = {
  iconView: (color: MaterialColors, isLight: boolean) => ({
    width: '50px',
    height: '50px',
    top: (theme: Theme) => theme.spacing(-3.125),
    left: 'calc(50% - 25px)',
    display: 'flex',
    color: (theme: Theme) => theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    background: (theme: Theme) => (theme.palette[color][isLight ? 'light' : 'main']),
  }),
  successButton: (color: MaterialColors, isLight: boolean) => ({
    marginBottom: (theme: Theme) => theme.spacing(1.5),
    background: (theme: Theme) => (theme.palette[color][isLight ? 'light' : 'main']),
    '&:hover': {
      background: (theme: Theme) => (theme.palette[color][isLight ? 'light' : 'main']),
    },
  }),
};

export const Dialog: React.FC<Props> = ({
  open,
  disable = false,
  hasMinHeight = false,
  isLight = false,
  loading = false,
  size = 'small',
  title,
  buttonText,
  color,
  icon,
  onClose,
  onSuccess,
  children,
}) => {
  const { t } = useTranslation();
  const Icon = useMemo(() => icon, [icon]);

  return (
    <PrimaryDialog
      hasMinHeight={hasMinHeight}
      open={open}
      size={size}
      onClose={onClose}
    >
      {
        !!Icon && (
          <Box
            sx={styles.iconView(color, isLight)}
            position="absolute"
          >
            <Icon />
          </Box>
        )
      }
      <DialogTitle id="alert-dialog-title">
        {title}
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        <LoadingButton
          disabled={disable || loading}
          loading={loading}
          sx={styles.successButton(color, isLight)}
          variant="contained"
          color={color}
          onClick={onSuccess}
        >
          {loading ? 'loading' : buttonText}
        </LoadingButton>
        <Button
          variant="outlined"
          color="info"
          onClick={onClose}
        >
          {t('buttons.back')}
        </Button>
      </DialogActions>
    </PrimaryDialog>
  );
};
