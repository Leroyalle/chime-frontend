import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import { Send } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useSocket } from '@/lib/hooks';
import { EditableMessage } from '@/components/ui';
import { MessageDto, MessageTypeEnum } from '@/types';
import { messageSchema, TMessageSchema } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  chatId: string;
  editableMessage: MessageDto | null;
  cancelEdit: () => void;
  className?: string;
}

export const ChatInput: React.FC<Props> = ({ chatId, className, editableMessage, cancelEdit }) => {
  const { sendMessage, updateMessage } = useSocket();
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TMessageSchema>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      message: '',
    },
  });

  const message = watch('message');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (editableMessage && editableMessage.content) {
      setValue('message', editableMessage.content);
    } else {
      setValue('message', '');
    }
  }, [editableMessage, setValue]);

  const onSubmit = (data: TMessageSchema) => {
    if (editableMessage) {
      updateMessage({ messageId: editableMessage.id, messageBody: data.message });
    } else {
      sendMessage({
        body: {
          chatId,
          type: MessageTypeEnum.TEXT,
          content: data.message,
        },
      });
    }
    setValue('message', '');
    cancelEdit();
  };

  return (
    <form className={cn('pt-5', className)} onSubmit={handleSubmit(onSubmit)}>
      {editableMessage && editableMessage.content && (
        <EditableMessage
          title="Редактируемое сообщение"
          text={editableMessage.content}
          onClose={cancelEdit}
        />
      )}
      <Controller
        render={({ field }) => (
          <Input
            {...field}
            ref={inputRef}
            placeholder="Сообщение"
            endContent={
              message ? (
                <button type="submit">
                  <Send size={20} />
                </button>
              ) : undefined
            }
            variant="faded"
            type="text"
            name="message"
            autoComplete="off"
            errorMessage={errors.message?.message}
            isInvalid={!!errors.message}
          />
        )}
        name="message"
        control={control}
      />
    </form>
  );
};
