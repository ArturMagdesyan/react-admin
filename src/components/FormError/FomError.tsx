import React from 'react';
import Typography from '@mui/material/Typography';

interface Props {
  message: string;
}

const FormError = ({ message }: Props) => (
  <Typography
    variant="caption"
    sx={{
      color: (theme) => theme.palette.error.main,
    }}
  >
    {message}
  </Typography>
);

export default FormError;
