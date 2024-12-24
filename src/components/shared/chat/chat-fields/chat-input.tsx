'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import { Send } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

interface Props {
  className?: string;
}

export const ChatInput: React.FC<Props> = ({ className }) => {
  const { control, handleSubmit } = useForm();

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
            name="message"
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
