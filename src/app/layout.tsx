import Head from 'next/head';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/shared';
const inter = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <link data-rh="true" rel="icon" href="/logo-1.png" />
      </Head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
