import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';

export const useDeletePost = (postId: string) => {
  const queryClient = useQueryClient();
  const pathname = usePathname();
  const router = useRouter();

  const deletePostMutation = useMutation({
    mutationFn: () => Api.posts.deletePost(postId),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: ['posts'],
      });

      const previousData = queryClient.getQueryData({
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
            data: page.data.filter((p) => p.id !== postId),
          })),
        };
      });

      return { previousData };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        Api.posts.getAllPostsInfinityQueryOptions().queryKey,
        context?.previousData,
      );
    },

    onSuccess: () => {
      if (pathname.includes('post/')) {
        router.back();
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries(Api.posts.getPostByIdQueryOptions(postId));
    },
  });

  return { deletePost: deletePostMutation.mutate, isPending: deletePostMutation.isPending };
};
