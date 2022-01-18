import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

export const GoBackButton = ({ to }: { to: string }) => {
  const navigate = useNavigate();

  return (
    <Button
      sx={{
        minWidth: '24px',
        padding: (theme) => theme.spacing(0, 0.5),
        '&:hover': {
          padding: (theme) => theme.spacing(0, 0.5),
        },
      }}
      onClick={() => navigate(to)}
    >
      <ChevronLeftIcon color="info" />
    </Button>
  );
};
