import React from 'react';
import { cn, getAbsoluteUrl } from '@/lib/utils';
import { Avatar } from '@/components/ui';
import { ArrowLeft } from 'lucide-react';
import { RoutesEnum, User } from '@/types';
import Link from 'next/link';

interface Props {
  correspondent?: User;
  className?: string;
}

export const ChatHead: React.FC<Props> = ({ correspondent, className }) => {
  if (!correspondent) {
    return null;
  }

  return (
    <div
      className={cn(
        'relative px-2 py-4 flex items-center gap-x-3 justify-between border-b-gray-300 border-b-1',
        className,
      )}>
      <Link href={RoutesEnum.MESSAGES}>
        <ArrowLeft />
      </Link>

      <div className="flex flex-row gap-3 w-full left-0 justify-start items-center">
        <Avatar src={getAbsoluteUrl(correspondent.avatar)} size="md" />
        <h3 className="text-large m-0 h-min text-blue-700 font-semibold">
          <Link className="break-words break-all" href={`${RoutesEnum.USER}/${correspondent.id}`}>
            {correspondent.name}
          </Link>
        </h3>
      </div>
    </div>
  );
};
