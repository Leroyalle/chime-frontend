import { InfiniteData } from '@tanstack/react-query';
import { InfinityResponse } from '../../../../../@types/response';
import { Comment } from '../../../../../@types/dto';

type TData = InfiniteData<InfinityResponse<Comment[]>, unknown> | undefined;

export const handleDeleteCommentOnUserPage = (commentId: string, data: TData): TData => {
  if (!data) {
    return undefined;
  }

  return {
    ...data,
    pages: data.pages.map((page) => ({
      ...page,
      data: page.data.filter((c) => c.id !== commentId),
    })),
  };
};
