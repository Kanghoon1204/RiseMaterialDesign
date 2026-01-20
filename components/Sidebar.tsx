
import React from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_DATA } from '../constants';
import type { NavCategory } from '../types';

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  return (
    <aside
      className={`
        z-50 h-screen overflow-y-auto bg-slate-100 dark:bg-neutral-800
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64 p-4' : 'w-0 p-0'}
      `}
    >
      <div className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <nav className="flex flex-col space-y-4 pt-4">
          {NAV_DATA.map((category: NavCategory) => (
            <div key={category.name}>
              <h3 className="px-3 text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wider mb-2">
                {category.name}
              </h3>
              <ul className="space-y-1">
                {category.items.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => `
                        flex items-center px-3 py-2 text-sm font-medium rounded-full
                        transition-colors duration-200
                        ${
                          isActive
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                            : 'text-neutral-700 dark:text-neutral-300 hover:bg-slate-200 dark:hover:bg-neutral-700'
                        }
                      `}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
