import React, { useState } from 'react';
import { PostBottomActionsItem } from './post-bottom-actions-item';
import { Undo2 } from 'lucide-react';
import { SharedModal } from '@/components/shared/modals';

interface Props {
  shared: number;
  onClick?: VoidFunction;
}

export const SharedBody: React.FC<Props> = ({ shared, onClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PostBottomActionsItem
        count={shared}
        onClick={() => {
          setIsOpen(true);
          onClick?.();
        }}
        icon={<Undo2 size={20} />}
      />
      <SharedModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
