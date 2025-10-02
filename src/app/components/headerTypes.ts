export type NavItem = {
  href: string;
  label: string;
};

export type HeaderSharedProps = {
  navItems: NavItem[];
  primaryNavItems: NavItem[];
  leftNavItems: NavItem[];
  rightNavItems: NavItem[];
  contactItem?: NavItem;
  isScrolled: boolean;
  scrollProgress: number;
};
