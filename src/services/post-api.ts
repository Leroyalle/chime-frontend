import { ApiRouter } from './constants';
import { Post } from '../types/dto';
import { instance } from './instance';
import { AxiosRequestHeaders } from 'axios';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { InfinityResponse } from '../types/response';

export const getAllPosts = async ({
  page,
  perPage,
  headers,
}: {
  page: number;
  perPage: number;
  headers?: AxiosRequestHeaders;
}): Promise<InfinityResponse<Post[]>> => {
  return (
    await instance.get<InfinityResponse<Post[]>>(
      `${ApiRouter.POST}?page=${page}&perPage=${perPage}`,
      { headers },
    )
  ).data;
};
export const getAllPopularPosts = async ({
  page,
  perPage,
  headers,
}: {
  page: number;
  perPage: number;
  headers?: AxiosRequestHeaders;
}): Promise<InfinityResponse<Post[]>> => {
  return (
    await instance.get<InfinityResponse<Post[]>>(
      `${ApiRouter.POST_POPULAR}?page=${page}&perPage=${perPage}`,
      { headers },
    )
  ).data;
};

export const createPost = async (data: { postData: FormData }): Promise<Post> => {
  return (await instance.post<Post>(ApiRouter.POST, data.postData)).data;
};

export const getPostById = async ({
  id,
  headers,
}: {
  id: string;
  headers?: AxiosRequestHeaders;
}): Promise<Post> => {
  return (await instance.get<Post>(`${ApiRouter.POST}/${id}`, { headers })).data;
};

export const getPostsByUserId = async ({
  userId,
  page,
  perPage,
  headers,
}: {
  userId: string;
  page: number;
  perPage: number;
  headers?: AxiosRequestHeaders;
}): Promise<InfinityResponse<Post[]>> => {
  return (
    await instance.get<InfinityResponse<Post[]>>(
      `${ApiRouter.USER_POSTS}/${userId}?page=${page}&perPage=${perPage}`,
      {
        headers,
      },
    )
  ).data;
};

export const deletePost = async (id: string): Promise<void> => {
  return (await instance.delete<void>(`${ApiRouter.POST}/${id}`)).data;
};

export const getUserLikedPosts = async ({
  page = 1,
  perPage = 10,
  headers,
}: {
  page?: number;
  perPage?: number;
  headers?: AxiosRequestHeaders;
}): Promise<InfinityResponse<Post[]>> => {
  return (
    await instance.get<InfinityResponse<Post[]>>(
      `${ApiRouter.USER_LIKES}?page=${page}&perPage=${perPage}`,
      { headers },
    )
  ).data;
};

export const getAllPostsInfinityQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ['posts', 'list'],
    queryFn: (meta) => getAllPosts({ page: meta.pageParam, perPage: 10 }),
    initialPageParam: 1,
    select: ({ pages }) => pages.flatMap((page) => page.data),
    getNextPageParam(lastPage, allPages) {
      return lastPage.data.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 1 * 60 * 1000,
  });
};

export const getAllPopularPostsInfinityQueryOptions = () => {
  return infiniteQueryOptions({
    queryKey: ['posts', 'popular'],
    queryFn: (meta) => getAllPopularPosts({ page: meta.pageParam, perPage: 10 }),
    initialPageParam: 1,
    select: ({ pages }) => pages.flatMap((page) => page.data),
    getNextPageParam(lastPage, allPages) {
      return lastPage.data.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 1 * 60 * 1000,
  });
};

export const getPostByIdQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: ['post', id],
    queryFn: () => getPostById({ id }),
    refetchOnWindowFocus: false,
  });
};

export const getPostsByUserIdInfinityQueryOptions = (userId: string) => {
  const perPage = 10;
  return infiniteQueryOptions({
    queryKey: ['posts', 'list', userId],
    queryFn: (meta) => getPostsByUserId({ userId, page: meta.pageParam, perPage }),
    initialPageParam: 1,
    select: ({ pages }) => pages.flatMap((page) => page.data),
    getNextPageParam(lastPage, allPages) {
      return lastPage.data.length < perPage ? undefined : allPages.length + 1;
    },
    refetchOnWindowFocus: false,
  });
};

export const getUserLikedPostsInfinityQueryOptions = () => {
  const perPage = 10;
  return infiniteQueryOptions({
    queryKey: ['posts', 'list', 'liked'],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getUserLikedPosts({ page: pageParam, perPage });
      if (!response || !response.data) {
        throw new Error('Failed to fetch liked posts');
      }
      return response;
    },
    initialPageParam: 1,
    select: ({ pages }) => pages.flatMap((page) => page.data),
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      if (lastPage.data.length === 0) {
        return undefined;
      }
      return lastPageParam + 1;
    },
    refetchOnWindowFocus: false,
  });
};
