'use client';
import React from 'react';
import { Input } from '@nextui-org/input';
import { Navbar, NavbarBrand, NavbarContent } from '@nextui-org/react';
import { Search } from 'lucide-react';
import { ProfileButton } from './profile-button';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <Navbar isBordered maxWidth="xl" className="bg-light-green">
      <NavbarBrand className="grow-0 mr-20">
        <Link href="/" className="font-black text-2xl uppercase">
          Chime
        </Link>
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
