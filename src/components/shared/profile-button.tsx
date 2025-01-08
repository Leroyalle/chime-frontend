'use client';
import React from 'react';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react';
import { CircleHelp, LogOut, Palette, Settings, User } from 'lucide-react';
import { Avatar } from '../ui';
import { RoutesEnum, TokensEnum } from '../../../@types';
import { useGetMe } from '@/lib/hooks';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
export const ProfileButton: React.FC = () => {
  const router = useRouter();
  const { data } = useGetMe();

  const handleLogout = () => {
    Cookies.remove(TokensEnum.JWT);
    router.push('/auth');
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          size="md"
          as="button"
          className="transition-transform"
          src={'https://avatars.githubusercontent.com/u/158848927?v=4'}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem textValue="Профиль" key="profile" startContent={<User size={20} />}>
          <Link className="w-full h-full block" href={`${RoutesEnum.USER}/${data?.user.id}`}>
            Профиль
          </Link>
        </DropdownItem>
        <DropdownItem textValue="Настройки" key="settings" startContent={<Settings size={20} />}>
          <Link className="w-full h-full block" href={RoutesEnum.SETTINGS}>
            Настройки
          </Link>
        </DropdownItem>
        <DropdownItem textValue="Тема" key="theme" startContent={<Palette size={20} />}>
          <Link className="w-full h-full block" href={RoutesEnum.THEME}>
            Тема
          </Link>
        </DropdownItem>
        <DropdownItem textValue="Помощь" key="help" startContent={<CircleHelp size={20} />}>
          <Link className="w-full h-full block" href={RoutesEnum.HELP}>
            Помощь
          </Link>
        </DropdownItem>
        <DropdownItem
          textValue="Выход"
          key="logout"
          color="danger"
          className="text-danger"
          startContent={<LogOut size={20} />}
          onPress={handleLogout}>
          Выйти
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
