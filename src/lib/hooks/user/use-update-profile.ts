import { Api } from '@/services/api-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useUpdateProfile = (id: string) => {
  const queryClient = useQueryClient();
  const updateProfileMutation = useMutation({
    mutationFn: Api.users.updateUser,
    onSettled: () => {
      queryClient.invalidateQueries(Api.users.getUserQueryOptions(id));
      queryClient.invalidateQueries(Api.users.getMeQueryOptions());
    },
  });

  return {
    updateProfile: updateProfileMutation.mutate,
    isPending: updateProfileMutation.isPending,
  };
};
