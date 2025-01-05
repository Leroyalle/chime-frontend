import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { ContentTabs } from './content-tabs';
import { RoutesEnum } from '../../../../../@types';
import dayjs from 'dayjs';

interface Props {
  userId: string;
  name: string;
  date: string;
  about: string | null;
  followerCount: number;
  followingCount: number;
  className?: string;
}

export const UserInfo: React.FC<Props> = ({
  userId,
  name,
  date,
  about,
  followerCount,
  followingCount,
  className,
}) => {
  return (
    <div className={cn('flex flex-col gap-y-2', className)}>
      <p className="font-bold text-2xl">{name}</p>
      <p className="text-gray-500">На сайте с {dayjs(date).format('DD.MM.YYYY')}</p>
      {about && <p>{about}</p>}
      <div className="flex flex-wrap gap-x-2">
        <Link href={`${RoutesEnum.USER}/${userId}${RoutesEnum.FOLLOWERS}`}>
          <span className="font-bold">{followerCount}</span> подписчиков
        </Link>
        <Link href={`${RoutesEnum.USER}/${userId}${RoutesEnum.FOLLOWING}`}>
          <span className="font-bold">{followingCount}</span> подписки
        </Link>
      </div>
      <ContentTabs userId={userId} />
    </div>
  );
};
