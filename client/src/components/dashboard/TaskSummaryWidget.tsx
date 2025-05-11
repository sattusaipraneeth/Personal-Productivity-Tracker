import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useTask } from '@/contexts/TaskContext';

const TaskSummaryWidget = () => {
  const { getTaskSummary } = useTask();
  const summary = getTaskSummary();

  const categories = [
    { name: 'Urgent', count: summary.urgent, color: 'bg-sunset' },
    { name: 'In Progress', count: summary.inProgress, color: 'bg-royal' },
    { name: 'Completed', count: summary.completed, color: 'bg-neongreen' },
    { name: 'Upcoming', count: summary.upcoming, color: 'bg-gray-300 dark:bg-gray-600' },
  ];

  return (
    <div className="glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Task Summary</h2>
          <span className="material-icons text-royal">more_horiz</span>
        </div>
        
        <div className="space-y-4">
          {categories.map((category) => (
            <div key={category.name} className="flex justify-between items-center">
              <div className="flex items-center">
                <span className={`h-3 w-3 rounded-full ${category.color} mr-2`}></span>
                <p className="text-sm">{category.name}</p>
              </div>
              <p className="font-medium">{category.count}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">Daily Progress</p>
            <p className="text-sm font-medium">{summary.progress}%</p>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-royal rounded-full progress-bar" 
              style={{ width: `${summary.progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummaryWidget;
