
import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { MenuIcon } from './icons/MenuIcon';
import { SearchIcon } from './icons/SearchIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';
import { GithubIcon } from './icons/GithubIcon';
import { MaterialLogo } from './icons/MaterialLogo';
import { Link } from 'react-router-dom';

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuClick }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-slate-100/80 dark:bg-neutral-800/80 backdrop-blur-sm border-b border-slate-200 dark:border-neutral-700">
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            <MenuIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
          </button>
          <Link to="/home" className="flex items-center space-x-2">
             <MaterialLogo className="w-8 h-8"/>
             <span className="text-xl font-medium text-neutral-800 dark:text-neutral-100">Material Design</span>
          </Link>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-full bg-slate-200 dark:bg-neutral-700 w-64">
             <SearchIcon className="w-5 h-5 text-neutral-500 dark:text-neutral-400" />
             <input type="text" placeholder="Search" className="bg-transparent focus:outline-none w-full text-sm"/>
          </div>
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="Toggle theme">
            {theme === 'light' ? (
              <SunIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
            ) : (
              <MoonIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-300" />
            )}
          </button>
           <a href="https://github.com/google/material-design-icons" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-slate-200 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-blue-500" aria-label="GitHub">
            <GithubIcon className="w-6 h-6 text-neutral-600 dark:text-neutral-300"/>
          </a>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
