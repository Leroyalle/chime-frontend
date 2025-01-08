import React from 'react';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  DarkLightBlock,
  SheetClose,
} from '../../ui';
import { Sidebar } from './sidebar';
import { Menu, X } from 'lucide-react';

export const SidebarDrawer: React.FC = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent className="p-0 m-0 md:hidden">
        <DarkLightBlock className="h-full p-2">
          <SheetHeader>
            <SheetTitle className="sr-only">Are you absolutely sure?</SheetTitle>
            <SheetDescription className="sr-only">
              This action cannot be undone. This will permanently delete your account and remove
              your data from our servers.
            </SheetDescription>
            <SheetClose className="ml-auto">
              <X />
            </SheetClose>
          </SheetHeader>
          <Sidebar />
        </DarkLightBlock>
      </SheetContent>
    </Sheet>
  );
};
