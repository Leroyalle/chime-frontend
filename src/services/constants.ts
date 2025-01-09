export enum ApiRouter {
  USER = '/user',
  ME = '/user/me',
  POST = '/posts',
  USER_POSTS = '/posts/user',
  COMMENT = '/comment',
  USER_COMMENTS = 'comment/user',
  LIKE = '/like',
  FOLLOW = '/follow',
  USER_FOLLOWERS = '/follow/followers',
  USER_FOLLOWING = '/follow/following',
  FRIENDS = '/follow/friends',
  REFRESH = '/refresh',
  REGISTER = '/auth/email/sendCode',
  VERIFY = '/auth/email/verify',
  CHAT = '/chat',
  CHAT_INFO = '/chat/info',
  CHAT_GET = 'chat/create',
}
