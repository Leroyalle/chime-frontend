import { Api } from '@/services/api-client';
import { useQuery } from '@tanstack/react-query';

export const useGetMe = () => {
  return useQuery({
    ...Api.users.getMeQueryOptions(),
  });
};
