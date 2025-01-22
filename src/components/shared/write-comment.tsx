'use client';
import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Textarea } from '@nextui-org/react';
import { Controller, useForm } from 'react-hook-form';
import { hasErrorField } from '@/lib/utils';
import { useCreateComment, useUpdateComment } from '@/lib/hooks';
import { Loader, Send } from 'lucide-react';
import { toast } from 'react-toastify';
import { Comment } from '../../types/dto';
import { DarkLightBlock, EditableMessage } from '../ui';

interface Props {
  userId: string;
  postId: string;
  editableComment: Comment | null;
  cancelEdit: VoidFunction;
  className?: string;
}

export const WriteComment: React.FC<Props> = ({
  userId,
  postId,
  editableComment,
  cancelEdit,
  className,
}) => {
  const { createComment, isPending: isPendingCreateComment } = useCreateComment(postId, userId);
  const { updateComment, isPending: isPendingUpdateComment } = useUpdateComment(userId, postId);
  const { handleSubmit, control, setValue } = useForm<{ comment: string }>({
    defaultValues: {
      comment: '',
    },
  });

  useEffect(() => {
    if (editableComment) {
      setValue('comment', editableComment.content);
    } else {
      setValue('comment', '');
    }
  }, [editableComment, setValue]);

  const onSubmit = async (data: { comment: string }) => {
    try {
      if (editableComment) {
        updateComment({ commentId: editableComment.id, content: data.comment });
        cancelEdit();
      } else {
        createComment({ content: data.comment, postId });
        window.scrollTo(0, 0);
      }
      setValue('comment', '');
    } catch (error) {
      if (hasErrorField(error)) {
        console.error(error.data.error);
        toast.error('Что-то пошло не так! Попробуйте еще раз');
      }
    }
  };

  return (
    <DarkLightBlock className={cn('z-50', className)}>
      <form className={cn('flex flex-col gap-y-2')} onSubmit={handleSubmit(onSubmit)}>
        {editableComment && (
          <EditableMessage
            title={'Редактируемый комментарий'}
            text={editableComment.content}
            onClose={cancelEdit}
          />
        )}
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
                  {!isPendingCreateComment || !isPendingUpdateComment ? (
                    <Send />
                  ) : (
                    <Loader className="animate-spin" />
                  )}
                </button>
              }
              {...field}
            />
          )}
        />
      </form>
    </DarkLightBlock>
  );
};
