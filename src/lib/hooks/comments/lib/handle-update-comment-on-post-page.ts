import { Post } from '@/types';

type TData = Post | undefined;

export const handleUpdateCommentOnPostPage = (commentId: string, data: TData, content: string) => {
  if (!data) {
    return undefined;
  }

  return {
    ...data,
    comments:
      data.comments &&
      data.comments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            content: content,
          };
        }
        return comment;
      }),
  };
};
