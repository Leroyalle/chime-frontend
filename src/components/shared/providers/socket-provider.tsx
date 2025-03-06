'use client';
import Cookies from 'js-cookie';
import { Api } from '@/services/api-client';
import { createContext, useEffect, useRef, ReactNode, useCallback, memo } from 'react';
import { io, Socket } from 'socket.io-client';
import { usePathname, useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useNewMarkSlice } from '@/store';
import { toast } from 'sonner';
import {
  ChatUpdate,
  MessageRequest,
  UserChat,
  RoutesEnum,
  SocketEventsEnum,
  TokensEnum,
} from '@/types';
import { useGetMe } from '@/lib/hooks';
import { updateAndSortChats } from '@/lib/utils';

type SocketContextType = {
  sendMessage: (message: MessageRequest) => void;
  broadcastNewPost: VoidFunction;
  deleteMessage: (data: { messageId: string }) => void;
  updateMessage: (data: { messageId: string; messageBody: string }) => void;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = memo(function SocketProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  const { data: me } = useGetMe();
  const router = useRouter();
  const socket = useRef<Socket | null>(null);
  const token = Cookies.get(TokensEnum.JWT);
  const { setNewMark } = useNewMarkSlice();
  const pathName = usePathname();
  const pathNameRef = useRef(pathName);

  useEffect(() => {
    pathNameRef.current = pathName;
  }, [pathName]);

  const handleNewMessage = (data: ChatUpdate) => {
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

    queryClient.setQueriesData({ queryKey: ['user-chats'] }, (old?: UserChat[]) =>
      updateAndSortChats(old, data.chat, data.message),
    );

    queryClient.setQueryData(
      Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chat.id).queryKey,
      (old) => {
        if (!old) return undefined;

        const newPages = old.pages.map((page, index) => {
          if (index === 0) {
            return {
              ...page,
              data: [data.message, ...page.data],
            };
          }
          return { ...page };
        });

        return {
          ...old,
          pages: newPages,
        };
      },
    );
  };

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

    const handleUpdateMessage = (data: ChatUpdate) => {
      queryClient.setQueryData(
        Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chat.id).queryKey,
        (old) => {
          if (!old) return undefined;
          const updatedData = {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.map((m) => (m.id === data.message.id ? data.message : m)),
            })),
          };
          return updatedData;
        },
      );

      queryClient.setQueriesData({ queryKey: ['user-chats'] }, (old?: UserChat[]) =>
        updateAndSortChats(old, data.chat, data.message, 'updated', data.chat.lastMessage),
      );
    };

    const handleDeleteMessage = (data: ChatUpdate) => {
      queryClient.setQueryData(
        Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chat.id).queryKey,
        (old) => {
          if (!old) return old;

          return {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.filter((message) => message.id !== data.message.id),
            })),
          };
        },
      );

      queryClient.setQueriesData({ queryKey: ['user-chats'] }, (old?: UserChat[]) =>
        updateAndSortChats(old, data.chat, data.chat.lastMessage),
      );
    };

    socket.current.on(SocketEventsEnum.MESSAGES_GET, handleNewMessage);
    socket.current.on(SocketEventsEnum.MESSAGES_DELETE, handleDeleteMessage);
    socket.current.on(SocketEventsEnum.MESSAGES_UPDATE, handleUpdateMessage);

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log('Disconnected from WebSocket');
      }
    };
  }, [token]);

  const sendMessage = useCallback((message: MessageRequest) => {
    socket.current?.emit(SocketEventsEnum.MESSAGES_POST, message);
  }, []);

  const broadcastNewPost = useCallback(() => {
    socket.current?.emit(SocketEventsEnum.POST_NEW, true);
  }, []);

  const deleteMessage = useCallback((data: { messageId: string }) => {
    socket.current?.emit(SocketEventsEnum.MESSAGES_DELETE, data);
  }, []);

  const updateMessage = useCallback((data: { messageId: string; messageBody: string }) => {
    socket.current?.emit(SocketEventsEnum.MESSAGES_UPDATE, data);
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, broadcastNewPost, deleteMessage, updateMessage }}>
      {children}
    </SocketContext.Provider>
  );
});
