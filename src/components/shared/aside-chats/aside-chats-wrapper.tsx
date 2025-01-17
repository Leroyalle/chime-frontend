'use client';
import React, { useEffect, useState } from 'react';
import { DarkLightBlock } from '../../ui';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/services/api-client';
import { Skeleton } from '@nextui-org/react';
import { ChatList } from '../chat-list';
import { SearchChats } from '../search-chats';
import { useDebounce } from '@/components/ui/shadcn-expendsions';

interface Props {
  className?: string;
}

export const AsideChatsWrapper: React.FC<Props> = ({ className }) => {
  const isMounted = React.useRef(false);
  const [searchValue, setSearchValue] = useState('');
  const searchQuery = useDebounce(searchValue, 500);
  const {
    data: chats,
    isLoading,
    isFetching: isFetchingChats,
  } = useQuery({
    ...Api.chat.getUserChatsQueryOptions(searchQuery),
    gcTime: Infinity,
  });

  useEffect(() => {
    // FIXME: каждый перезапрос при изменении searchValue триггерит загрузку
    if (!isMounted.current) {
      isMounted.current = true;
    }
  }, []);

  if (isLoading && !isMounted.current) {
    return <Skeleton className={cn('w-full', className)} />;
  }

  return (
    <DarkLightBlock className={cn('bg-background', className)}>
      <section>
        <h2 className="text-xl mb-2">Сообщения</h2>
        <SearchChats
          className="mb-2 w-full"
          value={searchValue}
          onChange={setSearchValue}
          isLoading={isFetchingChats}
        />
        <div className="w-full h-[2px] bg-primary-light" />
        {chats && chats.length ? (
          <ChatList items={chats} className="bg-background" itemsStyles="hover:bg-primary-light" />
        ) : (
          <h2>нет чатов</h2>
        )}
      </section>
    </DarkLightBlock>
  );
};
