export interface SendEmailResponse {
  message: string;
  verified: boolean;
  userId: string;
  checkPassword: boolean;
}

export interface UserDto {
  user: User;
  token: string;
}

export interface UserResponse {
  user: User;
  isOwner: boolean;
}

export interface User {
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
}

export interface EmailUser {
  id: string;
  email: string;
  password: string;
  userBaseId: number;
}

export interface UserForComments {
  id: string;
  banned: boolean;
  role: string;
  about: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
