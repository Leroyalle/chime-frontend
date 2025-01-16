import React from 'react';
import { cn } from '@/lib/utils';
import { Tag } from '../../../../../../@types/newDto';

interface Props {
  tags: Tag[];
  className?: string;
}

export const PostTags: React.FC<Props> = ({ tags, className }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <ul className={cn('flex flex-wrap gap-x-2', className)}>
      {tags.map((tag) => (
        <li key={tag.id} className="text-sm text-blue-500">
          {`#${tag.value}`}
        </li>
      ))}
    </ul>
  );
};
