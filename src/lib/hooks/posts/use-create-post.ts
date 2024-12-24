import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const createPostMutation = useMutation({
    mutationFn: Api.posts.createPost,
    onSettled: () => {
      queryClient.resetQueries(Api.posts.getAllPostsInfinityQueryOptions());
    },
  });

  return { createPost: createPostMutation.mutate, isPending: createPostMutation.isPending };
};
