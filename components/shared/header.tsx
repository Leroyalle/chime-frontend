import React from 'react';
import { Input } from '@nextui-org/input';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { ProfileButton } from './profile-button';

export const Header: React.FC = () => {
  return (
    <Navbar isBordered maxWidth="xl" className="bg-yellow-300">
      <NavbarBrand className="grow-0 mr-20">
        <p className="font-black text-2xl uppercase">Chime</p>
      </NavbarBrand>
      <Input
        startContent={<Search size={20} />}
        placeholder="Поиск..."
        isClearable
        className="max-w-64"
      />
      <NavbarContent justify="end">
        <ProfileButton />
      </NavbarContent>
    </Navbar>
  );
};
