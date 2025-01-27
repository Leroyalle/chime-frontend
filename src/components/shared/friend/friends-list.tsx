import React from 'react';
import { cn } from '@/lib/utils';
import { Friend } from './friend';
import { DarkLightBlock } from '@/components/ui';
import { Friend as TFriend } from '../../../types/dto';

interface Props {
  items: TFriend[];
  className?: string;
}

export const FriendsList: React.FC<Props> = ({ items, className }) => {
  return (
    <ul className={cn('flex flex-col gap-y-5', className)}>
      {items.map((item) => (
        <DarkLightBlock key={item.id} className="p-2">
          <Friend friendId={item.id} name={item.name} alias={item.alias} avatar={item.avatar} />
        </DarkLightBlock>
      ))}
    </ul>
  );
};
