import { User } from './newResponse';

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
  createdAt: Date;
  author: Author;
  likes: Like[];
  comments: Comment[];
  isLiked: boolean;
  isBookmarked: boolean;
  likesCount: number;
  commentsCount: number;
  tags: Tag[];
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
  createdAt: Date;
  updatedAt: Date;
  name: string;
  about: string | null;
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

export type Message = {
  id: string;
  body: string;
  chatId: string;
  UserBase: User;
  createdAt: Date;
  updatedAt: Date;
};

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
