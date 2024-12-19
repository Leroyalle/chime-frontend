import { ApiRouter } from './constants';
import { Comment } from '../../@types/newDto';
import { instance } from './instance';

export const createComment = async (data: {
  content: string;
  postId: string;
}): Promise<Comment> => {
  return (await instance.post<Comment>(ApiRouter.COMMENT, data)).data;
};

export const deleteComment = async (id: string): Promise<void> => {
  return (await instance.delete<void>(`${ApiRouter.COMMENT}/${id}`)).data;
};
