import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import { Send } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { useSocket } from '@/lib/hooks';
import { EditableMessage } from '@/components/ui';
import { Message, MessageTypeEnum } from '../../../../../../@types/dto';

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
    if (editableMessage && editableMessage.content) {
      setValue('message', editableMessage.content);
    } else {
      setValue('message', '');
    }
  }, [editableMessage, setValue]);

  const onSubmit = (data: { message: string }) => {
    // FIXME: при нажатии на enter при открытом редактировании не сабмитится
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
