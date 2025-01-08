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
    <div className="flex flex-col min-h-screen">
      <Header />
      <Container className="flex gap-x-10 py-3 relative w-full h-full">
        <Sidebar className="flex-shrink-0 w-fit p-4 h-[calc(100vh-58px-32px)] min-w-[255px] sticky top-[73px] hidden md:block" />
        <main className="flex-1">{children}</main>
        <AdvtWrapper className="hidden flex-shrink-0 lg:block h-[calc(100vh-58px-32px)] max-w-[300px] sticky top-[73px] p-4" />
      </Container>
      {/* <footer className="mt-auto bg-gray-100 p-4 text-center">Footer</footer> */}
    </div>
  );
}
