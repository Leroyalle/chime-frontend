'use client';
import { NextUIProvider } from '@nextui-org/react';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { SocketProvider } from './socket-provider';
import { AuthGuard } from './auth-guard';

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();

  return (
    <>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          <AuthGuard>
            <SocketProvider>{children}</SocketProvider>
          </AuthGuard>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NextUIProvider>
      <NextTopLoader />
      <ToastContainer />
    </>
  );
};
