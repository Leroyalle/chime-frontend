'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { FC, ReactNode } from 'react';

interface Props {
  icon: ReactNode;
  href: string;
  children: ReactNode;
}

export const SidebarItem: FC<Props> = ({ icon, href, children }) => {
  const pathName = usePathname();
  const isPathMatch = new RegExp(`^${href}(?:\\/\\d+)?$`).test(pathName);
  return (
    <Link
      className={`flex gap-x-2 justify-start text-md w-[200px] p-2 bg-transparent hover:bg-white rounded-xl transition ${
        isPathMatch ? 'bg-white' : ''
      }`}
      href={href}>
      {icon} {children}
    </Link>
  );
};
