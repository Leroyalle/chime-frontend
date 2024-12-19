import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ContentTabs } from './content-tabs';
import { RoutesEnum } from '../../../../../@types';

interface Props {
  name: string;
  date: string;
  about: string | null;
  followersCount: number;
  followingsCount: number;
  className?: string;
}

export const UserInfo: React.FC<Props> = ({
  name,
  date,
  about,
  followersCount,
  followingsCount,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-y-2', className)}>
      <p className="font-bold text-2xl">{name}</p>
      <p className="text-gray-500">{date}</p>
      {about && <p>{about}</p>}
      <div className="flex flex-wrap gap-x-2">
        <Link href={RoutesEnum.FOLLOWERS}>
          <span className="font-bold">{followersCount}</span> подписчиков
        </Link>
        <Link href={RoutesEnum.FOLLOWING}>
          <span className="font-bold">{followingsCount}</span> подписки
        </Link>
      </div>
      <ContentTabs />
    </div>
  );
};
