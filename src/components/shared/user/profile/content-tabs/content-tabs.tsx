'use client';
import React from 'react';
// import { Tab, Tabs } from '@nextui-org/react';
import { CommentsTab, PostsTab } from './tabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';

interface Props {
  userId: string;
}

export const ContentTabs: React.FC<Props> = ({ userId }) => {
  return (
    <Tabs defaultValue="posts" className="w-full">
      <TabsList className="bg-transparent">
        <TabsTrigger value="posts">Записи</TabsTrigger>
        <TabsTrigger value="comments">Комментарии</TabsTrigger>
      </TabsList>
      <hr className="mt-4" />
      <TabsContent value="posts">
        <PostsTab userId={userId} />
      </TabsContent>
      <TabsContent value="comments">
        <CommentsTab userId={userId} />
      </TabsContent>
    </Tabs>
  );
};
