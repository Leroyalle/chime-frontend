import {
  Container,
  ProfileCard,
  Sidebar,
  AsideChatsWrapper,
  RootProviders,
  Header,
} from '@/components/shared';
import { Line } from '@/components/ui';
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
    <RootProviders>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Container className="flex relative w-full gap-x-3">
          <div className="hidden lg:flex py-4 h-[calc(100vh-70px)] flex-col max-w-[300px] w-full sticky top-[70px] border-r-1">
            <ProfileCard className="pb-2" />
            <Line />
            <Sidebar className="flex-shrink-0 flex-1 pt-2 hidden md:block overflow-y-auto" />
          </div>
          <main className="flex-1 w-full h-full max-w-[640px] mx-auto py-4">{children}</main>
          <AsideChatsWrapper className="hidden flex-shrink-0 lg:block max-w-[300px] min-w-[300px] sticky top-[70px] rounded-none border-l-1 h-[calc(100vh-70px)]" />
        </Container>
      </div>
    </RootProviders>
  );
}
