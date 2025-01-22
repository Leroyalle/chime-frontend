import { Api } from '@/services/api-client';
import { useRouter } from 'next/navigation';
import { RoutesEnum } from '../../../types';
import { hasErrorField } from '@/lib/utils/has-error-field';
import { toast } from 'react-toastify';
import { useState } from 'react';

export const useCreateChat = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleCreateChat = async ({ recipientId }: { recipientId: string }) => {
    try {
      setIsLoading(true);
      const { chatId } = await Api.chat.getChatId(recipientId);
      router.push(`${RoutesEnum.MESSAGES}/${chatId}`);
    } catch (error) {
      if (hasErrorField(error)) {
        toast.error('Не удалось найти чат');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { createChat: handleCreateChat, isLoading };
};
