import React from 'react';
import { cn } from '@/lib/utils';

interface Props {
  content: string;
  className?: string;
}

export const PostContent: React.FC<Props> = ({ content, className }) => {
  return (
    <div className={cn('', className)}>
      <p className="break-words break-all">{content}</p>
    </div>
  );
};
