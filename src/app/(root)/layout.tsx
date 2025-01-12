import { Container, Header, ProfileCard, Sidebar } from '@/components/shared';
import { AdvtWrapper } from '@/components/shared/advt';
import { cn } from '@/lib/utils';
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
      <Container className="flex relative w-full h-full">
        <div className="flex py-4 flex-col max-w-[300px] w-full sticky top-0 h-screen border-r-1">
          <Header />
          <ProfileCard className="pb-2" />
          <div className={cn('my-2 w-full h-[1px] bg-primary-light')} />
          <Sidebar className="flex-shrink-0 flex-1 pt-2 hidden md:block rounded-none overflow-y-auto" />
        </div>
        <main className="flex-1 w-full max-w-[640px] mx-auto py-4">{children}</main>
        <AdvtWrapper className="hidden flex-shrink-0 lg:block h-screen max-w-[300px] min-w-[300px] sticky p-4 top-0 rounded-none border-l-1" />
      </Container>
      {/* <footer className="mt-auto bg-gray-100 p-4 text-center">Footer</footer> */}
    </div>
  );
}
