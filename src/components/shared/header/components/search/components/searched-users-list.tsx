import React from 'react';
import { cn, getAbsoluteUrl } from '@/lib/utils';
import { RoutesEnum, User } from '@/types';
import { Avatar, Link } from '@nextui-org/react';

interface Props {
  users: User[];
  onClickItem: VoidFunction;
  className?: string;
}

export const SearchedUsersList: React.FC<Props> = ({ users, onClickItem, className }) => (
  <>
    {users.map((user) => (
      <Link
        onPress={onClickItem}
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
