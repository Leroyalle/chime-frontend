import React from 'react';
import { cn, getAbsoluteUrl } from '@/lib/utils';
import { RoutesEnum, User } from '@/types';
import { Avatar } from '@nextui-org/react';
import Link from 'next/link';

interface Props {
  users: User[];
  onClickItem: VoidFunction;
  className?: string;
}

export const SearchedUsersList: React.FC<Props> = ({ users, onClickItem, className }) => (
  <>
    <p className="px-3 py-2 font-medium">Люди</p>
    {users.map((user) => (
      <Link
        onClick={onClickItem}
        key={user.id}
        className={cn(
          'px-3 py-4 cursor-pointer flex gap-3 items-center hover:bg-secondary text-foreground',
          className,
        )}
        href={`${RoutesEnum.USER}/${user.id}`}>
        <Avatar src={getAbsoluteUrl(user.avatar)} alt={user.name} />
        <span>{user.name}</span>
      </Link>
    ))}
  </>
);
