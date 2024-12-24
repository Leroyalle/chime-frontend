export type SendEmailResponse = {
  message: string;
  verified: boolean;
  userId: string;
  checkPassword: boolean;
};

export type UserDto = {
  user: User;
  token: string;
};

export type UserResponse = {
  user: User;
  isOwner: boolean;
};

export type User = {
  id: string;
  banned: boolean;
  role: string;
  name: string;
  about: string | null;
  createdAt: string;
  updatedAt: string;
  EmailUser: EmailUser;
  TelegramUser: any | null;
  GoogleUser: any | null;
  isFollowing: boolean;
  followerCount: number;
  followingCount: number;
};

export type EmailUser = {
  id: string;
  email: string;
  password: string;
  userBaseId: number;
};

export type UserForComments = {
  id: string;
  banned: boolean;
  role: string;
  about: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type InfinityResponse<T> = {
  data: T;
  totalItems: number;
  totalPages: number;
};
