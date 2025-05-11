import React from 'react';
import ControlBar from '@/components/layout/ControlBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Notes = () => {
  return (
    <main className="flex-1 overflow-y-auto py-8 px-4 md:px-8 bg-softwhite dark:bg-darkbg">
      <ControlBar title="Notes" subtitle="Capture and organize your thoughts" />
      
      <div className="glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">All Notes</h2>
            <Button>
              <span className="material-icons text-sm mr-1">add</span>
              New Note
            </Button>
          </div>
          
          <div className="mb-6">
            <div className="relative">
              <Input
                placeholder="Search notes..."
                className="pl-10 pr-4 py-2 w-full"
              />
              <span className="material-icons absolute left-3 top-2 text-gray-400">search</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <h3 className="font-medium mb-1">Meeting Notes</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  Discussion about the new project. Key points: 1. Timeline needs to be adjusted...
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>July 15, 2023</span>
                  <div className="flex space-x-1">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-royal rounded-full">work</span>
                    <span className="px-2 py-0.5 bg-green-100 dark:bg-green-900 text-neongreen rounded-full">notes</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <h3 className="font-medium mb-1">Product Ideas</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  New features for the app: 1. Dark mode 2. Offline support 3. Custom notifications
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>July 10, 2023</span>
                  <div className="flex space-x-1">
                    <span className="px-2 py-0.5 bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 rounded-full">ideas</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <h3 className="font-medium mb-1">Learning Resources</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  Websites and courses to learn React: 1. React docs 2. Egghead.io 3. Frontend Masters
                </p>
                <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                  <span>July 5, 2023</span>
                  <div className="flex space-x-1">
                    <span className="px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-300 rounded-full">learning</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="cursor-pointer hover:shadow-md transition-shadow border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-5 flex items-center justify-center">
              <div className="text-center">
                <span className="material-icons text-gray-400 text-2xl mb-2">add_circle_outline</span>
                <p className="text-gray-500 dark:text-gray-400">Create a new note</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Notes;
