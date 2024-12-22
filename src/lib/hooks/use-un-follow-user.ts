import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUnFollowUser = (unFollowingId: string) => {
  const queryClient = useQueryClient();
  const unFollowUserMutation = useMutation({
    mutationFn: () => Api.follow.unFollowUser(unFollowingId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['user'] });

      const previousData = queryClient.getQueryData(
        Api.users.getUserQueryOptions(unFollowingId).queryKey,
      );

      queryClient.setQueryData(Api.users.getUserQueryOptions(unFollowingId).queryKey, (old) => {
        if (!old) {
          return undefined;
        }
        return {
          ...old,
          user: { ...old.user, isFollowing: false, followerCount: old.user.followerCount - 1 },
        };
      });

      return { previousData };
    },

    onError: (_, __, context) => {
      queryClient.setQueryData(
        Api.users.getUserQueryOptions(unFollowingId).queryKey,
        context?.previousData,
      );
    },

    onSettled: () => {
      queryClient.resetQueries({ queryKey: ['followers', unFollowingId] });
    },
  });

  return {
    unFollowUser: unFollowUserMutation.mutate,
    isPending: unFollowUserMutation.isPending,
  };
};
