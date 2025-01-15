import { ApiRouter } from './constants';
import { instance } from './instance';

export const addBookmark = async (postId: string): Promise<void> => {
  return (await instance.post<void>(ApiRouter.USER_BOOKMARKS, { postId })).data;
};

export const removeBookmark = async (postId: string): Promise<void> => {
  return (await instance.delete<void>(`${ApiRouter.USER_BOOKMARKS}/${postId}`)).data;
};

export const getBookmarks = async (): Promise<void> => {
  return (await instance.get<void>(ApiRouter.USER_BOOKMARKS)).data;
};
