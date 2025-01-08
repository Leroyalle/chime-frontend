export enum TokensEnum {
  JWT = 'jwtToken',
}

export enum RoutesEnum {
  HOME = '/',
  POST = '/post',
  NEW = '/new',
  AUTH = '/auth',
  USER = '/user',
  MESSAGES = '/im',
  FOLLOWERS = '/followers',
  FOLLOWING = '/following',
  BOOKMARKS = '/bookmarks',
  LIKED = '/liked',
  FRIENDS = '/friends',
  PROFILE = '/profile',
  SETTINGS = '/profile/settings',
  EDIT = '/profile/settings/edit',
  THEME = '/profile/settings/theme',
  HELP = '/help',
}

export enum SocketEventsEnum {
  CONNECT = 'connect',
  UNAUTHORIZED = 'unauthorized',
  POST_NEW = 'post:new',
  CHECK_DATA = 'checkData',
  CHAT_CREATE = 'chat:create',
  MESSAGES_GET = 'messages:get',
  MESSAGE_DELETE = 'message:delete',
  MESSAGES_POST = 'messages:post',
  MESSAGES_DELETE_EMIT = 'messages:delete',
}
