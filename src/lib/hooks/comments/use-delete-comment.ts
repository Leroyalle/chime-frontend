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

      const previousAllPostsData = queryClient.getQueryData({
        ...Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      });

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) =>
        handlePostCommentAction(postId, old, 'delete'),
      );

      const previousAllPopularPostsData = queryClient.getQueryData({
        ...Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey,
      });

      queryClient.setQueryData(Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey, (old) =>
        handlePostCommentAction(postId, old, 'delete'),
      );

      const previousPostByIdData = queryClient.getQueryData({
        ...Api.posts.getPostByIdQueryOptions(postId).queryKey,
      });

      queryClient.setQueryData(Api.posts.getPostByIdQueryOptions(postId).queryKey, (old) =>
        handleDeleteCommentOnPostPage(commentId, old),
      );

      const previousPostsByUserIdData = queryClient.getQueryData({
        ...Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
      });

      queryClient.setQueryData(
        Api.comments.getUserCommentsInfinityQueryOptions(userId).queryKey,
        (old) => handleDeleteCommentOnUserPage(commentId, old),
      );

      const previousBookmarksData = queryClient.getQueryData(
        Api.bookmark.getUserBookmarksInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(
        Api.bookmark.getUserBookmarksInfinityQueryOptions().queryKey,
        (old) => handlePostCommentAction(postId, old, 'delete'),
      );

      return {
        previousPostByIdData,
        previousAllPopularPostsData,
        previousAllPostsData,
        previousPostsByUserIdData,
        previousBookmarksData,
      };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
        context?.previousAllPostsData,
      );
      queryClient.setQueryData(
        Api.posts.getAllPopularPostsInfinityQueryOptions().queryKey,
        context?.previousAllPopularPostsData,
      );
      queryClient.setQueryData(
        Api.posts.getPostByIdQueryOptions(commentId).queryKey,
        context?.previousPostByIdData,
      );
    },
  });

  return {
    deleteComment: deleteCommentMutation.mutate,
    isPending: deleteCommentMutation.isPending,
    isError: deleteCommentMutation.isError,
  };
};
