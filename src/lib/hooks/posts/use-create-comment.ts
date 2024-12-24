import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateComment = (postId: string, userId: string) => {
  const queryClient = useQueryClient();
  const createCommentMutation = useMutation({
    mutationFn: Api.comments.createComment,
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['posts'],
      });
      const previousData = queryClient.getQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
      );

      queryClient.setQueryData(Api.posts.getAllPostsInfinityQueryOptions().queryKey, (old) => {
        if (!old) {
          return undefined;
        }
        return {
          ...old,
          pages: old.pages.map((page) => ({
            ...page,
            data: page.data.map((post) =>
              post.id === postId ? { ...post, commentsCount: post.commentsCount + 1 } : post,
            ),
          })),
        };
      });

      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        (old) => {
          if (!old) {
            return undefined;
          }
          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((post) =>
                post.id === postId ? { ...post, commentsCount: post.commentsCount + 1 } : post,
              ),
            })),
          };
        },
      );

      return { previousData };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
        context?.previousData,
      );
      queryClient.setQueryData(
        Api.posts.getPostsByUserIdInfinityQueryOptions(userId).queryKey,
        context?.previousData,
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
      queryClient.resetQueries({ queryKey: ['comments', 'list', userId] });
    },
  });

  return {
    createComment: createCommentMutation.mutate,
    isPending: createCommentMutation.isPending,
  };
};