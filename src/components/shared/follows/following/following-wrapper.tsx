'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { FollowingWithUser } from '../../../../../@types/newResponse';
import { useInfinityScrollUserFollowing } from '@/lib/hooks';
import { FollowingList } from './following-list';
import { Spinner } from '@nextui-org/react';

interface Props {
  userId: string;
  initialData: FollowingWithUser;
  className?: string;
}

export const FollowingWrapper: React.FC<Props> = ({ userId, initialData, className }) => {
  const { data, cursor, isFetchingNextPage } = useInfinityScrollUserFollowing({
    userId,
    initialData,
  });
  return (
    <section className={cn('', className)}>
      <h2 className="sr-only">Подписчики</h2>
      <FollowingList items={data} className="max-w-[640px]" />
      {cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </section>
  );
};
