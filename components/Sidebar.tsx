
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { NAV_DATA } from '../constants';
import { useLanguage } from '../hooks/useLanguage';
import { useTranslation } from '../i18n/translations';

interface SidebarProps {
  isOpen: boolean;
}

const ChevronIcon: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => (
  <svg
    className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    action: true,
    communication: true,
    containment: true,
    navigation: true,
    selection: true,
    textInputs: true,
  });

  const toggleCategory = (key: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getCategoryName = (key: string): string => {
    return t.nav[key as keyof typeof t.nav] || key;
  };

  const getComponentName = (key: string): string => {
    return t.components[key as keyof typeof t.components] || key;
  };

  return (
    <aside
      className={`
        z-50 h-screen overflow-y-auto bg-slate-100 dark:bg-neutral-800
        transition-all duration-300 ease-in-out
        ${isOpen ? 'w-64 p-4' : 'w-0 p-0'}
      `}
    >
      <div className={`transition-opacity duration-200 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
        <nav className="flex flex-col space-y-2 pt-4">
          {/* Home Link */}
          <NavLink
            to="/home"
            className={({ isActive }) => `
              flex items-center gap-2 px-3 py-2.5 text-sm font-semibold rounded-lg
              transition-colors duration-200
              ${isActive
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                : 'text-neutral-800 dark:text-neutral-200 hover:bg-slate-200 dark:hover:bg-neutral-700'
              }
            `}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            {language === 'ko' ? '홈' : 'Home'}
          </NavLink>

          <div className="border-t border-slate-200 dark:border-neutral-700 my-2" />

          {NAV_DATA.map((category) => (
            <div key={category.key}>
              <button
                onClick={() => toggleCategory(category.key)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-slate-200 dark:hover:bg-neutral-700 rounded-lg transition-colors duration-200"
              >
                <span>{getCategoryName(category.key)}</span>
                <ChevronIcon isExpanded={expandedCategories[category.key]} />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedCategories[category.key] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <ul className="space-y-1 mt-1 ml-2">
                  {category.items.map((item) => (
                    <li key={item.key}>
                      <NavLink
                        to={item.path}
                        className={({ isActive }) => `
                          flex items-center px-3 py-2 text-sm font-medium rounded-full
                          transition-colors duration-200
                          ${
                            isActive
                              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-200'
                              : 'text-neutral-600 dark:text-neutral-400 hover:bg-slate-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-neutral-100'
                          }
                        `}
                      >
                        {getComponentName(item.key)}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
