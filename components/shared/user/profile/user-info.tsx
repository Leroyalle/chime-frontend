import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ContentTabs } from './content-tabs';

interface Props {
  className?: string;
}

export const UserInfo: React.FC<Props> = ({ className }) => {
  return (
    <div className={cn('flex flex-col gap-y-2', className)}>
      <p className="font-bold text-2xl">Николай Мелонов</p>
      <p className="text-gray-500">с 14.02.2005</p>
      <p>Frontend Developer</p>
      <div className="flex flew-wrap gap-x-2">
        <Link href={'/followers'}>
          <span className="font-bold">18</span> подписчиков
        </Link>
        <Link href={'/following'}>
          <span className="font-bold">3</span> подписки
        </Link>
      </div>
      <ContentTabs />
    </div>
  );
};
