import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';

export const useSocketConnection = (token: string | undefined) => {
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_API_URL, {
      auth: { token },
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
        console.log('Disconnected from WebSocket');
      }
    };
  }, [token]);

  return socket;
};
