'use client';
import { NextUIProvider } from '@nextui-org/react';
import NextTopLoader from 'nextjs-toploader';
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ThemeProvider } from './theme-provider';
import { Toaster } from '../../ui';

interface Props {
  children: ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
      <NextUIProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </NextUIProvider>
      <NextTopLoader color="#f97316" />
      <Toaster position="bottom-left" expand={true} />
    </ThemeProvider>
  );
};
