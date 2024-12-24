'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/shared/avatar';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Props {
  name: string;
  avatar?: string;
  className?: string;
}

export const ChatHead: React.FC<Props> = ({ name, avatar, className }) => {
  const router = useRouter();

  return (
    <div
      className={cn(
        'relative px-2 py-4 flex justify-between gap-x-2 border-b-gray-300 border-b-1',
        className,
      )}>
      <Avatar src={avatar} size="md" name="Николай" />
      <h3 className="text-lg m-auto">{name}</h3>
      <button onClick={() => router.back()}>
        <X />
      </button>
    </div>
  );
};
