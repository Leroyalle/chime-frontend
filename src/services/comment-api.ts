import axios from 'axios';
import { ApiRouter } from './constants';
import { Comment } from '../../@types/dto';

export const createComment = async (data: {
  content: string;
  postId: string;
}): Promise<Comment> => {
  return (await axios.post<Comment>(ApiRouter.COMMENT, data)).data;
};

export const deleteComment = async (id: string): Promise<void> => {
  return (await axios.delete<void>(`${ApiRouter.COMMENT}/${id}`)).data;
};
