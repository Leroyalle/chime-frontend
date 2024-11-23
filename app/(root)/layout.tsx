import { Container, Header, Sidebar } from '@/components/shared';
import { AdvtWrapper } from '@/components/shared/advt';
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
      <Container className="flex gap-x-4 py-3 relative">
        <Sidebar />
        <main className="min-h-[100vh] flex-1">{children}</main>
        <AdvtWrapper className="hidden lg:block max-w-[300px] max-h-[650px] sticky top-[73px] p-4" />
      </Container>
    </>
  );
}
