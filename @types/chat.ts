import { Message } from './newDto';
import { User } from './newResponse';

export type ChatUpdate = {
  chat: UserChat;
  message: Message;
  senderName: string;
};

export type MessageRequest = {
  chatId: string;
  message: string;
};

export type UserChat = {
  id: string;
  name: string;
  imageUrl: string;
  lastMessage: Message;
  createdAt: Date;
};

export type ChatWithMembers = UserChat & {
  members: User[];
};
