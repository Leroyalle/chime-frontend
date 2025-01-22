import { InfiniteData } from '@tanstack/react-query';
import { InfinityResponse } from '../../../../types/response';
import { Post } from '../../../../types/dto';

type TData = InfiniteData<InfinityResponse<Post[]>, unknown> | undefined;

export const handleDeletePost = (postId: string, data: TData) => {
  if (!data) {
    return undefined;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      data: page.data.filter((p) => p.id !== postId),
    })),
  };
};
