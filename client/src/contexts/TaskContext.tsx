import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Task, TaskStatus, TaskPriority, TaskSummary } from '@/types';

interface TaskContextType {
  tasks: Task[];
  isLoading: boolean;
  error: Error | null;
  addTask: (task: Omit<Task, 'id'>) => Promise<Task>;
  updateTask: (id: number, task: Partial<Task>) => Promise<Task>;
  deleteTask: (id: number) => Promise<void>;
  getTasks: () => Promise<Task[]>;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getTasksByProject: (projectId: string) => Task[];
  getTaskSummary: () => TaskSummary;
  getFocusedTask: () => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  
  const { data: tasks = [], isLoading, error } = useQuery<Task[], Error>({
    queryKey: ['/api/tasks'],
  });

  const addTaskMutation = useMutation({
    mutationFn: (newTask: Omit<Task, 'id'>) => 
      apiRequest('POST', '/api/tasks', newTask)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    }
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ id, task }: { id: number, task: Partial<Task> }) => 
      apiRequest('PATCH', `/api/tasks/${id}`, task)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    }
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest('DELETE', `/api/tasks/${id}`)
        .then(() => {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tasks'] });
    }
  });

  const addTask = async (task: Omit<Task, 'id'>) => {
    return addTaskMutation.mutateAsync(task);
  };

  const updateTask = async (id: number, task: Partial<Task>) => {
    return updateTaskMutation.mutateAsync({ id, task });
  };

  const deleteTask = async (id: number) => {
    return deleteTaskMutation.mutateAsync(id);
  };

  const getTasks = async (): Promise<Task[]> => {
    const response = await fetch('/api/tasks', { credentials: 'include' });
    return await response.json();
  };

  const getTasksByStatus = (status: TaskStatus): Task[] => {
    return tasks.filter(task => task.status === status);
  };

  const getTasksByProject = (projectId: string): Task[] => {
    return tasks.filter(task => task.project === projectId);
  };

  const getTaskSummary = (): TaskSummary => {
    const urgent = tasks.filter(task => task.priority === TaskPriority.High && task.status !== TaskStatus.Done).length;
    const inProgress = tasks.filter(task => task.status === TaskStatus.InProgress).length;
    const completed = tasks.filter(task => task.status === TaskStatus.Done).length;
    const upcoming = tasks.filter(task => task.status === TaskStatus.Todo).length;
    
    const totalTasks = urgent + inProgress + completed + upcoming;
    const progress = totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

    return {
      urgent,
      inProgress,
      completed,
      upcoming,
      progress
    };
  };

  const getFocusedTask = (): Task | undefined => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Find tasks due today with high priority first
    const todayHighPriorityTasks = tasks.filter(task => 
      task.status !== TaskStatus.Done && 
      task.priority === TaskPriority.High && 
      task.dueDate && 
      new Date(task.dueDate).setHours(0, 0, 0, 0) === today.getTime()
    );
    
    if (todayHighPriorityTasks.length > 0) {
      return todayHighPriorityTasks[0];
    }
    
    // Then any task due today
    const todayTasks = tasks.filter(task => 
      task.status !== TaskStatus.Done && 
      task.dueDate && 
      new Date(task.dueDate).setHours(0, 0, 0, 0) === today.getTime()
    );
    
    if (todayTasks.length > 0) {
      return todayTasks[0];
    }
    
    // Finally, any high priority task
    const highPriorityTasks = tasks.filter(task => 
      task.status !== TaskStatus.Done && 
      task.priority === TaskPriority.High
    );
    
    if (highPriorityTasks.length > 0) {
      return highPriorityTasks[0];
    }
    
    return undefined;
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      isLoading,
      error,
      addTask,
      updateTask,
      deleteTask,
      getTasks,
      getTasksByStatus,
      getTasksByProject,
      getTaskSummary,
      getFocusedTask
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}
