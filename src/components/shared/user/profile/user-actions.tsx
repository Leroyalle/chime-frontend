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
        <Link href={RoutesEnum.EDIT} className="py-2 px-3 bg-warning rounded-xl">
          Редактировать
        </Link>
      ) : (
        <Button color="danger">Подписаться</Button>
      )}
      {isOwner ? (
        <Link href={RoutesEnum.SETTINGS} className="py-2 px-3 bg-secondary rounded-xl">
          <Settings />
        </Link>
      ) : (
        <Button color="default">
          <MessageCircleMore />
        </Button>
      )}
    </div>
  );
};
