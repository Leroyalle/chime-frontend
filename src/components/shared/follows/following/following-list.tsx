import React from 'react';
import { cn } from '@/lib/utils';
import { Follows } from '@/types';
import { Friend } from '../../friend';
import { DarkLightBlock } from '../../../ui';

interface Props {
  items: Omit<Follows, 'follower'>[];
  className?: string;
}

export const FollowingList: React.FC<Props> = ({ items, className }) => {
  return (
    <ul className={cn('flex flex-col gap-y-5', className)}>
      {items.map((item) => (
        <DarkLightBlock key={item.id} className="p-2">
          <Friend
            friendId={item.followingId}
            name={item.following.name}
            alias={item.following.alias}
            avatarUrl={item.following.avatar || ''}
          />
        </DarkLightBlock>
      ))}
    </ul>
  );
};
