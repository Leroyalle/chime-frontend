import { Message } from './newDto';

export type ChatUpdate = {
  chatId: string;
  message: Message;
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
