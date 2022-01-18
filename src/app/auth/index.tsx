import React from 'react';
import Box from '@mui/material/Box';
import { initReactQueryAuth } from 'react-query-auth';
import type { AuthUser, UserResponse } from '../../features/auth/types';
import { getUser } from '../../features/auth/api/getUser';
import { LoginCredentialsDTO, loginWithEmailAndPassword } from '../../features/auth/api/login';
import storage from '../../utils/storage';
import { Spinner } from '../../components/Spinner';

async function loadUser() {
  try {
    return await getUser();
  } catch (e) {
    return null;
  }
}

async function handleUserResponse(data: UserResponse) {
  const { access_token: jwt } = data;
  storage.setToken(jwt);

  return loadUser();
}

async function loginFn(data: LoginCredentialsDTO) {
  const response = await loginWithEmailAndPassword(data);
  return handleUserResponse(response);
}
//
// async function registerFn(data: RegisterCredentialsDTO) {
//   const response = await registerWithEmailAndPassword(data);
//   const user = await handleUserResponse(response);
//   return user;
// }

async function logoutFn() {
  storage.clearToken();
  window.location.assign(window.location.origin as unknown as string);
}

const authConfig = {
  loadUser,
  loginFn,
  registerFn: () => Promise.resolve(null),
  logoutFn,
  LoaderComponent() {
    return (
      <Box sx={{ height: '100vh' }}>
        <Spinner logo />
      </Box>
    );
  },
};

// eslint-disable-next-line max-len
export const { AuthProvider, useAuth } = initReactQueryAuth<AuthUser | null, unknown, LoginCredentialsDTO, any>(authConfig);
