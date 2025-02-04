import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { MessageDto, ChatWithMembers, UserChat, CursorInfinityResponse } from '@/types';
import { ApiRouter } from './constants';
import { instance } from './instance';
import { AxiosRequestHeaders } from 'axios';

export const getMessagesByChatId = async ({
  chatId,
  cursor = null,
  take = 20,
}: {
  chatId: string;
  cursor?: string | null;
  take?: number;
}): Promise<CursorInfinityResponse<MessageDto[]>> => {
  const params = new URLSearchParams();
  if (cursor) {
    params.append('cursor', encodeURIComponent(cursor));
  }
  params.append('take', take.toString());

  return (
    await instance.get<CursorInfinityResponse<MessageDto[]>>(`${ApiRouter.CHAT}/${chatId}`, {
      params,
    })
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
  const take = 20;

  return infiniteQueryOptions({
    queryKey: ['chat', chatId],
    queryFn: ({ pageParam }) =>
      getMessagesByChatId({
        chatId,
        cursor: pageParam,
        take,
      }),
    initialPageParam: null as string | null,
    select: (data) => data.pages.flatMap((data) => data.data).reverse(),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
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
  });
};
