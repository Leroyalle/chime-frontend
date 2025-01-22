import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { toggleUserFollow } from './lib';

export const useUnFollowUser = (unFollowingId: string) => {
  const queryClient = useQueryClient();
  const unFollowUserMutation = useMutation({
    mutationFn: () => Api.follow.unFollowUser(unFollowingId),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ['followers'] });

      const previousData = queryClient.getQueryData(
        Api.users.getUserQueryOptions(unFollowingId).queryKey,
      );

      queryClient.setQueryData(Api.users.getUserQueryOptions(unFollowingId).queryKey, (old) => {
        return toggleUserFollow(old, 'unFollow');
      });

      return { previousData };
    },

    onError: (error, __, context) => {
      queryClient.setQueryData(
        Api.users.getUserQueryOptions(unFollowingId).queryKey,
        context?.previousData,
      );
      toast.error('Не удалось отписаться', { description: 'Попробуйте позже' });
    },

    onSettled: () => {
      queryClient.resetQueries(Api.follow.getFollowersInfinityQueryOptions(unFollowingId));
      queryClient.resetQueries(Api.follow.getFriendsInfinityQueryOptions(unFollowingId));
      queryClient.invalidateQueries(Api.users.getMeQueryOptions());
    },
  });

  return {
    unFollowUser: unFollowUserMutation.mutate,
    isPending: unFollowUserMutation.isPending,
  };
};
