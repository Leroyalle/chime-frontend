'use client';
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ChatList } from '../chat-list';
import { ImHead as Header } from './im-head';
import { EmptyState } from '../empty-state';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/services/api-client';
import { Spinner } from '@nextui-org/react';
import { SearchChats } from '../search-chats';
import { useDebounce } from '@/components/ui/shadcn-expendsions';

interface Props {
  className?: string;
}

export const ImWrapper: React.FC<Props> = ({ className }) => {
  const isMounted = React.useRef(false);
  const [searchValue, setSearchValue] = useState('');
  const searchQuery = useDebounce(searchValue, 500);
  const { data: chats, isFetching } = useQuery(Api.chat.getUserChatsQueryOptions(searchQuery));

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
    }
  }, []);

  if (isFetching && !isMounted.current) {
    return (
      <Spinner
        color="warning"
        className="absolute bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />
    );
  }

  if ((!chats || chats.length === 0) && !isMounted.current) {
    return <EmptyState title={'У вас нет чатов'} />;
  }

  return (
    <section className={cn('relative', className)}>
      <h2 className="sr-only">Ваши чаты</h2>
      <Header className="mb-4" />
      <SearchChats value={searchValue} onChange={setSearchValue} className="mb-2 max-w-80" />
      <ChatList
        items={chats}
        hasActions={false}
        className="p-2"
        itemsStyles="hover:bg-background"
      />
    </section>
  );
};
