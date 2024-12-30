import Cookies from 'js-cookie';
import { Api } from '@/services/api-client';
import { ChatUpdate, MessageRequest, UserChat } from '../../../@types/chat';
import { createContext, useEffect, useRef, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

type SocketContextType = {
  send: (message: MessageRequest) => void;
  createChat: (data: { recipientId: string }) => void;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const socket = useRef<Socket | null>(null);
  const token = Cookies.get('jwtToken');

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_API_URL, {
      auth: { token },
    });

    socket.current.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.current.on('unauthorized', (message) => {
      console.log('Authorization error:', message);
      alert(message);
    });

    socket.current.on('checkData', (data: UserChat[]) => {
      queryClient.setQueryData(Api.chat.getUserChatsQueryOptions().queryKey, (old) => {
        if (!old) {
          return undefined;
        }
        return data;
      });
    });

    socket.current.on('chat:create', (data: { id: string }) => {
      console.log(data);
      if (data.id) {
        router.push(`/im/${data.id}`);
      }
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

          const lastPage = updatedData.pages[0];

          if (lastPage) {
            lastPage.data.unshift(data.message);
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

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [queryClient, router, token]);

  const send = (message: MessageRequest) => {
    socket.current?.emit('messages:post', message);
  };

  const createChat = (data: { recipientId: string }) => {
    socket.current?.emit('chat:create', data);
  };

  return <SocketContext.Provider value={{ send, createChat }}>{children}</SocketContext.Provider>;
};
