import { User } from './response';

export type Root = {
  data: Post[];
  currentPage: number;
  totalPages: number;
};

export type Post = {
  id: string;
  content: string;
  imageUrl: string | null;
  authorId: string;
  author: Author;
  likes: Like[] | null;
  comments: Comment[] | null;
  images: Image[] | null;
  isLiked: boolean;
  isBookmarked: boolean;
  likesCount: number;
  commentsCount: number;
  tags: Tag[];
  createdAt: Date;
};

export type Image = {
  id: string;
  url: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Tag = {
  id: string;
  value: string;
  label: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Author = {
  id: string;
  banned: boolean;
  role: string;
  name: string;
  avatar: string | null;
  about: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type Like = {
  id: string;
  userId: string;
  postId: string;
};

export type Comment = {
  id: string;
  content: string;
  userId: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};

export interface MessageDto {
  id: string;
  content: string | null;
  type: MessageTypeEnum;
  chatId: string;
  postId: string | null;
  userBaseId: string;
  createdAt: Date;
  updatedAt: Date;
  UserBase: {
    id: string;
    name: string;
  };
  post: Post | null;
}

export type Message = {
  id: string;
  chatId: string;
  UserBase: User;
  createdAt: Date;
  updatedAt: Date;
} & MessageBody;

export type MessageBody = TextMessageBody | PostMessageBody;

export interface TextMessageBody {
  chatId: string;
  type: MessageTypeEnum.TEXT;
  content: string;
}

export interface PostMessageBody {
  chatIds: string[];
  type: MessageTypeEnum.POST;
  content: string | null;
  postId: string;
}

export enum MessageTypeEnum {
  TEXT = 'TEXT',
  POST = 'POST',
}

export type Friend = {
  id: string;
  banned: boolean;
  role: string;
  alias: string;
  name: string;
  avatarUrl: string | null;
  location: string | null;
  age: number | null;
  status: string | null;
  about: string | null;
  createdAt: string;
  updatedAt: string;
};
