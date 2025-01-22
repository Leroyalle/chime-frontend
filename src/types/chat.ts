import { MessageDto, PostMessageBody, TextMessageBody } from './dto';
import { User } from './response';

export type ChatUpdate = {
  chat: UserChat;
  message: MessageDto;
};

export type MessageRequest = {
  body: TextMessageBody | PostMessageBody;
};

export type UserChat = {
  id: string;
  name: string;
  imageUrl: string;
  lastMessage: MessageDto;
  createdAt: Date;
};

export type ChatWithMembers = UserChat & {
  members: User[];
};
