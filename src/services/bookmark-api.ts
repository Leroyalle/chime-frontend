import { infiniteQueryOptions } from '@tanstack/react-query';
import { Post } from '../types/dto';
import { InfinityResponse } from '../types/response';
import { ApiRouter } from './constants';
import { instance } from './instance';
import { AxiosRequestHeaders } from 'axios';

interface FindAllBookmarksParams {
  page?: number;
  perPage?: number;
  headers?: AxiosRequestHeaders;
}

export const findAllBookmarks = async ({
  page = 1,
  perPage = 10,
  headers,
}: FindAllBookmarksParams): Promise<InfinityResponse<Post[]>> => {
  return (
    await instance.get<InfinityResponse<Post[]>>(
      `${ApiRouter.USER_BOOKMARKS}?page=${page}&perPage=${perPage}`,
      { headers },
    )
  ).data;
};

export const addBookmark = async (postId: string): Promise<void> => {
  return (await instance.post<void>(ApiRouter.USER_BOOKMARKS, { postId })).data;
};

export const removeBookmark = async (postId: string): Promise<void> => {
  return (await instance.delete<void>(`${ApiRouter.USER_BOOKMARKS}/${postId}`)).data;
};

export const getUserBookmarksInfinityQueryOptions = () => {
  const perPage = 10;
  return infiniteQueryOptions({
    queryKey: ['bookmark', 'list'],
    queryFn: (meta) => findAllBookmarks({ page: meta.pageParam, perPage }),
    initialPageParam: 1,
    select: ({ pages }) => pages.flatMap((page) => page.data),
    getNextPageParam(lastPage, allPages) {
      return lastPage.data.length === 0 ? undefined : allPages.length + 1;
    },
    refetchOnWindowFocus: false,
  });
};
