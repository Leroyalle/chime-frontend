import { ApiRouter } from './constants';
import { Like } from '../../@types/dto';
import { instance } from './instance';

export const likePost = async (data: { postId: string }): Promise<Like> => {
  return (await instance.post<Like>(ApiRouter.LIKE, data)).data;
};

export const unlikePost = async (id: string): Promise<{ count: number }> => {
  return (await instance.delete<{ count: number }>(`${ApiRouter.LIKE}/${id}`)).data;
};
