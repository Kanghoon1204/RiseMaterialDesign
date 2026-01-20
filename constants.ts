
import type { NavCategory } from './types';

export const NAV_DATA: NavCategory[] = [
  {
    name: 'Action',
    items: [
      { name: 'Button', path: '/components/button' },
      { name: 'Floating action button', path: '/components/fab' },
      { name: 'Icon button', path: '/components/icon-button' },
      { name: 'Segmented buttons', path: '/components/segmented-buttons' },
    ],
  },
  {
    name: 'Communication',
    items: [
      { name: 'Badge', path: '/components/badge' },
      { name: 'Progress indicators', path: '/components/progress-indicators' },
      { name: 'Snackbar', path: '/components/snackbar' },
    ],
  },
  {
    name: 'Containment',
    items: [
      { name: 'Card', path: '/components/card' },
      { name: 'Dialog', path: '/components/dialog' },
      { name: 'Sheets: bottom', path: '/components/sheets-bottom' },
      { name: 'Tooltip', path: '/components/tooltip' },
    ],
  },
  {
    name: 'Navigation',
    items: [
      { name: 'Bottom app bar', path: '/components/bottom-app-bar' },
      { name: 'Navigation bar', path: '/components/navigation-bar' },
      { name: 'Navigation drawer', path: '/components/navigation-drawer' },
      { name: 'Tabs', path: '/components/tabs' },
      { name: 'Top app bar', path: '/components/top-app-bar' },
    ],
  },
  {
    name: 'Selection',
    items: [
      { name: 'Checkbox', path: '/components/checkbox' },
      { name: 'Chips', path: '/components/chips' },
      { name: 'Date pickers', path: '/components/date-pickers' },
      { name: 'Menus', path: '/components/menus' },
      { name: 'Radio button', path: '/components/radio-button' },
      { name: 'Slider', path: '/components/slider' },
      { name: 'Switch', path: '/components/switch' },
    ],
  },
  {
    name: 'Text inputs',
    items: [
        { name: 'Text field', path: '/components/text-field' },
    ],
  },
];
