import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateComment = (userId: string, postId: string) => {
  const queryClient = useQueryClient();

  const updateCommentMutation = useMutation({
    mutationFn: (params: { commentId: string; content: string }) =>
      Api.comments.updateComment({ id: params.commentId, content: params.content }),

    onMutate({ commentId, content }) {
      queryClient.cancelQueries({ queryKey: ['comments'] });

      const previewPostByIdData = queryClient.getQueryData({
        ...Api.posts.getPostByIdQueryOptions(postId).queryKey,
      });

      queryClient.setQueryData(Api.posts.getPostByIdQueryOptions(postId).queryKey, (old) => {
        if (!old) {
          return undefined;
        }

        return {
          ...old,
          comments: old.comments.map((comment) => {
            if (comment.id === commentId) {
              return {
                ...comment,
                content: content,
              };
            }
            return comment;
          }),
        };
      });

      return { previewPostByIdData };
    },
    onSettled: () => {
      queryClient.resetQueries(Api.comments.getUserCommentsInfinityQueryOptions(userId));
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        Api.posts.getPostByIdQueryOptions(postId).queryKey,
        context?.previewPostByIdData,
      );
    },
  });

  return {
    updateComment: updateCommentMutation.mutate,
    isPending: updateCommentMutation.isPending,
    isError: updateCommentMutation.error,
  };
};
