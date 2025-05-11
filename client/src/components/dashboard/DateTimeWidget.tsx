import React, { useState, useEffect } from 'react';
import { formatDate, formatTime } from '@/lib/utils';
import { Card } from '@/components/ui/card';
import { useTask } from '@/contexts/TaskContext';

const DateTimeWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { getFocusedTask } = useTask();
  const focusTask = getFocusedTask();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden col-span-full md:col-span-1">
      <div className="p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold">{formatDate(currentDate)}</h2>
          <p className="text-gray-600 dark:text-gray-400">{formatTime(currentDate)}</p>
        </div>
        <div className="bg-gradient-to-br from-royal to-blue-600 text-white p-3 rounded-lg">
          <span className="material-icons text-xl">calendar_today</span>
        </div>
      </div>
      
      <div className="bg-white dark:bg-darkgray p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-medium">Today's Focus</p>
          {focusTask && (
            <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-midnight text-royal rounded-full">
              Important
            </span>
          )}
        </div>
        {focusTask ? (
          <>
            <p className="text-gray-700 dark:text-gray-300 text-lg font-medium">
              {focusTask.title}
            </p>
            {focusTask.dueDate && (
              <div className="mt-4 flex items-center text-sm">
                <span className="material-icons text-sunset mr-2 text-sm">schedule</span>
                <span className="text-gray-600 dark:text-gray-400">
                  Due by {formatTime(focusTask.dueDate)}
                </span>
              </div>
            )}
          </>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">
            No focused task for today. Add one to get started.
          </p>
        )}
      </div>
    </div>
  );
};

export default DateTimeWidget;
