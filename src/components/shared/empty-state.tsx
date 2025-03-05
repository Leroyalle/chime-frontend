import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  title: string;
  text?: string;
  className?: string;
}

export const EmptyState: React.FC<Props> = ({ title, text, className }) => {
  return (
    <div className={cn('w-full h-full flex flex-col items-center justify-center', className)}>
      <h3 className={cn('font-bold text-sm', 'lg:text-lg')}>{title}</h3>
      <p className={cn('text-sm', 'lg:text-sm')}>{text}</p>
    </div>
  );
};
