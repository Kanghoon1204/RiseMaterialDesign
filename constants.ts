
export interface NavItem {
  key: string;
  path: string;
}

export interface NavCategory {
  key: string;
  items: NavItem[];
}

export const NAV_DATA: NavCategory[] = [
  {
    key: 'action',
    items: [
      { key: 'button', path: '/components/button' },
      { key: 'fab', path: '/components/fab' },
      { key: 'iconButton', path: '/components/icon-button' },
      { key: 'segmentedButtons', path: '/components/segmented-buttons' },
    ],
  },
  {
    key: 'communication',
    items: [
      { key: 'badge', path: '/components/badge' },
      { key: 'progressIndicators', path: '/components/progress-indicators' },
      { key: 'snackbar', path: '/components/snackbar' },
    ],
  },
  {
    key: 'containment',
    items: [
      { key: 'card', path: '/components/card' },
      { key: 'dialog', path: '/components/dialog' },
      { key: 'sheetsBottom', path: '/components/sheets-bottom' },
      { key: 'tooltip', path: '/components/tooltip' },
    ],
  },
  {
    key: 'navigation',
    items: [
      { key: 'bottomAppBar', path: '/components/bottom-app-bar' },
      { key: 'navigationBar', path: '/components/navigation-bar' },
      { key: 'navigationDrawer', path: '/components/navigation-drawer' },
      { key: 'tabs', path: '/components/tabs' },
      { key: 'topAppBar', path: '/components/top-app-bar' },
    ],
  },
  {
    key: 'selection',
    items: [
      { key: 'checkbox', path: '/components/checkbox' },
      { key: 'chips', path: '/components/chips' },
      { key: 'datePickers', path: '/components/date-pickers' },
      { key: 'menus', path: '/components/menus' },
      { key: 'radioButton', path: '/components/radio-button' },
      { key: 'slider', path: '/components/slider' },
      { key: 'switch', path: '/components/switch' },
    ],
  },
  {
    key: 'textInputs',
    items: [
      { key: 'textField', path: '/components/text-field' },
    ],
  },
];
