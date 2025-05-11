import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useTask } from '@/contexts/TaskContext';
import { Task, TaskStatus, TaskPriority } from '@/types';
import { formatShortDate, getPriorityColor, isToday } from '@/lib/utils';

const KanbanBoardSection = () => {
  const { tasks, isLoading, updateTask } = useTask();
  const [selectedProject, setSelectedProject] = useState<string>("all");
  
  // Filter tasks by status
  const getTasks = (status: TaskStatus) => {
    let filteredTasks = tasks.filter(task => task.status === status);
    
    // Additional filter by project if not "all"
    if (selectedProject !== "all") {
      filteredTasks = filteredTasks.filter(task => task.project === selectedProject);
    }
    
    return filteredTasks;
  };

  const todoTasks = getTasks(TaskStatus.Todo);
  const inProgressTasks = getTasks(TaskStatus.InProgress);
  const doneTasks = getTasks(TaskStatus.Done);

  // Extract unique project names from all tasks
  const projectNames = Array.from(new Set(tasks.map(task => task.project).filter(Boolean) as string[]));

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    e.dataTransfer.setData('taskId', task.id.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = parseInt(e.dataTransfer.getData('taskId'));
    if (taskId) {
      updateTask(taskId, { status });
    }
  };

  const getColumnCount = (status: TaskStatus) => {
    return getTasks(status).length;
  };

  return (
    <div className="col-span-full glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Project Kanban</h2>
          <div className="flex items-center space-x-2">
            <Select 
              value={selectedProject} 
              onValueChange={setSelectedProject}
            >
              <SelectTrigger className="text-sm border border-gray-200 dark:border-gray-700 rounded-lg p-2 bg-white dark:bg-darkgray">
                <SelectValue placeholder="All Projects" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Projects</SelectItem>
                {projectNames.map(project => (
                  <SelectItem key={project} value={project}>
                    {project}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="ghost" size="icon" className="p-2 rounded-lg text-royal hover:bg-blue-50 dark:hover:bg-midnight">
              <span className="material-icons">add</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-x-auto">
          {/* To Do Column */}
          <div 
            className="kanban-column bg-gray-50 dark:bg-darkgray rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, TaskStatus.Todo)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">To Do</h3>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full px-2 py-1">
                {getColumnCount(TaskStatus.Todo)}
              </span>
            </div>
            
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white dark:bg-darkbg p-4 rounded-lg shadow-sm animate-pulse h-28"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {todoTasks.map(task => (
                  <div 
                    key={task.id} 
                    className="task-card bg-white dark:bg-darkbg p-4 rounded-lg shadow-sm cursor-grab"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{task.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {task.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      {task.dueDate && (
                        <div className="flex items-center">
                          <span className="material-icons text-gray-400 text-sm mr-1">schedule</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {formatShortDate(task.dueDate)}
                          </span>
                        </div>
                      )}
                      <div className="h-7 w-7 rounded-full bg-royal flex items-center justify-center text-white text-xs">
                        SP
                      </div>
                    </div>
                  </div>
                ))}
                
                {todoTasks.length === 0 && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No tasks to show
                  </div>
                )}
              </div>
            )}
            
            <Button 
              variant="ghost"
              className="w-full mt-4 p-2 text-sm border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-royal hover:text-royal"
            >
              + Add Task
            </Button>
          </div>
          
          {/* In Progress Column */}
          <div 
            className="kanban-column bg-gray-50 dark:bg-darkgray rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, TaskStatus.InProgress)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">In Progress</h3>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full px-2 py-1">
                {getColumnCount(TaskStatus.InProgress)}
              </span>
            </div>
            
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white dark:bg-darkbg p-4 rounded-lg shadow-sm animate-pulse h-28"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {inProgressTasks.map(task => (
                  <div 
                    key={task.id} 
                    className="task-card bg-white dark:bg-darkbg p-4 rounded-lg shadow-sm cursor-grab"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{task.title}</h4>
                      <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {task.description}
                    </p>
                    
                    <div className="mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-600 dark:text-gray-400">Progress</span>
                        <span className="text-xs font-medium">{task.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-royal rounded-full" 
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      {task.dueDate && (
                        <div className="flex items-center">
                          <span className="material-icons text-gray-400 text-sm mr-1">schedule</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {isToday(task.dueDate) ? 'Today' : formatShortDate(task.dueDate)}
                          </span>
                        </div>
                      )}
                      <div className="h-7 w-7 rounded-full bg-royal flex items-center justify-center text-white text-xs">
                        SP
                      </div>
                    </div>
                  </div>
                ))}
                
                {inProgressTasks.length === 0 && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No tasks in progress
                  </div>
                )}
              </div>
            )}
            
            <Button 
              variant="ghost"
              className="w-full mt-4 p-2 text-sm border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-royal hover:text-royal"
            >
              + Add Task
            </Button>
          </div>
          
          {/* Done Column */}
          <div 
            className="kanban-column bg-gray-50 dark:bg-darkgray rounded-lg p-4"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, TaskStatus.Done)}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Done</h3>
              <span className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 text-xs rounded-full px-2 py-1">
                {getColumnCount(TaskStatus.Done)}
              </span>
            </div>
            
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white dark:bg-darkbg p-4 rounded-lg shadow-sm animate-pulse h-28"></div>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {doneTasks.map(task => (
                  <div 
                    key={task.id} 
                    className="task-card bg-white dark:bg-darkbg p-4 rounded-lg shadow-sm cursor-grab"
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                  >
                    <div className="flex justify-between items-start">
                      <h4 className="font-medium">{task.title}</h4>
                      <span className="bg-green-100 dark:bg-green-900 text-neongreen text-xs px-2 py-1 rounded-full">
                        Completed
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                      {task.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      {task.dueDate && (
                        <div className="flex items-center">
                          <span className="material-icons text-gray-400 text-sm mr-1">schedule</span>
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {formatShortDate(task.dueDate)}
                          </span>
                        </div>
                      )}
                      <div className="h-7 w-7 rounded-full bg-royal flex items-center justify-center text-white text-xs">
                        SP
                      </div>
                    </div>
                  </div>
                ))}
                
                {doneTasks.length === 0 && (
                  <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No completed tasks
                  </div>
                )}
              </div>
            )}
            
            <Button 
              variant="ghost"
              className="w-full mt-4 p-2 text-sm border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-royal hover:text-royal"
            >
              + Add Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoardSection;
