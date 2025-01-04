'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { FriendsList } from '../friend';
import { useInfinityScrollUserFriends } from '@/lib/hooks';
import { Spinner } from '@nextui-org/react';
import { InfinityResponse } from '../../../../@types/newResponse';
import { EmptyState } from '../empty-state';
import { Friend } from '../../../../@types/newDto';

interface Props {
  userId: string;
  initialData: InfinityResponse<Friend[]>;
  className?: string;
}

export const FriendsWrapper: React.FC<Props> = ({ userId, initialData, className }) => {
  const { data, cursor, isPending, isError, isFetchingNextPage } = useInfinityScrollUserFriends({
    userId,
    initialData,
  });

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (!data || data.length === 0) {
    return <EmptyState title="Друзей пока нет" text="Общайтесь и добавляйтесь в друзья!" />;
  }

  return (
    <section className={cn('w-full max-w-[500px]', className)}>
      <h2 className="text-2xl text-start mb-4">Друзья</h2>
      <FriendsList items={data} />
      {/* FIXME: багается инвалидация друзей при курсоре */}
      {data.length > 10 && cursor}
      {isFetchingNextPage && <Spinner color="warning" className="w-full mx-auto mb-2" />}
    </section>
  );
};
