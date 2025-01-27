import { MessageDto, PostMessageBody, TextMessageBody } from './dto';
import { User } from './response';

export type ChatUpdate = {
  chat: UserChat;
  message: MessageDto;
  recipient: User;
};

export type MessageRequest = {
  body: TextMessageBody | PostMessageBody;
};

export type UserChat = {
  id: string;
  name: string;
  avatar: string | null;
  imageUrl: string;
  lastMessage: MessageDto | null;
  createdAt: Date;
};

export type ChatWithMembers = UserChat & {
  members: User[];
};
