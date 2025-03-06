import { useEffect } from 'react';
import { Socket } from 'socket.io-client';
import { ChatUpdate, SocketEventsEnum } from '@/types';

export const useSocketEvents = (
  socketRef: { current: Socket | null },
  handlers: {
    handleNewMessage: (data: ChatUpdate) => void;
    handleDeleteMessage: (data: ChatUpdate) => void;
    handleUpdateMessage: (data: ChatUpdate) => void;
    setNewMark: (value: boolean) => void;
  },
) => {
  useEffect(() => {
    const socket = socketRef.current;
    if (!socket) return;

    socket.on(SocketEventsEnum.CONNECT, () => {
      console.log('Connected to WebSocket');
    });

    socket.on(SocketEventsEnum.UNAUTHORIZED, (message) => {
      console.log('Authorization error:', message);
      alert(message);
    });

    socket.on(SocketEventsEnum.POST_NEW, handlers.setNewMark);
    socket.on(SocketEventsEnum.MESSAGES_GET, handlers.handleNewMessage);
    socket.on(SocketEventsEnum.MESSAGES_DELETE, handlers.handleDeleteMessage);
    socket.on(SocketEventsEnum.MESSAGES_UPDATE, handlers.handleUpdateMessage);

    return () => {
      socket.off(SocketEventsEnum.CONNECT);
      socket.off(SocketEventsEnum.UNAUTHORIZED);
      socket.off(SocketEventsEnum.POST_NEW);
      socket.off(SocketEventsEnum.MESSAGES_GET);
      socket.off(SocketEventsEnum.MESSAGES_DELETE);
      socket.off(SocketEventsEnum.MESSAGES_UPDATE);
    };
  }, [socketRef.current, handlers]);
};
