import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { toggleUserFollow } from './lib';

export const useFollowUser = (followingId: string) => {
  const queryClient = useQueryClient();
  const followUserMutation = useMutation({
    mutationFn: () => Api.follow.followUser({ followingId }),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['followers'] });

      const previousData = queryClient.getQueryData(
        Api.users.getUserQueryOptions(followingId).queryKey,
      );

      queryClient.setQueryData(Api.users.getUserQueryOptions(followingId).queryKey, (old) => {
        return toggleUserFollow(old, 'follow');
      });

      return { previousData };
    },

    onSettled: () => {
      queryClient.resetQueries(Api.follow.getFollowersInfinityQueryOptions(followingId));
      queryClient.resetQueries(Api.follow.getFriendsInfinityQueryOptions(followingId));
      queryClient.invalidateQueries(Api.users.getMeQueryOptions());
    },

    onError: (error, __, context) => {
      queryClient.setQueryData(
        Api.users.getUserQueryOptions(followingId).queryKey,
        context?.previousData,
      );
      toast.error('Не удалось подписаться');
    },
  });

  return {
    followUser: followUserMutation.mutate,
    isPending: followUserMutation.isPending,
  };
};
