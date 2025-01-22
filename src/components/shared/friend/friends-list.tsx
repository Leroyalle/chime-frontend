import React from 'react';
import { cn } from '@/lib/utils';
import { Friend } from './friend';
import { DarkLightBlock } from '@/components/ui';
import { Friend as TFriend } from '../../../types/dto';

interface Props {
  items: TFriend[];
  className?: string;
}
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjNlN2RjNzgxLWNkNmEtNGJlYy04Njk5LTYwNzEwOTU5ZmQ2YyIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM1OTk4MTMzLCJleHAiOjE3MzYwODQ1MzN9.-YGYUIneTcz13W1YnbZSGQQ5eP24kDuabZZjJN7WqMQ
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImYwMmMyNjMzLWI0ODEtNDVmNS04ZWI1LWNmYTU1ODJkZmI2YSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM1OTk4MjczLCJleHAiOjE3MzYwODQ2NzN9.UP-kKv2Iv4ckeX0T19doXMPiM9SkmbM4in7Wf0XwweY

export const FriendsList: React.FC<Props> = ({ items, className }) => {
  return (
    <ul className={cn('flex flex-col gap-y-5', className)}>
      {items.map((item) => (
        <DarkLightBlock key={item.id} className="p-2">
          <Friend
            friendId={item.id}
            name={item.name}
            alias={item.alias}
            avatarUrl={item.avatarUrl || ''}
          />
        </DarkLightBlock>
      ))}
    </ul>
  );
};
