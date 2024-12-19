import { Container } from '@/components/shared';
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
      <Container>
        <main>{children}</main>
      </Container>
    </>
  );
}
