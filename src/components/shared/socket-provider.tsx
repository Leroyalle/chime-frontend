import Cookies from 'js-cookie';
import { Api } from '@/services/api-client';
import { ChatUpdate, MessageRequest, UserChat } from '../../../@types/chat';
import { createContext, useEffect, useRef, ReactNode, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useNewMarkSlice } from '@/store';
import { RoutesEnum } from '../../../@types';
import { toast } from 'react-toastify';
import { ToastMessage } from './chat/toast-message';

type SocketContextType = {
  send: (message: MessageRequest) => void;
  createChat: (data: { recipientId: string }) => void;
  broadcastNewPost: VoidFunction;
  deleteMessage: (data: { messageId: string }) => void;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const socket = useRef<Socket | null>(null);
  const token = Cookies.get('jwtToken');
  const { setNewMark } = useNewMarkSlice();
  const pathname = usePathname();

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

    socket.current.on('post:new', (value: boolean) => {
      setNewMark(value);
    });

    socket.current.on('checkData', (data: UserChat[]) => {
      queryClient.setQueryData(Api.chat.getUserChatsQueryOptions().queryKey, (old) => {
        if (!old) {
          return undefined;
        }
        return data;
      });
    });

    socket.current.on('chat:create', (id: string) => {
      if (id) {
        router.push(`/im/${id}`);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [queryClient, router, token, setNewMark]);

  useEffect(() => {
    if (!socket.current) return;

    const handleNewMessage = (data: ChatUpdate) => {
      console.log('PATHNAME HOOK:', pathname);
      console.log(`${RoutesEnum.MESSAGES}/${data.chatId}`);
      if (pathname !== `${RoutesEnum.MESSAGES}/${data.chatId}`) {
        toast.info(<ToastMessage chatId={data.chatId} senderName={data.senderName} />, {
          onClick() {
            router.push(`${RoutesEnum.MESSAGES}/${data.chatId}`);
          },
        });
      }

      queryClient.setQueryData(
        Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chatId).queryKey,
        (old) => {
          if (!old) return undefined;

          const updatedData = { ...old, pages: old.pages.map((page) => ({ ...page })) };
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
    };

    const handleDeleteMessage = (data: { chatId: string; messageId: string }) => {
      console.log('delete message');

      queryClient.setQueryData(
        Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chatId).queryKey,
        (old) => {
          if (!old) return undefined;

          const updatedData = {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.filter((message) => message.id !== data.messageId),
            })),
          };

          updatedData.pages = updatedData.pages.map((page) => ({
            ...page,
            totalItems: page.data.length,
          }));

          return updatedData;
        },
      );
    };

    socket.current.on('messages:get', handleNewMessage);
    socket.current.on('message:delete', handleDeleteMessage);

    return () => {
      if (socket.current) {
        socket.current.off('messages:get', handleNewMessage);
        socket.current.off('message:delete', handleDeleteMessage);
      }
    };
  }, [pathname, queryClient, router]);

  const send = useCallback((message: MessageRequest) => {
    socket.current?.emit('messages:post', message);
  }, []);

  const createChat = useCallback((data: { recipientId: string }) => {
    socket.current?.emit('chat:create', data);
  }, []);

  const broadcastNewPost = useCallback(() => {
    socket.current?.emit('post:new', true);
  }, []);

  const deleteMessage = useCallback((data: { messageId: string }) => {
    socket.current?.emit('messages:delete', data);
  }, []);

  return (
    <SocketContext.Provider value={{ send, createChat, broadcastNewPost, deleteMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
