'use client';
import { NextUIProvider } from '@nextui-org/react';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </NextUIProvider>
      <NextTopLoader />
    </>
  );
};
