'use client';
import { store } from '@/store/store';
import { NextUIProvider } from '@nextui-org/react';
// import { ThemeProvider as NextThemesProvider } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';
import React from 'react';
import { Provider } from 'react-redux';

interface Props {
  children: React.ReactNode;
}

export const Providers: React.FC<Props> = ({ children }) => {
  return (
    <>
      <NextUIProvider>
        {/* <NextThemesProvider attribute="class" defaultTheme="light"> */}
        <Provider store={store}>{children}</Provider>
        {/* </NextThemesProvider> */}
      </NextUIProvider>
      <NextTopLoader />
    </>
  );
};
