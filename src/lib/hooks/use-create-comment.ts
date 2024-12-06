import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateComment = (postId: string) => {
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

      return { previousData };
    },

    onSettled: () => {
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
    },
  });

  return {
    createComment: createCommentMutation.mutate,
    isPending: createCommentMutation.isPending,
  };
};
