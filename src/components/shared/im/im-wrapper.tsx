import React from 'react';
import { cn } from '@/lib/utils';
import { ChatList, SearchChat } from './chat-list';
import { ImHead as Header } from './im-head';

interface Props {
  className?: string;
}

export const ImWrapper: React.FC<Props> = ({ className }) => {
  return (
    <section className={cn('relative', className)}>
      <Header className="mb-4" />
      <SearchChat className="mb-2 max-w-80" />
      <ChatList />
    </section>
  );
};
