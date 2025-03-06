import { useQueryClient } from '@tanstack/react-query';

import { ChatUpdate, UserChat, UserResponse } from '@/types';
import { Api } from '@/services/api-client';
import { updateAndSortChats } from '@/lib/utils';
import { useMessageNotifications } from './use-message-notifications';

export const useMessageHandlers = (
  pathNameRef: { current: string },
  me: UserResponse | undefined,
) => {
  const queryClient = useQueryClient();
  const { showNewMessageNotification } = useMessageNotifications(pathNameRef, me);

  const handleNewMessage = (data: ChatUpdate) => {
    showNewMessageNotification(data);

    queryClient.setQueriesData({ queryKey: ['user-chats'] }, (old?: UserChat[]) =>
      updateAndSortChats(old, data.chat, data.message),
    );

    queryClient.setQueryData(
      Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chat.id).queryKey,
      (old) => {
        if (!old) return undefined;

        const newPages = old.pages.map((page, index) => {
          if (index === 0) {
            return {
              ...page,
              data: [data.message, ...page.data],
            };
          }
          return { ...page };
        });

        return {
          ...old,
          pages: newPages,
        };
      },
    );
  };

  const handleUpdateMessage = (data: ChatUpdate) => {
    queryClient.setQueryData(
      Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chat.id).queryKey,
      (old) => {
        if (!old) return undefined;
        const updatedData = {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((m) => (m.id === data.message.id ? data.message : m)),
          })),
        };
        return updatedData;
      },
    );
    queryClient.setQueriesData({ queryKey: ['user-chats'] }, (old?: UserChat[]) =>
      updateAndSortChats(old, data.chat, data.message, 'updated', data.chat.lastMessage),
    );
  };

  const handleDeleteMessage = (data: ChatUpdate) => {
    queryClient.setQueryData(
      Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chat.id).queryKey,
      (old) => {
        if (!old) return old;

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.filter((message) => message.id !== data.message.id),
          })),
        };
      },
    );
    queryClient.setQueriesData({ queryKey: ['user-chats'] }, (old?: UserChat[]) =>
      updateAndSortChats(old, data.chat, data.chat.lastMessage),
    );
  };

  return {
    handleNewMessage,
    handleUpdateMessage,
    handleDeleteMessage,
  };
};
