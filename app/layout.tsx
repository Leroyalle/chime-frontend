import Head from 'next/head';
import { Nunito } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/shared';
const nunito = Nunito({
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
    <html lang="en">
      <Head>
        <link data-rh="true" rel="icon" href="/logo-1.png" />
      </Head>
      <body className={nunito.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
