import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  icon: React.ReactNode;
  count: number;
  className?: string;
}

export const PostBottomActionsItem: React.FC<Props> = ({ icon, count, className }) => {
  return (
    <button
      className={cn(
        'flex items-center bg-gray-100 gap-x-1 py-1 px-3 rounded-xl text-md',
        className,
      )}>
      {icon} {count > 0 && <span>{count}</span>}
    </button>
  );
};
