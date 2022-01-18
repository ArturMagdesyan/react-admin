import React from 'react';
import { useTranslation } from 'react-i18next';
import { Layout } from '../components/Layout';
import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const { t } = useTranslation();

  return (
    <Layout
      title={t('loginPage.title')}
      description={t('loginPage.description')}
    >
      <LoginForm />
    </Layout>
  );
};
