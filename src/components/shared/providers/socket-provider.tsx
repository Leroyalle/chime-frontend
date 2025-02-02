'use client';
import Cookies from 'js-cookie';
import { Api } from '@/services/api-client';
import { createContext, useEffect, useRef, ReactNode, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';
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

type SocketContextType = {
  sendMessage: (message: MessageRequest) => void;
  broadcastNewPost: VoidFunction;
  deleteMessage: (data: { messageId: string }) => void;
  updateMessage: (data: { messageId: string; messageBody: string }) => void;
};

export const SocketContext = createContext<SocketContextType | null>(null);

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const { data: me } = useGetMe();
  const router = useRouter();
  const socket = useRef<Socket | null>(null);
  const token = Cookies.get(TokensEnum.JWT);
  const { setNewMark } = useNewMarkSlice();

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_API_URL, {
      auth: { token },
    });

    socket.current.on(SocketEventsEnum.CONNECT, () => {
      console.log('Connected to WebSocket');
      console.log('Socket ID:', socket.current?.id);
    });

    socket.current.on(SocketEventsEnum.UNAUTHORIZED, (message) => {
      console.log('Authorization error:', message);
      alert(message);
    });

    socket.current.on(SocketEventsEnum.POST_NEW, (value: boolean) => {
      setNewMark(value);
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [queryClient, token, setNewMark]);

  useEffect(() => {
    if (!socket.current) {
      return undefined;
    }

    const handleNewMessage = (data: ChatUpdate) => {
      if (me?.user.id !== data.message.UserBase.id) {
        toast(data.message.UserBase.name, {
          description: data.message.content,
          action: {
            label: 'Читать',
            onClick: () => router.push(`${RoutesEnum.MESSAGES}/${data.chat.id}`),
          },
        });
      }

      queryClient.setQueriesData({ queryKey: ['user-chats'] }, (old?: UserChat[]) => {
        if (!old) {
          queryClient.invalidateQueries(Api.chat.getUserChatsQueryOptions());
          return old;
        }

        const updatedChats = old.map((chat) => {
          if (chat.id === data.chat.id) {
            return { ...chat, lastMessage: data.message };
          }
          return chat;
        });

        const existingChat = updatedChats.find((chat) => chat.id === data.chat.id);
        if (!existingChat) {
          updatedChats.push({ ...data.chat, lastMessage: data.message });
        }

        return updatedChats.sort((a, b) => {
          const aDate = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
          const bDate = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
          return bDate - aDate;
        });
      });

      queryClient.setQueryData(
        Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chat.id).queryKey,
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

    const handleUpdateMessage = (data: ChatUpdate) => {
      queryClient.setQueryData(
        Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chat.id).queryKey,
        (old) => {
          if (!old) {
            return undefined;
          }
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

      queryClient.setQueriesData({ queryKey: ['user-chats'] }, (old?: UserChat[]) => {
        if (!old) {
          return undefined;
        }

        const updatedChats = old.map((chat) => {
          if (chat.id === data.chat.id) {
            return { ...chat, lastMessage: data.chat.lastMessage };
          }
          return chat;
        });

        const existingChat = updatedChats.find((chat) => chat.id === data.chat.id);
        if (!existingChat) {
          updatedChats.push({ ...data.chat, lastMessage: data.message });
        }

        return updatedChats.sort((a, b) => {
          const aDate = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
          const bDate = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
          return bDate - aDate;
        });
      });
    };

    const handleDeleteMessage = (data: ChatUpdate) => {
      queryClient.setQueryData(
        Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chat.id).queryKey,
        (old) => {
          if (!old) {
            return undefined;
          }

          const updatedData = {
            ...old,
            pages: old.pages.map((page) => ({
              ...page,
              data: page.data.filter((message) => message.id !== data.message.id),
            })),
          };

          updatedData.pages = updatedData.pages.map((page) => ({
            ...page,
            totalItems: page.data.length,
          }));

          return updatedData;
        },
      );

      queryClient.setQueriesData({ queryKey: ['user-chats'] }, (old?: UserChat[]) => {
        if (!old) {
          return undefined;
        }

        const updatedChats = old.map((chat) => {
          if (chat.id === data.chat.id) {
            return { ...chat, lastMessage: data.chat.lastMessage };
          }
          return chat;
        });

        const existingChat = updatedChats.find((chat) => chat.id === data.chat.id);
        if (!existingChat) {
          updatedChats.push({ ...data.chat, lastMessage: data.chat.lastMessage });
        }

        return updatedChats.sort((a, b) => {
          const aDate = a.lastMessage ? new Date(a.lastMessage.createdAt).getTime() : 0;
          const bDate = b.lastMessage ? new Date(b.lastMessage.createdAt).getTime() : 0;
          return bDate - aDate;
        });
      });
    };

    socket.current.on(SocketEventsEnum.MESSAGES_GET, handleNewMessage);
    socket.current.on(SocketEventsEnum.MESSAGES_DELETE, handleDeleteMessage);
    socket.current.on(SocketEventsEnum.MESSAGES_UPDATE, handleUpdateMessage);

    return () => {
      if (socket.current) {
        socket.current.off(SocketEventsEnum.MESSAGES_GET, handleNewMessage);
        socket.current.off(SocketEventsEnum.MESSAGES_DELETE, handleDeleteMessage);
      }
    };
  }, [queryClient]);

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
};
