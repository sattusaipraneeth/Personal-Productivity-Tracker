import React, { useState } from 'react';
import { useTask } from '@/contexts/TaskContext';
import { Task, TaskStatus, TaskPriority } from '@/types';
import ControlBar from '@/components/layout/ControlBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { formatShortDate, getPriorityColor, isToday } from '@/lib/utils';

const Tasks = () => {
  const { tasks, isLoading, updateTask } = useTask();
  const [activeTab, setActiveTab] = useState<string>("all");

  const filterTasks = () => {
    if (activeTab === "all") return tasks;
    if (activeTab === "urgent") return tasks.filter(task => task.priority === TaskPriority.High && task.status !== TaskStatus.Done);
    if (activeTab === "today") {
      return tasks.filter(task => {
        if (!task.dueDate) return false;
        return isToday(new Date(task.dueDate));
      });
    }
    if (activeTab === "completed") return tasks.filter(task => task.status === TaskStatus.Done);
    return tasks;
  };

  const filteredTasks = filterTasks();

  const markTaskCompleted = (taskId: number) => {
    updateTask(taskId, { status: TaskStatus.Done });
  };

  return (
    <main className="flex-1 overflow-y-auto py-8 px-4 md:px-8 bg-softwhite dark:bg-darkbg">
      <ControlBar title="Tasks" subtitle="Manage your tasks and to-dos" />
      
      <div className="glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Task List</h2>
            <Button>
              <span className="material-icons text-sm mr-1">add</span>
              New Task
            </Button>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Tasks</TabsTrigger>
              <TabsTrigger value="urgent">Urgent</TabsTrigger>
              <TabsTrigger value="today">Today</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            
            <TabsContent value={activeTab} className="mt-0">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white dark:bg-darkgray rounded-lg p-4 animate-pulse h-16"></div>
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <p className="mb-2">No tasks found</p>
                      <Button variant="outline" size="sm">
                        <span className="material-icons text-sm mr-1">add</span>
                        Add a task
                      </Button>
                    </div>
                  ) : (
                    filteredTasks.map(task => (
                      <div 
                        key={task.id} 
                        className="bg-white dark:bg-darkgray rounded-lg p-4 flex items-center justify-between shadow-sm"
                      >
                        <div className="flex items-center">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className={`h-6 w-6 rounded-full mr-3 ${
                              task.status === TaskStatus.Done ? 'bg-neongreen text-white' : 'border border-gray-300 dark:border-gray-600'
                            }`}
                            onClick={() => markTaskCompleted(task.id)}
                          >
                            {task.status === TaskStatus.Done && (
                              <span className="material-icons text-xs">check</span>
                            )}
                          </Button>
                          <div>
                            <h4 className={`font-medium ${task.status === TaskStatus.Done ? 'line-through text-gray-400 dark:text-gray-500' : ''}`}>
                              {task.title}
                            </h4>
                            {task.description && (
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {task.description.length > 60 
                                  ? `${task.description.substring(0, 60)}...` 
                                  : task.description}
                              </p>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          {task.dueDate && (
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {formatShortDate(task.dueDate)}
                            </div>
                          )}
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                          <Button variant="ghost" size="icon">
                            <span className="material-icons text-gray-500">more_vert</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Tasks;
