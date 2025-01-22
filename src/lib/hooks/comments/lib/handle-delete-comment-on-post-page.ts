import { Post } from '@/types';

type TData = Post | undefined;

export const handleDeleteCommentOnPostPage = (commentId: string, data: TData) => {
  if (!data) {
    return undefined;
  }
  return {
    ...data,
    comments: data.comments && data.comments.filter((comment) => comment.id !== commentId),
  };
};
