import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Habit, HabitEntry } from '@/types';

interface HabitContextType {
  habits: Habit[];
  isLoading: boolean;
  error: Error | null;
  addHabit: (habit: Omit<Habit, 'id'>) => Promise<Habit>;
  updateHabit: (id: number, habit: Partial<Habit>) => Promise<Habit>;
  deleteHabit: (id: number) => Promise<void>;
  markHabitComplete: (habitId: number, date: Date, completed: boolean) => Promise<HabitEntry>;
  getHabitEntries: (habitId: number, startDate: Date, endDate: Date) => Promise<HabitEntry[]>;
}

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export function HabitProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  
  const { data: habits = [], isLoading, error } = useQuery<Habit[], Error>({
    queryKey: ['/api/habits'],
  });

  const addHabitMutation = useMutation({
    mutationFn: (newHabit: Omit<Habit, 'id'>) => 
      apiRequest('POST', '/api/habits', newHabit)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/habits'] });
    }
  });

  const updateHabitMutation = useMutation({
    mutationFn: ({ id, habit }: { id: number, habit: Partial<Habit> }) => 
      apiRequest('PATCH', `/api/habits/${id}`, habit)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/habits'] });
    }
  });

  const deleteHabitMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest('DELETE', `/api/habits/${id}`)
        .then(() => {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/habits'] });
    }
  });

  const markHabitCompleteMutation = useMutation({
    mutationFn: ({ habitId, date, completed }: { habitId: number, date: Date, completed: boolean }) => 
      apiRequest('POST', `/api/habits/${habitId}/entries`, { date, completed })
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/habits'] });
    }
  });

  const addHabit = async (habit: Omit<Habit, 'id'>) => {
    return addHabitMutation.mutateAsync(habit);
  };

  const updateHabit = async (id: number, habit: Partial<Habit>) => {
    return updateHabitMutation.mutateAsync({ id, habit });
  };

  const deleteHabit = async (id: number) => {
    return deleteHabitMutation.mutateAsync(id);
  };

  const markHabitComplete = async (habitId: number, date: Date, completed: boolean) => {
    return markHabitCompleteMutation.mutateAsync({ habitId, date, completed });
  };

  const getHabitEntries = async (habitId: number, startDate: Date, endDate: Date) => {
    const response = await fetch(`/api/habits/${habitId}/entries?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {
      credentials: 'include'
    });
    return await response.json();
  };

  return (
    <HabitContext.Provider value={{
      habits,
      isLoading,
      error,
      addHabit,
      updateHabit,
      deleteHabit,
      markHabitComplete,
      getHabitEntries
    }}>
      {children}
    </HabitContext.Provider>
  );
}

export function useHabit() {
  const context = useContext(HabitContext);
  if (context === undefined) {
    throw new Error('useHabit must be used within a HabitProvider');
  }
  return context;
}
