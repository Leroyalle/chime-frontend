import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';
import { Message } from '../../../@types/newDto';
import { Api } from '@/services/api-client';

interface ChatUpdate {
  chatId: string;
  message: Message;
}

export const useReactQuerySubscription = () => {
  const queryClient = useQueryClient();
  const token = Cookies.get('jwtToken');
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_API_URL, {
      auth: { token },
    });

    socket.current.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.current.on('checkData', () => {
      console.log('checked');
    });

    socket.current.on('loadMessages', (data) => {
      console.log(data);
    });

    socket.current.on('message', (newMessage) => {
      console.log(newMessage);
      console.log('connect message');
    });

    socket.current.on('unauthorized', (message) => {
      console.log('Authorization error:', message);
      alert(message);
    });

    socket.current.on('messages:get', (data: ChatUpdate) => {
      queryClient.setQueryData(
        Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chatId).queryKey,
        (old) => {
          if (!old) {
            return undefined;
          }

          const updatedData = {
            ...old,
            pages: old.pages.map((page) => ({ ...page })),
          };

          const lastPage = updatedData.pages[updatedData.pages.length - 1];

          if (lastPage) {
            lastPage.data.push(data.message);
            lastPage.totalItems += 1;
          } else {
            updatedData.pages.push({
              data: [data.message],
              totalPages: 1,
              totalItems: 1,
            });
          }

          return updatedData;
        },
      );
    });

    socket.current.emit('checkData');
    socket.current.emit('loadMessages');
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [queryClient]);

  const send = (message: Message) => {
    socket.current?.emit('messages:post', message);
  };

  return send;
};
