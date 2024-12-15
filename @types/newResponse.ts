export interface SendEmailResponse {
  message: string;
  verified: boolean;
  userId: number;
  checkPassword: boolean;
}

export interface UserDto {
  user: User;
  token: string;
}

export interface User {
  id: number;
  banned: boolean;
  role: string;
  createdAt: string;
  updatedAt: string;
  EmailUser: EmailUser;
  TelegramUser: any | null;
  GoogleUser: any | null;
}

export interface EmailUser {
  id: number;
  email: string;
  password: string;
  userBaseId: number;
}
