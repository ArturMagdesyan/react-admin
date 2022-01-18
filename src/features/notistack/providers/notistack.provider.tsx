import React from 'react';
import { SnackbarProvider as NotistackProvider } from 'notistack';
import { SnackbarUtilsConfigurator } from '../utils';

const SnackbarProvider: React.FC = ({ children }) => (
  <NotistackProvider
    maxSnack={2}
    anchorOrigin={{
      horizontal: 'center',
      vertical: 'bottom',
    }}
  >
    <SnackbarUtilsConfigurator />
    {children}
  </NotistackProvider>
);

export default SnackbarProvider;
