import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';

interface ControlBarProps {
  title: string;
  subtitle?: string;
}

const ControlBar: React.FC<ControlBarProps> = ({ title, subtitle }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
        )}
      </div>
      
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search..." 
            className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-darkgray focus:outline-none focus:ring-2 focus:ring-royal"
          />
          <span className="material-icons absolute left-3 top-2 text-gray-400">search</span>
        </div>
        
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-darkgray">
          <span className="material-icons">notifications</span>
          <span className="absolute top-0 right-0 h-4 w-4 bg-sunset rounded-full text-white text-xs flex items-center justify-center">
            2
          </span>
        </button>
        
        {/* Dark Mode Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-darkgray"
        >
          <span className="material-icons dark:hidden">dark_mode</span>
          <span className="material-icons hidden dark:block">light_mode</span>
        </button>
        
        {/* Add New */}
        <Button className="hidden md:flex items-center gap-2">
          <span className="material-icons text-sm">add</span>
          <span>Add New</span>
        </Button>
        
        {/* Mobile Add Button */}
        <Button className="md:hidden flex items-center justify-center h-10 w-10 p-0 rounded-full">
          <span className="material-icons">add</span>
        </Button>
      </div>
    </div>
  );
};

export default ControlBar;
