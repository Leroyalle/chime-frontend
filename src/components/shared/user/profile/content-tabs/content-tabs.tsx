'use client';
import React from 'react';
import { Tab, Tabs } from '@nextui-org/react';
import { PostsTab } from './tabs';
interface Props {
  userId: string;
}
export const ContentTabs: React.FC<Props> = ({ userId }) => {
  return (
    <Tabs variant={'underlined'} aria-label="Content tabs" color="primary">
      <Tab key="posts" title="Записи" className="pl-0 text-black">
        <PostsTab userId={userId} />
      </Tab>
      <Tab key="comments" title="Комментарии" />
    </Tabs>
  );
};
