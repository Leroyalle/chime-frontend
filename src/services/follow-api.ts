import axios from 'axios';
import { ApiRouter } from './constants';
import { Follows } from '../../@types/dto';

export const followUser = async (data: { followingId: string }): Promise<Follows> => {
  return (await axios.post<Follows>(ApiRouter.FOLLOW, data)).data;
};

export const unFollowUser = async (id: string): Promise<void> => {
  return (await axios.delete<void>(`${ApiRouter.FOLLOW}/${id}`)).data;
};
