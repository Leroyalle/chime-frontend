import Cookies from 'js-cookie';
import { Api } from '@/services/api-client';
import { ChatUpdate, MessageRequest, UserChat } from '../../../@types/chat';
import { createContext, useEffect, useRef, ReactNode, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useNewMarkSlice } from '@/store';
import { RoutesEnum, SocketEventsEnum, TokensEnum } from '../../../@types';
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
  const token = Cookies.get(TokensEnum.JWT);
  const { setNewMark } = useNewMarkSlice();
  const pathname = usePathname();

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_API_URL, {
      auth: { token },
    });

    socket.current.on(SocketEventsEnum.CONNECT, () => {
      console.log('Connected to WebSocket');
    });

    socket.current.on(SocketEventsEnum.UNAUTHORIZED, (message) => {
      console.log('Authorization error:', message);
      alert(message);
    });

    socket.current.on(SocketEventsEnum.POST_NEW, (value: boolean) => {
      setNewMark(value);
    });

    socket.current.on(SocketEventsEnum.CHECK_DATA, (data: UserChat[]) => {
      queryClient.setQueryData(Api.chat.getUserChatsQueryOptions().queryKey, (old) => {
        if (!old) {
          return undefined;
        }
        return data;
      });
    });

    socket.current.on(SocketEventsEnum.CHAT_CREATE, (id: string) => {
      if (id) {
        router.push(`${RoutesEnum.MESSAGES}/${id}`);
      }
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [queryClient, router, token, setNewMark]);

  useEffect(() => {
    if (!socket.current) {
      return undefined;
    }

    const handleNewMessage = (data: ChatUpdate) => {
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

    socket.current.on(SocketEventsEnum.MESSAGES_GET, handleNewMessage);
    socket.current.on(SocketEventsEnum.MESSAGE_DELETE, handleDeleteMessage);

    return () => {
      if (socket.current) {
        socket.current.off(SocketEventsEnum.MESSAGES_GET, handleNewMessage);
        socket.current.off(SocketEventsEnum.MESSAGE_DELETE, handleDeleteMessage);
      }
    };
  }, [pathname, queryClient, router]);

  const send = useCallback((message: MessageRequest) => {
    socket.current?.emit(SocketEventsEnum.MESSAGES_POST, message);
  }, []);

  const createChat = useCallback((data: { recipientId: string }) => {
    socket.current?.emit(SocketEventsEnum.CHAT_CREATE, data);
  }, []);

  const broadcastNewPost = useCallback(() => {
    socket.current?.emit(SocketEventsEnum.POST_NEW, true);
  }, []);

  const deleteMessage = useCallback((data: { messageId: string }) => {
    socket.current?.emit(SocketEventsEnum.MESSAGE_DELETE, data);
  }, []);

  return (
    <SocketContext.Provider value={{ send, createChat, broadcastNewPost, deleteMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
