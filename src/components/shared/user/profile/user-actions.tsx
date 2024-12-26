'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@nextui-org/react';
import { MessageCircleMore, Settings } from 'lucide-react';
import Link from 'next/link';
import { RoutesEnum } from '../../../../../@types';
import { useFollowUser, useUnFollowUser } from '@/lib/hooks';

interface Props {
  userId: string;
  isOwner: boolean;
  isFollowing: boolean;
  onClickChat: (data: { recipientId: string }) => void;
  className?: string;
}

export const UserActions: React.FC<Props> = ({
  userId,
  isOwner,
  isFollowing,
  onClickChat,
  className,
}) => {
  const { followUser, isPending: isPendingFollow } = useFollowUser(userId);
  const { unFollowUser, isPending: isPendingUnFollow } = useUnFollowUser(userId);

  const onClickFollowUser = () => {
    if (!isFollowing) {
      followUser();
    } else {
      unFollowUser();
    }
  };

  return (
    <div className={cn('flex items-center gap-x-2', className)}>
      {isOwner ? (
        <Link href={RoutesEnum.EDIT} className="py-2 px-3 bg-warning rounded-xl">
          Редактировать
        </Link>
      ) : (
        <Button
          color={isFollowing ? 'success' : 'danger'}
          onPress={onClickFollowUser}
          disabled={isPendingFollow || isPendingUnFollow}>
          {isFollowing ? 'Отписаться' : 'Подписаться'}
        </Button>
      )}
      {isOwner ? (
        <Link href={RoutesEnum.SETTINGS} className="py-2 px-3 bg-secondary rounded-xl">
          <Settings />
        </Link>
      ) : (
        <Button color="default" onPress={() => onClickChat({ recipientId: userId })}>
          <MessageCircleMore />
        </Button>
      )}
    </div>
  );
};
