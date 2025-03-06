'use client';
import Cookies from 'js-cookie';
import { useEffect, useRef, ReactNode, useCallback, memo } from 'react';
import { io, Socket } from 'socket.io-client';
import { usePathname } from 'next/navigation';
import { useNewMarkSlice } from '@/store';
import { SocketEventsEnum, TokensEnum } from '@/types';
import { useGetMe, useMessageActions, useMessageHandlers } from '@/lib/hooks';
import { SocketContext } from '@/lib/utils';

export const SocketProvider = memo(function SocketProvider({ children }: { children: ReactNode }) {
  const { data: me } = useGetMe();
  const socket = useRef<Socket | null>(null);
  const token = Cookies.get(TokensEnum.JWT);
  const { setNewMark } = useNewMarkSlice();
  const pathName = usePathname();
  const pathNameRef = useRef(pathName);
  const { handleNewMessage, handleUpdateMessage, handleDeleteMessage } = useMessageHandlers(
    pathNameRef,
    me,
  );
  const { sendMessage, updateMessage, deleteMessage } = useMessageActions(socket);

  useEffect(() => {
    pathNameRef.current = pathName;
  }, [pathName]);

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

  const broadcastNewPost = useCallback(() => {
    socket.current?.emit(SocketEventsEnum.POST_NEW, true);
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, broadcastNewPost, deleteMessage, updateMessage }}>
      {children}
    </SocketContext.Provider>
  );
});
