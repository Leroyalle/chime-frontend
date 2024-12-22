'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { FollowersWithUser } from '../../../../../@types/newResponse';
import { useInfinityScrollUserFollowers } from '@/lib/hooks';
import { FollowersList } from './followers-list';
import { Spinner } from '@nextui-org/react';

interface Props {
  userId: string;
  initialData: FollowersWithUser;
  className?: string;
}

export const FollowersWrapper: React.FC<Props> = ({ userId, initialData, className }) => {
  const { data, cursor, isFetchingNextPage } = useInfinityScrollUserFollowers({
    userId,
    initialData,
  });
  return (
    <section className={cn('', className)}>
      <h2 className="sr-only">Подписчики</h2>
      <FollowersList items={data} className="max-w-[640px]" />
      {cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </section>
  );
};
