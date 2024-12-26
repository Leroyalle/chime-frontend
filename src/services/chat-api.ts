import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { Message } from '../../@types/newDto';
import { ApiRouter } from './constants';
import { instance } from './instance';
import { InfinityResponse } from '../../@types/newResponse';
import { UserChat } from '../../@types/chat';

export const getMessagesByChatId = async ({
  id,
  page = 1,
  perPage = 20,
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

export const getUserChats = async (): Promise<UserChat[]> => {
  return (await instance.get<UserChat[]>(ApiRouter.CHAT)).data;
};

export const getMessagesByChatIdInfinityQueryOptions = (chatId: string) => {
  const perPage = 20;
  return infiniteQueryOptions({
    queryKey: ['chat', chatId],
    queryFn: (meta) => getMessagesByChatId({ id: chatId, page: meta.pageParam, perPage }),
    initialPageParam: 1,
    select: (data) => data.pages.flatMap((data) => data.data).reverse(),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    gcTime: Infinity,
  });
};

export const getUserChatsQueryOptions = () => {
  return queryOptions({
    queryKey: ['user-chats'],
    queryFn: getUserChats,
    refetchOnWindowFocus: false,
    gcTime: Infinity,
  });
};
