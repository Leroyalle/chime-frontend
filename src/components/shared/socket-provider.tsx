import Cookies from 'js-cookie';
import { Api } from '@/services/api-client';
import { ChatUpdate, MessageRequest, UserChat } from '../../../@types/chat';
import { createContext, useEffect, useRef, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
import { useNewMarkSlice } from '@/store';
import { pages } from 'next/dist/build/templates/app-page';
import { RoutesEnum } from '../../../@types';
import { toast } from 'react-toastify';
import { cursorTo } from 'readline';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Message } from 'postcss';

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

    socket.current.on('messages:get', (data: ChatUpdate) => {

      console.log(data)

      //show notification if user not in chat
      if (window.location.pathname !== `${RoutesEnum.MESSAGES}/${data.chatId}`) {
        toast.info(
          (
            <div className="flex flex-col gap-2">
              <p className="text-sm font-medium text-gray-700">New message from:</p>
              <p
                className="text-blue-500 font-bold cursor-pointer"
                onClick={() => {
                  window.location.pathname = `/im/${data.chatId}`;
                }}
              >
                {data.senderName}
              </p>
            </div>
          )
        )
      }

      // ___


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


    socket.current.on('message:delete', (data: { chatId: string; messageId: string }) => {
      console.log("delete message")


      //FIXME delete message for client by socket
      queryClient.setQueryData(
        Api.chat.getMessagesByChatIdInfinityQueryOptions(data.chatId).queryKey,
        (old) => {
          if (!old) return undefined


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
          }))

          return updatedData
        }
      );


      
    });



    // socket.current.sheckMessage

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

  const broadcastNewPost = () => {
    socket.current?.emit('post:new', true);
  };

  const deleteMessage = (data: { messageId: string }) => {
    socket.current?.emit('messages:delete', data);
  }

  return (
    <SocketContext.Provider value={{ send, createChat, broadcastNewPost, deleteMessage }}>
      {children}
    </SocketContext.Provider>
  );
};
