import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Login } from './Login';
import Footer from '../../../components/Footer';
import ForgotPassword from '../components/ForgotPassword';
import CreatePassword from '../components/CreatePassword';

export const AuthRoutes = () => (
  <>
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="create-password" element={<CreatePassword />} />
      <Route path="*" element={<Navigate to="./login" replace />} />
    </Routes>
    <Footer />
  </>
);
