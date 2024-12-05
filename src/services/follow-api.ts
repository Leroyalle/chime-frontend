import { ApiRouter } from './constants';
import { Follows } from '../../@types/dto';
import { instance } from './instance';

export const followUser = async (data: { followingId: string }): Promise<Follows> => {
  return (await instance.post<Follows>(ApiRouter.FOLLOW, data)).data;
};

export const unFollowUser = async (id: string): Promise<void> => {
  return (await instance.delete<void>(`${ApiRouter.FOLLOW}/${id}`)).data;
};
