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
      <h2 className="sr-only">Профиль пользователя</h2>
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
            <UserActions isOwner={data.isOwner} />
          </div>
          <UserInfo
            name={data.user.name}
            date={''}
            about={data.user.about}
            followersCount={0}
            followingsCount={0}
          />
        </div>
      </DarkLightBlock>
    </section>
  );
};
