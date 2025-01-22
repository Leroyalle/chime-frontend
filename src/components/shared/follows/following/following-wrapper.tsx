'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { InfinityResponse } from '../../../../types/response';
import { useInfinityScrollUserFollowing } from '@/lib/hooks';
import { FollowingList } from './following-list';
import { Spinner } from '@nextui-org/react';
import { EmptyState } from '../../empty-state';
import { Follows } from '../../../../types/dto';

interface Props {
  userId: string;
  initialData: InfinityResponse<Omit<Follows, 'follower'>[]>;
  className?: string;
}

export const FollowingWrapper: React.FC<Props> = ({ userId, initialData, className }) => {
  const { data, isPending, cursor, isFetchingNextPage } = useInfinityScrollUserFollowing({
    userId,
    initialData,
  });

  if (isPending) {
    return <div>Загрузка...</div>;
  }

  if (data.length === 0) {
    return <EmptyState title="Нет подписок" text="Сделайте первый шаг!" />;
  }

  return (
    <section className={cn('w-full m-auto', className)}>
      <h2 className="mb-2">Подписки</h2>
      {data && <FollowingList items={data} className="w-full" />}
      {/* FIXME: багается инвалидация подписок при курсоре */}
      {data.length > 9 && cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </section>
  );
};
