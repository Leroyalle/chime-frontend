import React from 'react';
import { DropdownItem, DropdownMenu } from '@nextui-org/react';
import { RoutesEnum } from '@/types';
import Link from 'next/link';
import { LogoutButton } from '@/components/shared';

interface Props {
  userId: string;
  email: string;
  className?: string;
}

export const ProfileButtonMenu: React.FC<Props> = ({ userId, email, className }) => {
  return (
    <DropdownMenu aria-label="Profile Actions" variant="flat" className={className}>
      <DropdownItem
        key="profile"
        href={`${RoutesEnum.USER}/${userId}`}
        as={Link}
        className="h-14 gap-2">
        <p className="font-semibold">Аккаунт</p>
        <p className="font-semibold">{email}</p>
      </DropdownItem>
      <DropdownItem key="settings" as={Link} href={RoutesEnum.SETTINGS}>
        Настройки
      </DropdownItem>
      <DropdownItem key="logout" color="danger" as={LogoutButton} href={RoutesEnum.AUTH}>
        Выйти
      </DropdownItem>
    </DropdownMenu>
  );
};
