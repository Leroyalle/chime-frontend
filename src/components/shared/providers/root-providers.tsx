'use client';
import React, { ReactNode } from 'react';
import { SocketProvider } from './socket-provider';
import { AuthGuard } from './auth-guard';

interface Props {
  children: ReactNode;
}

export const RootProviders: React.FC<Props> = ({ children }) => {
  return (
    <AuthGuard>
      <SocketProvider>{children}</SocketProvider>
    </AuthGuard>
  );
};
