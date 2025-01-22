import { InfiniteData } from '@tanstack/react-query';
import { Post } from '../../../../types/dto';
import { InfinityResponse } from '../../../../types/response';

type TData = InfiniteData<InfinityResponse<Post[]>, unknown> | undefined;

export const togglePostLike = (postId: string, data: TData, action: 'like' | 'unlike'): TData => {
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
              isLiked: action === 'like',
              likesCount: action === 'like' ? post.likesCount + 1 : post.likesCount - 1,
            }
          : post,
      ),
    })),
  };
};
