import React from 'react';
import { cn } from '@/lib/utils';
import { RoutesEnum } from '../../../../../../../../@types';
import Link from 'next/link';

interface Props {
  userId: string;
  author: string;
  content: string | null;
  className?: string;
}

export const MessageMainContent: React.FC<Props> = ({ userId, author, content, className }) => {
  return (
    <div className={cn('flex flex-col justify-center', className)}>
      <Link href={`${RoutesEnum.USER}/${userId}`} className="text-blue-700 font-semibold w-fit">
        {author}
      </Link>
      <p>{content}</p>
    </div>
  );
};
