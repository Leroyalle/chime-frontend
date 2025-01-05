import { Message } from './newDto';
import { User } from './newResponse';

export type ChatUpdate = {
  chatId: string;
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
  createdAt: Date;
};

export type ChatWithMembers = UserChat & {
  members: User[];
};
