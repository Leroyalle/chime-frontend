import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

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
        if (!old) {
          return undefined;
        }
        return {
          ...old,
          user: { ...old.user, isFollowing: true, followerCount: old.user.followerCount + 1 },
        };
      });

      return { previousData };
    },

    onSettled: () => {
      queryClient.resetQueries(Api.follow.getFollowersInfinityQueryOptions(followingId));
      queryClient.resetQueries(Api.follow.getFriendsInfinityQueryOptions(followingId));
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
