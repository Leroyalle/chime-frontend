import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import { Send } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { MessageRequest } from '../../../../../@types/chat';

interface Props {
  chatId: string;
  onSendMessage: (message: MessageRequest) => void;
  className?: string;
}

export const ChatInput: React.FC<Props> = ({ chatId, onSendMessage, className }) => {
  const { control, handleSubmit, setValue } = useForm<{ message: string }>();

  const onSubmit = (data: { message: string }) => {
    onSendMessage({ message: data.message, chatId });
    setValue('message', '');
  };

  return (
    <form className="pt-5" onSubmit={handleSubmit(onSubmit)}>
      <Controller
        render={({ field }) => (
          <Input
            {...field}
            className={cn('', className)}
            placeholder="Введите сообщение"
            endContent={
              <button type="submit">
                <Send size={20} />
              </button>
            }
            variant="faded"
            name="message"
            autoComplete="off"
          />
        )}
        rules={{
          required: 'Сообщение обязательно',
          minLength: {
            value: 1,
            message: 'Не меньше 1 символа',
          },
        }}
        name="message"
        control={control}
      />
    </form>
  );
};
