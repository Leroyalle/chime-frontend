import { InfiniteData } from '@tanstack/react-query';
import { Post } from '../../../../../@types/dto';
import { InfinityResponse } from '../../../../../@types/response';

type TData = InfiniteData<InfinityResponse<Post[]>, unknown> | undefined;

export const handlePostCommentAction = (
  postId: string,
  data: TData,
  action: 'create' | 'delete',
): TData => {
  if (!data) {
    return undefined;
  }
  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      data: page.data.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentsCount: action === 'create' ? post.commentsCount + 1 : post.commentsCount - 1,
            }
          : post,
      ),
    })),
  };
};
