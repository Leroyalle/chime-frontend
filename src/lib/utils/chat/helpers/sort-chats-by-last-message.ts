import { UserChat } from '@/types';

export const sortChatsByLastMessage = (chats: UserChat[]): UserChat[] => {
  return chats.sort((a, b) => {
    const aDate = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
    const bDate = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
    return bDate - aDate;
  });
};
