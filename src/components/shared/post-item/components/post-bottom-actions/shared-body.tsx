import React, { useState } from 'react';
import { PostBottomActionsItem } from './post-bottom-actions-item';
import { Undo2 } from 'lucide-react';
import { SharedModal } from '@/components/shared/modals';

interface Props {
  shared: number;
}

export const SharedBody: React.FC<Props> = ({ shared }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <PostBottomActionsItem
        count={shared}
        onClick={() => setIsOpen(true)}
        icon={<Undo2 size={20} />}
      />
      <SharedModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
