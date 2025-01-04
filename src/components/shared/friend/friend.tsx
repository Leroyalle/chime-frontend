import React from 'react';
import { cn } from '@/lib/utils';
import { User } from '@nextui-org/react';
import { FriendActions } from './friend-actions';
import { RoutesEnum } from '../../../../@types';
import Link from 'next/link';

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
        name={<Link href={`${RoutesEnum.USER}/${friendId}`}>{name}</Link>}
        description={
          <Link href={`${RoutesEnum.USER}/${friendId}`} className="text-blue-500">
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
