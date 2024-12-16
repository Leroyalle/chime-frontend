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
