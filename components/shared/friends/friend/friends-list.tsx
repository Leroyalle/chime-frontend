import React from 'react';
import { cn } from '@/lib/utils';
import { Friend } from './friend';

interface Props {
  className?: string;
}

export const FriendsList: React.FC<Props> = ({ className }) => {
  return (
    <ul className={cn('', className)}>
      {Array.from({ length: 10 }).map((_, index) => (
        <Friend key={index} className="mb-5" />
      ))}
    </ul>
  );
};
