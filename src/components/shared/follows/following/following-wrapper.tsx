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
  const { data, isPending, cursor, isFetchingNextPage } = useInfinityScrollUserFollowing({
    userId,
    initialData,
  });

  if (isPending) {
    return <div>Загрузка...</div>;
  }
  return (
    <section className={cn('', className)}>
      <h2 className="mb-2">Подписки</h2>
      {data && <FollowingList items={data} className="max-w-[640px]" />}
      {/* FIXME: багается инвалидация подписок при курсоре */}
      {data.length > 9 && cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </section>
  );
};
