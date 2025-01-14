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
  LIKES = '/likes',
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
  MESSAGES_POST = 'messages:post',
  MESSAGES_GET = 'messages:get',
  MESSAGES_DELETE = 'messages:delete',
  MESSAGES_UPDATE = 'messages:patch',
}
