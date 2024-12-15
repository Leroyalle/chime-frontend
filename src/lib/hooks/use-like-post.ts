import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLikePost = (postId: string) => {
  const queryClient = useQueryClient();
  const likePost = useMutation({
    mutationFn: () => Api.likes.likePost({ postId }),
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
              post.id === postId
                ? { ...post, isLiked: true, likesCount: post.likesCount + 1 }
                : post,
            ),
          })),
        };
      });
      return { previousData };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(['posts', 'post'], context?.previousData);
    },
    onSettled: () => {
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
    },
  });

  return {
    likePost: likePost.mutate,
    isPending: likePost.isPending,
  };
};
