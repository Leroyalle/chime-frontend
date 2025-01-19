import React from 'react';
import { cn } from '@/lib/utils';
import { ChatItem } from './chat-item';
import { DarkLightBlock } from '../../ui/dark-light-block';
import { UserChat } from '../../../../@types/chat';
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

interface Props {
  hasActions?: boolean;
  items?: UserChat[];
  itemsStyles?: string;
  className?: string;
}

export const ChatListShareMode: React.FC<Props> = ({ items, hasActions, className }) => {
  const form = useForm<ChatListShareModeSchemaType>({
    resolver: zodResolver(ChatListShareModeSchema),
    defaultValues: {
      users: [],
    },
  });

  if (!items || items.length === 0) {
    return null;
  }

  const onSubmit = (data: ChatListShareModeSchemaType) => {
    console.log(data);
  };

  return (
    <DarkLightBlock className={cn('p-2 w-full overflow-y-auto', className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-2">
          <FormField
            control={form.control}
            name="users"
            render={() => (
              <FormItem>
                {items.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="users"
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
                              chatId={item.id}
                              imageUrl={item.imageUrl}
                              name={item.name}
                              lastMessage={item.lastMessage}
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
