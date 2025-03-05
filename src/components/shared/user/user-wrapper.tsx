'use client';
import React from 'react';
import { cn, getAbsoluteUrl } from '@/lib/utils';
import { DarkLightBlock, Avatar } from '../../ui';
import { UserActions, UserInfo } from './profile';
import { UserResponse } from '../../../types/response';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/services/api-client';
import { useCreateChat } from '@/lib/hooks';

interface Props {
  initialData: UserResponse;
  className?: string;
}

export const UserWrapper: React.FC<Props> = ({ initialData, className }) => {
  const { createChat, isPending: isPendingChat } = useCreateChat();
  const { data } = useQuery({
    ...Api.users.getUserQueryOptions(initialData.user.id),
    initialData,
  });

  return (
    <section className={cn('w-full rounded-xl overflow-hidden', className)}>
      <h2 className="sr-only">Профиль пользователя</h2>
      <DarkLightBlock className={cn('p-4', 'lg:p-3 xl:p-8')}>
        <div className="flex flex-col gap-y-4">
          <div className="flex justify-between gap-x-2 items-center flex-wrap gap-y-3">
            <Avatar
              isBordered
              size="lg"
              className="w-20 h-20 text-large"
              src={getAbsoluteUrl(data.user.avatar)}
            />
            <UserActions
              userId={data.user.id}
              isOwner={data.isOwner}
              isFollowing={data.user.isFollowing}
              onClickChat={createChat}
              onClickChatLoading={isPendingChat}
            />
          </div>
          <UserInfo
            userId={data.user.id}
            name={data.user.name}
            date={data.user.createdAt}
            about={data.user.about}
            followerCount={data.user.followerCount}
            followingCount={data.user.followingCount}
          />
        </div>
      </DarkLightBlock>
    </section>
  );
};
