'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { hasErrorField } from '@/lib';
import { useCreateComment } from '@/lib/hooks';
import { Loader, Send } from 'lucide-react';
import { toast } from 'react-toastify';

interface Props {
  userId: string;
  postId: string;
  className?: string;
}

export const WriteComment: React.FC<Props> = ({ userId, postId, className }) => {
  const { handleSubmit, control, setValue } = useForm<{ comment: string }>({
    defaultValues: {
      comment: '',
    },
  });
  const { createComment, isPending: isPendingCreateComment } = useCreateComment(postId, userId);

  const onSubmit = async (data: { comment: string }) => {
    try {
      createComment({ content: data.comment, postId });
      setValue('comment', '');
      window.scrollTo(0, 0);
    } catch (error) {
      if (hasErrorField(error)) {
        console.error(error.data.error);
        toast.error('Что-то пошло не так! Попробуйте еще раз');
      }
    }
  };

  return (
    <form className={cn('flex flex-col gap-y-2 z-50', className)} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="comment"
        rules={{
          required: 'Обязательное поле',
        }}
        render={({ field }) => (
          <Textarea
            placeholder="Комментарий..."
            variant="faded"
            color="primary"
            endContent={
              <button color="warning" type="submit" className="max-w-32">
                {!isPendingCreateComment ? <Send /> : <Loader className="animate-spin" />}
              </button>
            }
            {...field}
          />
        )}
      />
    </form>
  );
};
