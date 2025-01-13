'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { useGetMe } from '@/lib/hooks';
import { Avatar } from '../ui';
import Link from 'next/link';
import { RoutesEnum } from '../../../@types';

interface Props {
  className?: string;
}
export const ProfileCard: React.FC<Props> = ({ className }) => {
  const { data: me } = useGetMe();
  return (
    <div className={cn('p-4 w-full', className)}>
      <div className="flex flex-col w-full items-center">
        <Avatar
          src={me?.user.avatarUrl || 'https://avatars.githubusercontent.com/u/158848927?v=4'}
          size="lg"
        />
        <span className="font-semibold text-lg">{me?.user.name}</span>
        <Link
          href={`${RoutesEnum.USER}/${me?.user.id}`}
          className="text-blue-500 transition-all hover:opacity-80 text-sm">
          @{me?.user.alias}
        </Link>
        <span className="text-gray-300 text-sm font-light my-2">{me?.user.about}</span>
        <dl className="flex gap-y-2 gap-x-8 select-none">
          <Link
            className="flex flex-col items-center"
            href={`${RoutesEnum.USER}/${me?.user.id}${RoutesEnum.FOLLOWERS}`}>
            <dd className="text-lg font-bold">{me?.user.followerCount}</dd>
            <dt className="text-gray-300 text-xs font-light">Подписчики</dt>
          </Link>
          <Link
            className="flex flex-col items-center"
            href={`${RoutesEnum.USER}/${me?.user.id}${RoutesEnum.FOLLOWING}`}>
            <dd className="text-lg font-bold">{me?.user.followingCount}</dd>
            <dt className="text-gray-300 text-xs font-light">Подписки</dt>
          </Link>
        </dl>
      </div>
    </div>
  );
};
