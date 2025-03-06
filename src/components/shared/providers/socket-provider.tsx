'use client';
import Cookies from 'js-cookie';
import { useEffect, useRef, ReactNode, useCallback, memo, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { useNewMarkSlice } from '@/store';
import { SocketEventsEnum, TokensEnum } from '@/types';
import {
  useGetMe,
  useMessageActions,
  useMessageHandlers,
  useSocketConnection,
  useSocketEvents,
} from '@/lib/hooks';
import { SocketContext } from '@/lib/utils';

export const SocketProvider = memo(function SocketProvider({ children }: { children: ReactNode }) {
  const { data: me } = useGetMe();
  const { setNewMark } = useNewMarkSlice();
  const token = Cookies.get(TokensEnum.JWT);
  const socket = useSocketConnection(token);
  const pathName = usePathname();
  const pathNameRef = useRef(pathName);
  const messageHandlers = useMessageHandlers(pathNameRef, me);
  const { sendMessage, updateMessage, deleteMessage } = useMessageActions(socket);

  useEffect(() => {
    pathNameRef.current = pathName;
  }, [pathName]);

  const socketHandlers = useMemo(
    () => ({
      ...messageHandlers,
      setNewMark,
    }),
    [messageHandlers, setNewMark],
  );

  useSocketEvents(socket, socketHandlers);

  const broadcastNewPost = useCallback(() => {
    socket.current?.emit(SocketEventsEnum.POST_NEW, true);
  }, []);

  return (
    <SocketContext.Provider value={{ sendMessage, broadcastNewPost, deleteMessage, updateMessage }}>
      {children}
    </SocketContext.Provider>
  );
});
