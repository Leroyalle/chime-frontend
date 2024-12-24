import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Cookies from 'js-cookie';

export const useReactQuerySubscription = () => {
  const token = Cookies.get('jwtToken');
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_SOCKET_API_URL, {
      auth: { token },
    });

    socket.current.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    socket.current.on('checkData', () => {
      console.log('checked');
    });

    socket.current.on('loadMessages', (data) => {
      console.log(data);
    });

    socket.current.on('message', (newMessage) => {
      console.log(newMessage);
      console.log('connect message');
    });

    socket.current.on('unauthorized', (message) => {
      console.log('Authorization error:', message);
      alert(message);
    });

    socket.current.emit('checkData');
    socket.current.emit('loadMessages');
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [token]);
};
