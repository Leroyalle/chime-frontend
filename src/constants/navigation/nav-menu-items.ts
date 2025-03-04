import { navCategories, NavItem } from './nav-categories';

export const navMenuItems = navCategories.reduce((acc, { items }) => {
  acc.push(...items);
  return acc;
}, [] as NavItem[]);
