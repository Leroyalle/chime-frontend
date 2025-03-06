import { MessageRequest, SocketEventsEnum } from '@/types';
import { MutableRefObject, useCallback } from 'react';
import { Socket } from 'socket.io-client';

export const useMessageActions = (socket: MutableRefObject<Socket | null>) => {
  const sendMessage = useCallback((message: MessageRequest) => {
    socket.current?.emit(SocketEventsEnum.MESSAGES_POST, message);
  }, []);

  const deleteMessage = useCallback((data: { messageId: string }) => {
    socket.current?.emit(SocketEventsEnum.MESSAGES_DELETE, data);
  }, []);

  const updateMessage = useCallback((data: { messageId: string; messageBody: string }) => {
    socket.current?.emit(SocketEventsEnum.MESSAGES_UPDATE, data);
  }, []);

  return {
    sendMessage,
    deleteMessage,
    updateMessage,
  };
};
