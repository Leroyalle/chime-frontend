import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import { Send } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useSocket } from '@/lib/hooks';
import { Message } from '../../../../../../@types/newDto';
import { EditableMessage } from './editable-message';

interface Props {
  chatId: string;
  editableMessage: Message | null;
  cancelEdit: () => void;
  className?: string;
}

export const ChatInput: React.FC<Props> = ({ chatId, className, editableMessage, cancelEdit }) => {
  const { sendMessage, updateMessage } = useSocket();
  const { control, handleSubmit, setValue } = useForm<{ message: string }>({
    defaultValues: {
      message: '',
    },
  });

  useEffect(() => {
    if (editableMessage) {
      setValue('message', editableMessage.body);
    } else {
      setValue('message', '');
    }
  }, [editableMessage, setValue]);

  const onSubmit = (data: { message: string }) => {
    // FIXME: при нажатии на enter при открытом редактировании не сабмитится
    if (editableMessage) {
      updateMessage({ messageId: editableMessage.id, messageBody: data.message });
    } else {
      sendMessage({ message: data.message, chatId });
    }
    setValue('message', '');
    cancelEdit();
  };

  return (
    <form className={cn('pt-5', className)} onSubmit={handleSubmit(onSubmit)}>
      {editableMessage && <EditableMessage text={editableMessage.body} onClose={cancelEdit} />}
      <Controller
        render={({ field }) => (
          <Input
            {...field}
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
