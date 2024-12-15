import React from 'react';
import { cn } from '@/lib/utils';
import { ChatHead as Header } from './chat-head';
import { DarkLightBlock } from '../dark-light-block';
import { ChatBody as Body } from './chat-body';

interface Props {
  className?: string;
}

export const ChatWrapper: React.FC<Props> = ({ className }) => {
  return (
    <DarkLightBlock className={cn('h-full', className)}>
      <Header />
      <Body />
    </DarkLightBlock>
  );
};
