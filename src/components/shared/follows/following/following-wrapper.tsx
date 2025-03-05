'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { InfinityResponse, Follows } from '@/types';
import { useInfinityScrollUserFollowing } from '@/lib/hooks';
import { FollowingList } from './following-list';
import { Spinner } from '@nextui-org/react';
import { EmptyState } from '../../empty-state';
import { Loader } from '@/components/ui';

interface Props {
  userId: string;
  initialData: InfinityResponse<Omit<Follows, 'follower'>[]>;
  className?: string;
}

export const FollowingWrapper: React.FC<Props> = ({ userId, initialData, className }) => {
  const { data, isFetching, cursor, isFetchingNextPage } = useInfinityScrollUserFollowing({
    userId,
    initialData,
  });

  if (isFetching) {
    return <Loader />;
  }

  if (!data || data.length === 0) {
    return <EmptyState title="Пока нет подписок" />;
  }

  return (
    <section className={cn('w-full m-auto', className)}>
      <h2 className="mb-2">Подписки</h2>
      <FollowingList items={data} className="w-full" />
      {cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </section>
  );
};
