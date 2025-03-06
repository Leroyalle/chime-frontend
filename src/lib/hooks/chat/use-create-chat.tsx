import { Api } from '@/services/api-client';
import { useRouter } from 'next/navigation';
import { RoutesEnum } from '../../../types';
import { hasErrorField } from '@/lib/utils/shared/has-error-field';
import { toast } from 'sonner';
import { useMutation } from '@tanstack/react-query';

export const useCreateChat = () => {
  const router = useRouter();
  const createChatMutation = useMutation({
    mutationFn: ({ recipientId }: { recipientId: string }) => Api.chat.getChatId(recipientId),
    onSuccess: ({ chatId }) => {
      router.push(`${RoutesEnum.MESSAGES}/${chatId}`);
    },
    onError: (error) => {
      if (hasErrorField(error)) {
        toast.error('Не удалось найти чат', {
          description: 'Попробуйте еще раз',
        });
      }
    },
  });

  return {
    createChat: createChatMutation.mutate,
    isPending: createChatMutation.isPending,
    isError: createChatMutation.isError,
  };
};
