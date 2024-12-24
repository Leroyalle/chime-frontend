'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { ChatHead as Header } from './chat-head';
import { DarkLightBlock } from '../../ui';
import { ChatBody as Body } from './chat-body';
import { ChatInput as Field } from './chat-fields';

interface Props {
  className?: string;
}

export const ChatWrapper: React.FC<Props> = ({ className }) => {
  return (
    <DarkLightBlock
      className={cn(
        'py-2 pt-0 flex flex-col overflow-y-auto h-[calc(100vh-58px-32px)]',
        className,
      )}>
      <Header
        className="px-6"
        name="Николай Мелонов"
        avatar="https://avatars.githubusercontent.com/u/158848927?v=4"
      />
      <Body className="flex-1 px-4" />
      <Field className="px-6" />
    </DarkLightBlock>
  );
};
