import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import {
  CheckboxCheckedIcon,
  CheckboxIcon,
} from '../../../../components/Icons';

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  box: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dividerColor: {
    borderColor: '#EEF0F6',
  },
  fullWidth: {
    width: '100%',
  },
};

interface Props {
  phoneNumber: string | null;
  activateEditMode: boolean;
  onChecked: (phoneNumber: string) => void;
}

export const SinglePhoneNumber = ({
  phoneNumber,
  activateEditMode,
  onChecked,
}: Props) => (
  <Box sx={styles.wrapper}>
    {activateEditMode && (
      <Checkbox
        icon={<CheckboxIcon />}
        checkedIcon={<CheckboxCheckedIcon />}
        onChange={(e, checked) => {
          if (checked && phoneNumber) {
            onChecked(phoneNumber);
          }
        }}
      />
    )}
    <Box sx={styles.fullWidth}>
      <Box sx={styles.box} my={2}>
        <Typography>{phoneNumber}</Typography>
      </Box>
      <Divider sx={styles.dividerColor} />
    </Box>
  </Box>
);
