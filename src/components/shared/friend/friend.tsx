import React from 'react';
import { cn } from '@/lib/utils';
import { Link, User } from '@nextui-org/react';
import { FriendActions } from './friend-actions';
import { RoutesEnum } from '../../../../@types';

interface Props {
  friendId: string;
  name: string;
  alias: string;
  avatarUrl: string;
  className?: string;
}

export const Friend: React.FC<Props> = ({ friendId, name, alias, avatarUrl, className }) => {
  return (
    <div className={cn('flex justify-between items-center', className)}>
      <User
        name={name}
        description={
          <Link href={`${RoutesEnum.USER}/${friendId}`} size="sm">
            @{alias}
          </Link>
        }
        avatarProps={{
          src: avatarUrl,
        }}
      />
      <FriendActions />
    </div>
  );
};
