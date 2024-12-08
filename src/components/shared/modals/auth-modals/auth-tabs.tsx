import React, { useState } from 'react';
import { Tab, Tabs } from '@nextui-org/react';
import { LoginForm, RegisterForm } from '../../forms';

export const AuthTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('login');

  return (
    <Tabs
      aria-label="Auth variants"
      variant={'solid'}
      color="primary"
      fullWidth
      selectedKey={activeTab}
      onSelectionChange={(key) => setActiveTab(key as string)}>
      <Tab key="login" title="Вход">
        <LoginForm />
      </Tab>
      <Tab key="register" title="Регистрация">
        <RegisterForm onChangeTab={() => setActiveTab('login')} />
      </Tab>
    </Tabs>
  );
};
