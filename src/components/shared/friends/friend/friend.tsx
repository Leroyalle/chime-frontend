import React from 'react';
import { cn } from '@/lib/utils';
import { Link, User } from '@nextui-org/react';
import { FriendActions } from './friend-actions';

interface Props {
  className?: string;
}

export const Friend: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex justify-between items-center', className)}>
      <User
        name="Данила Курлов"
        description={
          <Link href="/user/1" size="sm">
            @sharkove
          </Link>
        }
        avatarProps={{
          src: 'https://avatars.githubusercontent.com/u/30373425?v=4',
        }}
      />
      <FriendActions />
    </div>
  );
};
