import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  className?: string;
}

export const Line: React.FC<Props> = ({ className }) => {
  return <div className={cn('my-2 w-full h-[0.1px] backdrop-brightness-200', className)} />;
};
