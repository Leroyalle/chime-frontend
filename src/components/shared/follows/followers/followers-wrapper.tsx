'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { useInfinityScrollUserFollowers } from '@/lib/hooks';
import { FollowersList } from './followers-list';
import { Spinner } from '@nextui-org/react';
import { EmptyState } from '../../empty-state';
import { InfinityResponse, Follows } from '@/types';

interface Props {
  userId: string;
  initialData: InfinityResponse<Omit<Follows, 'following'>[]>;
  className?: string;
}

export const FollowersWrapper: React.FC<Props> = ({ userId, initialData, className }) => {
  const { data, isPending, cursor, isFetchingNextPage } = useInfinityScrollUserFollowers({
    userId,
    initialData,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (data.length === 0) {
    return (
      <EmptyState
        title="Пока нет подписчиков"
        text="Ищите друзей и общайтесь, слава придет сама!"
      />
    );
  }

  return (
    <section className={cn('w-full m-auto', className)}>
      <h2 className="mb-2">Подписчики</h2>
      <FollowersList items={data} className="w-full" />
      {/* FIXME: багается инвалидация подписок при курсоре */}
      {data.length > 9 && cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </section>
  );
};
