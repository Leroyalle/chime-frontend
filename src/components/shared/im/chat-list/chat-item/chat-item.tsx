'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { ChatPreview as Preview } from './chat-preview';
import Link from 'next/link';
import { ChatActions as Actions } from './chat-actions';
import { RoutesEnum } from '../../../../../../@types';

interface Props {
  className?: string;
}

export const ChatItem: React.FC<Props> = ({ className }) => {
  return (
    <div className="relative">
      <Link href={`${RoutesEnum.MESSAGES}/1`} className={cn('w-full select-none', className)}>
        <div className="p-2 hover:bg-gray-100">
          <Preview />
        </div>
      </Link>
      <Actions className="absolute top-2 right-2" />
    </div>
  );
};
