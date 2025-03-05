import React, { useState } from 'react';
import { LoginForm } from '../../forms';
import { RegisterActions } from './register-actions';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

export const AuthTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('login');

  return (
    <Tabs defaultValue={activeTab} className="max-w-[400px]">
      <TabsList className="flex">
        <TabsTrigger className="w-full" value="login">
          Вход
        </TabsTrigger>
        <TabsTrigger className="w-full" value="register">
          Регистрация
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register">
        <RegisterActions onChangeTab={() => setActiveTab('login')} />
      </TabsContent>
    </Tabs>
  );
};
