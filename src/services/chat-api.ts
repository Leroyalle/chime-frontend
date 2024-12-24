import { infiniteQueryOptions } from '@tanstack/react-query';
import { Message } from '../../@types/newDto';
import { ApiRouter } from './constants';
import { instance } from './instance';
import { InfinityResponse } from '../../@types/newResponse';

export const getMessagesByChatId = async ({
  id,
  page,
  perPage,
}: {
  id: string;
  page: number;
  perPage: number;
}): Promise<InfinityResponse<Message[]>> => {
  return (
    await instance.get<InfinityResponse<Message[]>>(
      `${ApiRouter.CHAT}/${id}?page=${page}&perPage=${perPage}`,
    )
  ).data;
};

export const getMessagesByChatIdInfinityQueryOptions = (chatId: string) => {
  const perPage = 20;
  return infiniteQueryOptions({
    queryKey: ['chat', chatId],
    queryFn: (meta) => getMessagesByChatId({ id: chatId, page: meta.pageParam, perPage }),
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((data) => data.data),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
  });
};
