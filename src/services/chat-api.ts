import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { InfinityResponse, MessageDto, ChatWithMembers, UserChat } from '@/types';
import { ApiRouter } from './constants';
import { instance } from './instance';
import { AxiosRequestHeaders } from 'axios';

export const getMessagesByChatId = async ({
  id,
  page = 1,
  perPage = 20,
}: {
  id: string;
  page: number;
  perPage: number;
}): Promise<InfinityResponse<MessageDto[]>> => {
  return (
    await instance.get<InfinityResponse<MessageDto[]>>(
      `${ApiRouter.CHAT}/${id}?page=${page}&perPage=${perPage}`,
    )
  ).data;
};

export const getUserChats = async (query: string = ''): Promise<ChatWithMembers[]> => {
  const hasQuery = query ? `?query=${query}` : '';
  return (await instance.get<ChatWithMembers[]>(`${ApiRouter.CHAT}${hasQuery}`)).data;
};

export const getChatById = async ({
  id,
  headers,
}: {
  id: string;
  headers?: AxiosRequestHeaders;
}): Promise<ChatWithMembers> => {
  return (await instance.get<ChatWithMembers>(`${ApiRouter.CHAT_INFO}/${id}`, { headers })).data;
};

export const getChatId = async (recipientId: string): Promise<{ chatId: Pick<UserChat, 'id'> }> => {
  return (
    await instance.get<{ chatId: Pick<UserChat, 'id'> }>(`${ApiRouter.CHAT_GET}/${recipientId}`)
  ).data;
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

export const getUserChatsQueryOptions = (query: string = '') => {
  return queryOptions({
    queryKey: ['user-chats', query],
    queryFn: () => getUserChats(query),
    refetchOnWindowFocus: false,
    staleTime: 1 * 60 * 1000,
    retry: false,
  });
};
