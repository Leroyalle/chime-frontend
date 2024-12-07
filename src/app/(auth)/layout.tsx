import { Container, Header } from '@/components/shared';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chime | Авторизация',
  description: 'Социальная сеть Chime',
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Container>
        <main className="min-h-[100vh]">{children}</main>
      </Container>
    </>
  );
}
