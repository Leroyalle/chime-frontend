import axios from 'axios';
import { ApiRouter } from './constants';
import { Like } from '../../@types/dto';

export const likePost = async (data: { postId: string }): Promise<Like> => {
  return (await axios.post<Like>(ApiRouter.LIKE, data)).data;
};

export const unLikePost = async (id: string): Promise<void> => {
  return (await axios.delete<void>(`${ApiRouter.LIKE}/${id}`)).data;
};
