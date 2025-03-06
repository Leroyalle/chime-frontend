import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { RoutesEnum, ChatUpdate } from '@/types';

export const useMessageNotifications = (
  pathNameRef: { current: string },
  me?: { user: { id: string } },
) => {
  const router = useRouter();

  const showNewMessageNotification = (data: ChatUpdate) => {
    const isPathMatch = pathNameRef.current === `${RoutesEnum.MESSAGES}/${data.chat.id}`;

    if (me?.user.id !== data.message.UserBase.id && !isPathMatch) {
      toast(data.message.UserBase.name, {
        description: data.message.content,
        action: {
          label: 'Читать',
          onClick: () => router.push(`${RoutesEnum.MESSAGES}/${data.chat.id}`),
        },
      });
    }
  };

  return { showNewMessageNotification };
};
