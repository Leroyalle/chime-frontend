import React from 'react';
import { cn } from '@/lib/utils';
import { ChatHead as Header } from './chat-head';
import { DarkLightBlock } from '../dark-light-block';
import { ChatBody as Body } from './chat-body';
import { ChatInput as Field } from './chat-fields';

interface Props {
  className?: string;
}

export const ChatWrapper: React.FC<Props> = ({ className }) => {
  return (
    <DarkLightBlock className={cn('p-2 flex flex-col h-full', className)}>
      <Header />
      <Body className="flex-1" />
      <Field />
    </DarkLightBlock>
  );
};
