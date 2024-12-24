import { ApiRouter } from './constants';
import { Follows } from '../../@types/dto';
import { instance } from './instance';
import { AxiosRequestHeaders } from 'axios';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { InfinityResponse } from '../../@types/newResponse';

export const followUser = async (data: { followingId: string }): Promise<Follows> => {
  return (await instance.post<Follows>(ApiRouter.FOLLOW, data)).data;
};

export const unFollowUser = async (id: string): Promise<void> => {
  return (await instance.delete<void>(`${ApiRouter.FOLLOW}/${id}`)).data;
};

export const getFollowers = async ({
  userId,
  page = 1,
  perPage = 10,
  headers,
}: {
  userId: string;
  page?: number;
  perPage?: number;
  headers?: AxiosRequestHeaders;
}): Promise<InfinityResponse<Omit<Follows, 'following'>[]>> => {
  return (
    await instance.get<InfinityResponse<Omit<Follows, 'following'>[]>>(
      `${ApiRouter.USER_FOLLOWERS}/${userId}?page=${page}&perPage=${perPage}`,
      { headers },
    )
  ).data;
};

export const getFollowing = async ({
  userId,
  page = 1,
  perPage = 10,
  headers,
}: {
  userId: string;
  page?: number;
  perPage?: number;
  headers?: AxiosRequestHeaders;
}): Promise<InfinityResponse<Omit<Follows, 'follower'>[]>> => {
  return (
    await instance.get<InfinityResponse<Omit<Follows, 'follower'>[]>>(
      `${ApiRouter.USER_FOLLOWING}/${userId}?page=${page}&perPage=${perPage}`,
      { headers },
    )
  ).data;
};

export const getFollowersInfinityQueryOptions = (userId: string) => {
  const perPage = 10;
  return infiniteQueryOptions({
    queryKey: ['followers', userId],
    queryFn: (meta) => getFollowers({ userId, page: meta.pageParam, perPage }),
    initialPageParam: 1,
    select: ({ pages }) => pages.flatMap((page) => page.data),
    getNextPageParam(lastPage, allPages) {
      return lastPage.data.length < perPage ? undefined : allPages.length + 1;
    },
    refetchOnWindowFocus: false,
  });
};

export const getFollowingInfinityQueryOptions = (userId: string) => {
  const perPage = 10;
  return infiniteQueryOptions({
    queryKey: ['following', userId],
    queryFn: (meta) => getFollowing({ userId, page: meta.pageParam, perPage }),
    initialPageParam: 1,
    select: ({ pages }) => pages.flatMap((page) => page.data),
    getNextPageParam(lastPage, allPages) {
      return lastPage.data.length < perPage ? undefined : allPages.length + 1;
    },
    refetchOnWindowFocus: false,
  });
};
