import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSocket } from '../socket/use-socket';

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  const { broadcastNewPost } = useSocket();

  const createPostMutation = useMutation({
    mutationFn: Api.posts.createPost,
    onSettled: () => {
      queryClient.resetQueries(Api.posts.getAllPostsInfinityQueryOptions());
      queryClient.resetQueries(Api.posts.getAllPopularPostsInfinityQueryOptions());
    },

    onSuccess: () => {
      broadcastNewPost();
    },
  });

  return { createPost: createPostMutation.mutate, isPending: createPostMutation.isPending };
};
