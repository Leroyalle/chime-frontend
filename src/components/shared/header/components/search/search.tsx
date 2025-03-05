import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@nextui-org/react';
import { SearchIcon } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Api } from '@/services/api-client';
import { useDebounce } from '@/components/ui';
import { SearchResults } from './components';

interface Props {
  className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
  const [focused, setFocused] = React.useState(false);
  const [searchValue, setSearchValue] = useState('');
  const ref = React.useRef(null);
  const searchQuery = useDebounce(searchValue, 500);

  const { data: users, isFetching: isFetchingUsers } = useQuery({
    ...Api.users.finAllQueryOptions(searchQuery),
    enabled: !!searchQuery,
  });

  const onClickItem = () => {
    setSearchValue('');
    setFocused(false);
  };

  return (
    <div
      ref={ref}
      className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)}>
      <Input
        placeholder="Поиск по имени..."
        size="md"
        startContent={<SearchIcon size={18} />}
        type="search"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        isClearable
        onClear={() => setSearchValue('')}
      />

      {searchQuery && (
        <div
          className={cn(
            'absolute w-full bg-primary-light rounded-xl top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30',
            focused && 'visible opacity-100 top-12',
            'flex flex-col p-3',
          )}>
          <SearchResults
            isFetching={isFetchingUsers}
            searchQuery={searchQuery}
            users={users?.slice(0, 5)}
            onClickItem={onClickItem}
          />
        </div>
      )}
    </div>
  );
};
