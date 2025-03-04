'use client';
import React, { useState } from 'react';
import { Input } from '@nextui-org/input';
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';
import { useGetMe } from '@/lib/hooks';
import { Logo } from '@/components/ui';
import { HeaderMenu, ProfileButton } from './components';

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { data: me } = useGetMe();

  if (!me) {
    return null;
  }

  return (
    <Navbar
      isBordered
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className={className}
      maxWidth="xl">
      <NavbarContent justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="lg:hidden"
        />
        <NavbarBrand className="mr-4">
          <Logo />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          placeholder="Поиск по Chime..."
          size="md"
          startContent={<SearchIcon size={18} />}
          type="search"
        />
        <ProfileButton
          userId={me.user.id}
          email={me.user.EmailUser.email}
          name={me.user.name}
          avatar={me.user.avatar}
        />
        <HeaderMenu userId={me.user.id} setIsMenuOpen={setIsMenuOpen} />
      </NavbarContent>
    </Navbar>
  );
};
