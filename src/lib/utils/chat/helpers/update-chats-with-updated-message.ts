import { MessageDto, UserChat } from '@/types';

export const updateChatsWithUpdatedMessage = (
  chats: UserChat[],
  chat: UserChat,
  updatedMessage: MessageDto | null,
  lastMessage: MessageDto | null,
): UserChat[] => {
  const updatedChats = chats.map((ch) => {
    if (ch.id === chat.id) {
      return { ...ch, lastMessage: lastMessage };
    }
    return ch;
  });

  const existingChat = updatedChats.find((chat) => chat.id === chat.id);
  if (!existingChat) {
    updatedChats.push({ ...chat, lastMessage: updatedMessage });
  }

  return updatedChats;
};
