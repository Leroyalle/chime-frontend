import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  handleDeleteCommentOnPostPage,
  handleDeleteCommentOnUserPage,
  handlePostCommentAction,
} from './lib';

export const useDeleteComment = ({
  postId,
  commentId,
  userId,
}: {
  postId: string;
  commentId: string;
  userId: string;
}) => {
  const queryClient = useQueryClient();

  const deleteCommentMutation = useMutation({
    mutationFn: () => Api.comments.deleteComment(commentId),
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['comments'] });

      const previousPostByIdData = queryClient.getQueryData({
        ...Api.posts.getPostByIdQueryOptions(postId).queryKey,
      });

      queryClient.setQueryData(Api.posts.getPostByIdQueryOptions(postId).queryKey, (old) => {
        return handleDeleteCommentOnPostPage(commentId, old);
      });

      const previousAllPostsData = queryClient.getQueryData({
        ...Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      });

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) => {
        return handlePostCommentAction(postId, old, 'delete');
      });

      const previousPostsByUserIdData = queryClient.getQueryData({
        ...Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
      });

      queryClient.setQueryData(
        Api.comments.getUserCommentsInfinityQueryOptions(userId).queryKey,
        (old) => {
          return handleDeleteCommentOnUserPage(commentId, old);
        },
      );

      return { previousPostByIdData, previousAllPostsData, previousPostsByUserIdData };
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
