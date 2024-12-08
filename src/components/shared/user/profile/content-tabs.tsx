'use client';
import React from 'react';
import { Tab, Tabs } from '@nextui-org/react';

export const ContentTabs: React.FC = () => {
  return (
    <Tabs variant={'underlined'} aria-label="Content tabs" color="primary">
      <Tab key="posts" title="Записи" className="pl-0 text-black" />
      <Tab key="comments" title="Комментарии" />
    </Tabs>
  );
};
