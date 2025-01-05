import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSocket } from '../use-socket';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { broadcastNewPost } = useSocket();

  const createPostMutation = useMutation({
    mutationFn: Api.posts.createPost,
    onSettled: () => {
      queryClient.resetQueries(Api.posts.getAllPostsInfinityQueryOptions());
    },

    onSuccess: () => {
      broadcastNewPost();
    },
  });

  return { createPost: createPostMutation.mutate, isPending: createPostMutation.isPending };
};
