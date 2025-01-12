'use client';
import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  icon: React.ReactNode;
  count?: number;
  onClick?: VoidFunction;
  loading?: boolean;
  className?: string;
}

export const PostBottomActionsItem: React.FC<Props> = ({
  icon,
  count,
  onClick,
  loading,
  className,
}) => {
  return (
    <button
      disabled={loading}
      onClick={onClick}
      className={cn(
        'flex text-foreground items-center gap-x-1 py-1 px-3 rounded-xl text-md',
        className,
      )}>
      {icon} {count && count > 0 ? <span className="text-xs">{count}</span> : null}
    </button>
  );
};
