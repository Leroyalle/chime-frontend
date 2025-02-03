import React from 'react';
import { cn } from '@/lib/utils';
import { ChatItem } from './chat-item';
import { DarkLightBlock } from '../../ui/dark-light-block';
import { ChatWithMembers } from '@/types';
import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui';
import { useForm } from 'react-hook-form';
import { ChatListShareModeSchema, ChatListShareModeSchemaType } from './schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useGetMe, useSocket } from '@/lib/hooks';
import { useSharedPostSlice } from '@/store';
import { MessageTypeEnum } from '../../../types';
import { toast } from 'sonner';
import { Input } from '@nextui-org/react';

interface Props {
  items?: ChatWithMembers[];
  onCloseModal?: VoidFunction;
  hasActions?: boolean;
  itemsStyles?: string;
  className?: string;
}

export const ChatListShareMode: React.FC<Props> = ({
  items,
  onCloseModal,
  hasActions,
  className,
}) => {
  const { sendMessage } = useSocket();
  const { data: me } = useGetMe();
  const sharedPost = useSharedPostSlice((state) => state.sharedPost);
  const form = useForm<ChatListShareModeSchemaType>({
    resolver: zodResolver(ChatListShareModeSchema),
    defaultValues: {
      chats: [],
      message: '',
    },
  });

  if (!sharedPost) {
    return null;
  }

  if (!items || items.length === 0 || !me) {
    return null;
  }

  const onSubmit = (data: ChatListShareModeSchemaType) => {
    sendMessage({
      body: {
        chatIds: data.chats,
        type: MessageTypeEnum.POST,
        postId: sharedPost.postId,
        content: data.message || null,
      },
    });
    toast.success('Отправлено');
    onCloseModal?.();
  };

  return (
    <DarkLightBlock className={cn('p-2 w-full overflow-y-auto', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
          <FormField
            control={form.control}
            name="chats"
            render={() => (
              <FormItem>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="chats"
                    render={({ field }) => {
                      return (
                        <FormItem key={item.id} className="flex items-center gap-x-2">
                          <FormControl>
                            <Checkbox
                              className="w-6 h-6 data-[state=checked]:bg-foreground data-[state=checked]:text-blue-500"
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== item.id),
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="flex-1 text-current">
                            <ChatItem
                              chat={item}
                              me={me}
                              hasActions={hasActions}
                              className="pointer-events-none"
                            />
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="select-none">Ваше сообщение</FormLabel>
                <FormControl>
                  <Input variant="bordered" placeholder="Введите сообщение..." {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            variant={'outline'}
            className="ml-auto"
            disabled={!form.formState.isValid}>
            Отправить
          </Button>
        </form>
      </Form>
    </DarkLightBlock>
  );
};
