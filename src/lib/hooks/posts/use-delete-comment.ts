import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteComment = ({ postId, commentId }: { postId: string; commentId: string }) => {
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: () => Api.comments.deleteComment(commentId),
    onMutate: () => {
      const previousPostByIdData = queryClient.getQueryData({
        ...Api.posts.getPostByIdQueryOptions(postId).queryKey,
      });

      queryClient.setQueryData(Api.posts.getPostByIdQueryOptions(postId).queryKey, (old) => {
        if (!old) {
          return undefined;
        }

        return {
          ...old,
          comments: old.comments.filter((comment) => comment.id !== commentId),
        };
      });

      const previousAllPostsData = queryClient.getQueryData({
        ...Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      });

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) => {
        if (!old) {
          return undefined;
        }

        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((p) =>
              p.id === postId ? { ...p, commentsCount: p.commentsCount - 1 } : p,
            ),
          })),
        };
      });

      return { previousPostByIdData, previousAllPostsData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        Api.posts.getPostByIdQueryOptions(commentId).queryKey,
        context?.previousPostByIdData,
      );
      queryClient.setQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
        context?.previousAllPostsData,
      );
    },
  });

  return {
    deleteComment: deleteCommentMutation.mutate,
    isPending: deleteCommentMutation.isPending,
    isError: deleteCommentMutation.isError,
  };
};
