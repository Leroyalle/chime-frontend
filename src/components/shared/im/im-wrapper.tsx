'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { ChatList, SearchChat } from './chat-list';
import { ImHead as Header } from './im-head';
import { EmptyState } from '../empty-state';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/services/api-client';
import { Spinner } from '@nextui-org/react';

interface Props {
  className?: string;
}

export const ImWrapper: React.FC<Props> = ({ className }) => {
  const { data, isPending } = useQuery({
    ...Api.chat.getUserChatsQueryOptions(),
  });

  if (isPending) {
    return (
      <Spinner
        color="warning"
        className="absolute bottom-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 "
      />
    );
  }

  if (!data || data.length === 0) {
    return <EmptyState title={'Нет чатов ;('} text={'Заводите друзей и общайтейсь!'} />;
  }

  return (
    <section className={cn('relative', className)}>
      <h2 className="sr-only">Ваши чаты</h2>
      <Header className="mb-4" />
      <SearchChat className="mb-2 max-w-80" />
      <ChatList items={data} />
    </section>
  );
};
