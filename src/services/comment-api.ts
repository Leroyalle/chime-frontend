import { ApiRouter } from './constants';
import { Comment } from '../../@types/newDto';
import { instance } from './instance';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { CommentsDto } from '../../@types/response';

export const createComment = async (data: {
  content: string;
  postId: string;
}): Promise<Comment> => {
  return (await instance.post<Comment>(ApiRouter.COMMENT, data)).data;
};
export const getUserComments = async ({
  userId,
  page,
  perPage,
}: {
  userId: string;
  page: number;
  perPage: number;
}): Promise<CommentsDto> => {
  return (
    await instance.get<CommentsDto>(
      `${ApiRouter.USER_COMMENTS}/${userId}?page=${page}&perPage=${perPage}`,
    )
  ).data;
};

export const deleteComment = async (id: string): Promise<void> => {
  return (await instance.delete<void>(`${ApiRouter.COMMENT}/${id}`)).data;
};

export const getUserCommentsInfinityQueryOptions = (userId: string) => {
  return infiniteQueryOptions({
    queryKey: ['comments', 'list', userId],
    queryFn: (meta) => getUserComments({ userId, page: meta.pageParam, perPage: 10 }),
    initialPageParam: 1,
    select: ({ pages }) => pages.flatMap((page) => page.data),
    getNextPageParam(lastPage, allPages) {
      return lastPage.data.length > 0 ? allPages.length + 1 : undefined;
    },
    refetchOnWindowFocus: false,
    staleTime: 1 * 60 * 1000,
    placeholderData: (previousData) => previousData,
  });
};
