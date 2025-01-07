import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar } from '@/components/ui';
import { X, ArrowLeft, MoreVertical } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { RoutesEnum } from '../../../../../@types';
import { User } from '../../../../../@types/newResponse';
import { useGetMe } from '@/lib/hooks';

interface Props {
  name: string;
  members: User[];
  avatar?: string;
  className?: string;
}

export const ChatHead: React.FC<Props> = ({ name, members, avatar, className }) => {
  const router = useRouter();
  const { data: userData } = useGetMe();



  const membersExcludeUser = members.filter(member => member.id != userData?.user.id)

  return (
    <div
      className={cn(
        'relative px-2 py-4 flex justify-between gap-x-2 border-b-gray-300 border-b-1',
        className,
      )}>

      <button onClick={() => router.push(RoutesEnum.MESSAGES)}>
        <ArrowLeft />
      </button>


      {membersExcludeUser.map((member) => (
        <div className='flex flex-row gap-3 w-full left-0 justify-start items-center'>
          <Avatar src={avatar} size="md" />
          <h3 className="text-large m-0 h-min text-blue-700 font-semibold">
            <a href={`${RoutesEnum.USER}/${member.id}`}>{name}</a>
          </h3>
        </div>
      ))}



      <button onClick={() => { }}>
        <MoreVertical />
      </button>
    </div>
  );
};
