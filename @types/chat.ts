import { Message } from './newDto';

export interface ChatUpdate {
  chatId: string;
  message: Message;
}

export interface MessageRequest {
  chatId: string;
  message: string;
}
