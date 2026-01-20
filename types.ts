
export interface NavItem {
  name: string;
  path: string;
}

export interface NavCategory {
  name: string;
  items: NavItem[];
}
