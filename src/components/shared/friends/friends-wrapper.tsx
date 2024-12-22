'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { FriendsList } from '../friend';

interface Props {
  className?: string;
}

export const FriendsWrapper: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn('w-full max-w-[500px]', className)}>
      <h2 className="text-2xl text-start mb-4">Друзья</h2>
      <FriendsList items={[]} />
    </section>
  );
};
