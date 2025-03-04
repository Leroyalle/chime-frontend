import React from 'react';
import { NavbarMenu, NavbarMenuItem } from '@nextui-org/react';
import { navMenuItems } from '@/constants';
import Link from 'next/link';

interface Props {
  userId: string;
  setIsMenuOpen: (value: boolean) => void;
  className?: string;
}

export const HeaderMenu: React.FC<Props> = ({ userId, setIsMenuOpen, className }) => {
  return (
    <NavbarMenu className={className}>
      {navMenuItems.map((item, i) => (
        <NavbarMenuItem key={`${item}-${i}`}>
          <Link
            onClick={() => setIsMenuOpen(false)}
            className="w-full"
            href={item.appendUserId ? `${item.href}/${userId}` : item.href}>
            {item.title}
          </Link>
        </NavbarMenuItem>
      ))}
    </NavbarMenu>
  );
};
