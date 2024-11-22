import { Container, Header, Sidebar } from '@/components/shared';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chime',
  description: 'Социальная сеть Chime',
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Container className="flex gap-x-8 py-3">
        <Sidebar />
        {children}
      </Container>
    </>
  );
}
