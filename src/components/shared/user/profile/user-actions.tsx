'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@nextui-org/react';
import { MessageCircleMore, Settings } from 'lucide-react';
import Link from 'next/link';
import { RoutesEnum } from '../../../../../@types';

interface Props {
  isOwner: boolean;
  className?: string;
}

export const UserActions: React.FC<Props> = ({ isOwner, className }) => {
  return (
    <div className={cn('flex items-center gap-x-2', className)}>
      {isOwner ? (
        <Link href={RoutesEnum.EDIT}>
          <Button color="warning">Редактировать</Button>
        </Link>
      ) : (
        <Button color="danger">Подписаться</Button>
      )}
      {isOwner ? (
        <Link href={RoutesEnum.SETTINGS}>
          <Button color="default">
            <Settings />
          </Button>
        </Link>
      ) : (
        <Button color="default">
          <MessageCircleMore />
        </Button>
      )}
    </div>
  );
};
