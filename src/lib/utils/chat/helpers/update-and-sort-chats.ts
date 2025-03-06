import { MessageDto, UserChat } from '@/types';
import { updateChatsWithNewMessage } from './update-chats-with-new-message';
import { sortChatsByLastMessage } from './sort-chats-by-last-message';
import { updateChatsWithUpdatedMessage } from './update-chats-with-updated-message';

export const updateAndSortChats = (
  chats: UserChat[] | undefined,
  chat: UserChat,
  newMessage: MessageDto | null,
  type: 'new' | 'updated' = 'new',
  lastMessage: MessageDto | null = null,
): UserChat[] | undefined => {
  if (!chats) return undefined;
  const updatedChats =
    type === 'updated' && lastMessage
      ? updateChatsWithUpdatedMessage(chats, chat, newMessage, lastMessage)
      : updateChatsWithNewMessage(chats, chat, newMessage);
  return sortChatsByLastMessage(updatedChats);
};
