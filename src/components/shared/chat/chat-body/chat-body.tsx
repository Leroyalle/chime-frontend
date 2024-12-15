import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const ChatBody: React.FC<Props> = ({ className }) => {
  return <div className={cn('w-full', className)}></div>;
};
