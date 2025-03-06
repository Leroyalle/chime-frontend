import { MessageDto, UserChat } from '@/types';

export const updateChatsWithNewMessage = (
  chats: UserChat[],
  chat: UserChat,
  newMessage: MessageDto | null,
): UserChat[] => {
  const updatedChats = chats.map((ch) => {
    if (ch.id === chat.id) {
      return { ...ch, lastMessage: newMessage };
    }
    return ch;
  });

  const existingChat = updatedChats.find((chat) => chat.id === chat.id);
  if (!existingChat) {
    updatedChats.push({ ...chat, lastMessage: newMessage });
  }

  return updatedChats;
};
