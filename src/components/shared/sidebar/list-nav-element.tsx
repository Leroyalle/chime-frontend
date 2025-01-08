import React, { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const ListNavElement: React.FC<Props> = ({ children }) => {
  return (
    <nav>
      <ul className="flex flex-col gap-1">{children}</ul>
    </nav>
  );
};
