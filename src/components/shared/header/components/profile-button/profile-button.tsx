import React from 'react';
import { getAbsoluteUrl } from '@/lib/utils';
import { ProfileButtonMenu } from './profile-button-menu';
import { Dropdown, DropdownTrigger } from '@nextui-org/react';
import { Avatar } from '@/components/ui';

interface Props {
  name: string;
  avatar: string | null;
  email: string;
  userId: string;
}

export const ProfileButton: React.FC<Props> = ({ userId, name, avatar, email }) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          name={name}
          size="md"
          src={avatar ? getAbsoluteUrl(avatar) : undefined}
        />
      </DropdownTrigger>
      <ProfileButtonMenu userId={userId} email={email} />
    </Dropdown>
  );
};
