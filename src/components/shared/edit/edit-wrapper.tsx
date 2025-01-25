'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Api } from '@/services/api-client';
import { useQuery } from '@tanstack/react-query';
import { UserResponse } from '../../../types/response';
import { EditBlock } from './edit-block';

interface Props {
  initialData: UserResponse;
  className?: string;
}

export const EditWrapper: React.FC<Props> = ({ initialData, className }) => {
  const { data } = useQuery({
    ...Api.users.getUserQueryOptions(initialData.user.id),
    initialData,
  });

  return (
    <section className={cn('w-full', className)}>
      <h2 className="sr-only">Редактирование профиля</h2>
      <EditBlock
        id={data.user.id}
        name={data.user.name}
        email={data.user.EmailUser.email}
        about={data.user.about ?? ''}
        avatar={data.user.avatar || ''}
      />
    </section>
  );
};
