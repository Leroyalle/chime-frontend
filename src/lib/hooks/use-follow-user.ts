import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useFollowUser = (followingId: string) => {
  const queryClient = useQueryClient();
  const followUserMutation = useMutation({
    mutationFn: () => Api.follow.followUser({ followingId }),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['user'] });

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

    onError: (_, __, context) => {
      queryClient.setQueryData(
        Api.users.getUserQueryOptions(followingId).queryKey,
        context?.previousData,
      );
    },

    onSettled: () => {
      queryClient.resetQueries({ queryKey: ['following', followingId] });
    },
  });

  return {
    followUser: followUserMutation.mutate,
    isPending: followUserMutation.isPending,
  };
};
