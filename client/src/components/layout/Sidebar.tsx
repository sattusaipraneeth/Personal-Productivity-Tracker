import React from 'react';
import { Link, useLocation } from 'wouter';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const [location] = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: 'dashboard' },
    { path: '/tasks', label: 'Tasks', icon: 'check_circle' },
    { path: '/projects', label: 'Projects', icon: 'view_kanban' },
    { path: '/habits', label: 'Habits', icon: 'local_fire_department' },
    { path: '/notes', label: 'Notes', icon: 'description' },
    { path: '/calendar', label: 'Calendar', icon: 'calendar_today' },
    { path: '/analytics', label: 'Analytics', icon: 'analytics' },
  ];

  return (
    <aside className="w-16 md:w-64 h-screen bg-white dark:bg-darkgray shadow-md flex flex-col transition-all duration-300 z-10">
      {/* Logo & Brand */}
      <div className="p-4 flex items-center justify-center md:justify-start">
        <div className="h-8 w-8 bg-gradient-to-br from-royal to-midnight rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">CH</span>
        </div>
        <h1 className="hidden md:block ml-3 font-semibold text-lg">Clarity Hub</h1>
      </div>
      
      {/* Navigation Menu */}
      <nav className="mt-8 flex-1">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link href={item.path}>
                <div 
                  className={cn(
                    "flex items-center px-4 py-3 rounded-r-lg cursor-pointer",
                    location === item.path
                      ? "text-royal bg-blue-50 dark:bg-midnight"
                      : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-darkbg"
                  )}
                >
                  <span className="material-icons sidebar-icon">{item.icon}</span>
                  <span className="hidden md:block ml-3">{item.label}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      {/* User Profile & Settings */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <Link href="/profile">
          <div className="flex items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-midnight p-2 rounded-lg">
            <div className="h-8 w-8 rounded-full bg-royal flex items-center justify-center text-white">
              <span className="font-semibold text-sm">SP</span>
            </div>
            <div className="hidden md:block ml-3">
              <p className="text-sm font-medium">SaiPraneeth</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Premium Plan</p>
            </div>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
