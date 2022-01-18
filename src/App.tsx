import React, { Suspense } from 'react';
import { CssBaseline } from '@mui/material';
import Box from '@mui/material/Box';
import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';
import { SnackbarProvider } from './features/notistack';
import queryClient from './app/react-query';
import { AuthProvider } from './app/auth';
import { AppRoutes } from './routes';
import defaultTheme from './app/material-ui';
import { Spinner } from './components/Spinner';

const App = () => (
  <SnackbarProvider>
    <Suspense
      fallback={(
        <Box sx={{ height: '100vh' }}>
          <Spinner logo />
        </Box>
      )}
    >
      <QueryClientProvider client={queryClient}>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <AuthProvider>
              <Router>
                <AppRoutes />
              </Router>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen />
          </ThemeProvider>
        </StyledEngineProvider>
      </QueryClientProvider>
    </Suspense>
  </SnackbarProvider>
);

export default App;
