'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { DarkLightBlock } from '../dark-light-block';
import { UserActions, UserInfo } from './profile';
import { Avatar } from '../avatar';
import { UserResponse } from '../../../../@types/newResponse';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/services/api-client';

interface Props {
  initialData: UserResponse;
  className?: string;
}

export const UserWrapper: React.FC<Props> = ({ initialData, className }) => {
  const { data } = useQuery({
    ...Api.users.getUserQueryOptions(initialData.user.id),
    initialData,
  });

  return (
    <section className={cn('w-full rounded-xl overflow-hidden', className)}>
      <img
        src="https://avatars.githubusercontent.com/u/158848927?v=4"
        alt="banner"
        className="object-cover max-h-52 w-full"
      />
      <DarkLightBlock className="p-4">
        <div className="px-8 flex flex-col gap-y-4">
          <div className="flex justify-between items-center">
            <Avatar
              isBordered
              size="lg"
              className="w-20 h-20 text-large"
              src="https://avatars.githubusercontent.com/u/158848927?v=4"
            />
            <UserActions />
          </div>
          <UserInfo
            name={`User #${data.user.id.slice(1, 5)}`}
            date={''}
            about={''}
            followersCount={0}
            followingsCount={0}
          />
        </div>
      </DarkLightBlock>
    </section>
  );
};
