import { Api } from '@/services/api-client';
import { useQueryClient } from '@tanstack/react-query';

export const useGetMeData = () => {
  const queryClient = useQueryClient();
  const me = queryClient.getQueryData(Api.users.getMeQueryOptions().queryKey);

  return me;
};
