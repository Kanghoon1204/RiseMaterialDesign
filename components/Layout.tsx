
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-200">
      <Sidebar isOpen={isSidebarOpen} />
      <div className="flex flex-col flex-1 h-screen">
        <TopBar onMenuClick={toggleSidebar} />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
