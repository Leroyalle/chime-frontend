'use client';

import { MessageRequest } from '@/types';
import { createContext } from 'react';

type SocketContextType = {
  sendMessage: (message: MessageRequest) => void;
  broadcastNewPost: VoidFunction;
  deleteMessage: (data: { messageId: string }) => void;
  updateMessage: (data: { messageId: string; messageBody: string }) => void;
};

export const SocketContext = createContext<SocketContextType | null>(null);
