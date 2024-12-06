'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Button, Textarea } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { hasErrorField } from '@/lib';
import { useCreateComment } from '@/lib/hooks';

interface Props {
  postId: string;
  className?: string;
}

export const WriteComment: React.FC<Props> = ({ postId, className }) => {
  const { handleSubmit, control, setValue } = useForm<{ comment: string }>();
  const { createComment, isPending: isPendingCreateComment } = useCreateComment(postId);

  const onSubmit = async (data: { comment: string }) => {
    try {
      createComment({ content: data.comment, postId });
      setValue('comment', '');
    } catch (error) {
      if (hasErrorField(error)) {
        console.error(error.data.error);
      }
    }
  };

  return (
    <form className={cn('flex flex-col gap-y-2', className)} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="comment"
        rules={{
          required: 'Обязательное поле',
        }}
        render={({ field }) => <Textarea placeholder="Комментарий..." {...field} />}
      />
      <Button
        variant="solid"
        color="warning"
        type="submit"
        isLoading={isPendingCreateComment}
        className="max-w-32">
        Отправить
      </Button>
    </form>
  );
};
