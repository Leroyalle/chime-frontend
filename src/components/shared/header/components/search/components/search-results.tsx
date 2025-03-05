import React from 'react';
import { EmptyState } from './empty-state';
import { Spinner } from '@nextui-org/react';
import { SearchedUsersList } from './searched-users-list';
import { User } from '@/types';

interface Props {
  isFetching: boolean;
  searchQuery: string;
  users: User[] | undefined;
  onClickItem: VoidFunction;
  className?: string;
}

export const SearchResults: React.FC<Props> = ({ isFetching, searchQuery, users, onClickItem }) => {
  if (isFetching) return <Spinner color="current" className="mx-auto" />;
  if (!searchQuery) return null;
  if (!users?.length) return <EmptyState />;
  return <SearchedUsersList users={users} onClickItem={onClickItem} />;
};
