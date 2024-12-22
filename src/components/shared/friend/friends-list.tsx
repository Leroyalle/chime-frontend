import React from 'react';
import { cn } from '@/lib/utils';
import { Friend } from './friend';
import { Follows } from '../../../../@types/dto';

interface Props {
  items: Follows[];
  className?: string;
}

export const FriendsList: React.FC<Props> = ({ items, className }) => {
  return (
    <ul className={cn('', className)}>
      {items.map((item, i) => (
        <Friend key={i} className="mb-5" friendId={item.id} name={''} alias={''} avatarUrl={''} />
      ))}
    </ul>
  );
};
