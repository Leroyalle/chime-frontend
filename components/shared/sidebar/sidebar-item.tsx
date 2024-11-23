import Link from 'next/link';
import type { FC, ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  href: string;
  children: ReactNode;
}

export const SidebarItem: FC<Props> = ({ icon, href, children }) => {
  return (
    <Link
      className="flex gap-x-2 justify-start text-md w-[200px] p-2 bg-transparent hover:bg-white rounded-xl transition"
      href={href}>
      {icon} {children}
    </Link>
  );
};
