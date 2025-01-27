import { SocketContext } from '@/components/shared/providers/socket-provider';
import { useContext } from 'react';

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('cannot find SocketContext');
  }
  return context;
};
