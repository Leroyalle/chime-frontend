import { Api } from '@/services/api-client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RefObject, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

export const useInfinityScrollMessages = ({
  chatId,
  chatRef,
}: {
  chatId: string;
  chatRef: RefObject<HTMLDivElement>;
}) => {
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isPending, isFetchingNextPage } = useInfiniteQuery({
    ...Api.chat.getMessagesByChatIdInfinityQueryOptions(chatId),
    enabled: !!chatId,
  });

  useEffect(() => {
    if (inView && chatRef.current) {
      const scrollTopBefore = chatRef.current.scrollTop;
      const scrollHeightBefore = chatRef.current.scrollHeight;

      fetchNextPage().then(() => {
        setTimeout(() => {
          if (chatRef.current) {
            const scrollHeightAfter = chatRef.current.scrollHeight;
            const heightDifference = scrollHeightAfter - scrollHeightBefore;
            chatRef.current.scrollTop = scrollTopBefore + heightDifference;
          }
        }, 0);
      });
    }
  }, [inView, fetchNextPage]);

  const cursor = <div ref={ref} className="h-1 w-full bg-transparent" />;

  return {
    data,
    cursor,
    isPending,
    isFetchingNextPage,
  };
};
