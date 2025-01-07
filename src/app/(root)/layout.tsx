"use client"

import { Container, Header, Sidebar } from '@/components/shared';
import { AdvtWrapper } from '@/components/shared/advt';
// import type { Metadata } from 'next';
import { useState } from 'react';



// export const metadata: Metadata = {
//   title: 'Chime',
//   description: 'Социальная сеть Chime',
// };


import { Menu } from 'lucide-react';

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  }




  return (
    <div className="flex flex-col min-h-screen">
      <Header sidebarIcon={<Menu className='flex md:hidden min-w-8 min-h-8 ' onClick={() => setIsSidebarOpen((prev) => !prev)} />}/>

      <Container className="flex gap-x-10 py-3 relative w-full">
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <Sidebar handleCloseSidebar={handleCloseSidebar}
          className={`fixed top-0 left-0 z-50 flex-shrink-0 rounded-l-none flex-col w-[255px] p-4 h-full bg-white transition-transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:hidden `}
        />

        <Sidebar className="hidden md:flex flex-shrink-0 flex-col w-fit p-4 h-[calc(100vh-58px-32px)] min-w-[255px] sticky top-[73px]" />

        {/* FIXME: change height */}
        <main className={`relative flex-1 transition-all duration-300 h-[calc(100vh-58px-32px)]`}>
          {children}
        </main>

        {/* <AdvtWrapper className="hidden lg:block flex-shrink-0 h-[calc(100vh-58px-32px)] max-w-[300px] top-[73px] p-4" /> */}
      </Container>
    </div>
  );





}
