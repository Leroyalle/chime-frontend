import { useContext } from 'react';
import { SocketContext } from '../../utils';

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('cannot find SocketContext');
  }
  return context;
};
