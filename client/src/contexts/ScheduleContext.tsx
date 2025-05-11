import React, { createContext, useContext, ReactNode } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { Event } from '@/types';

interface ScheduleContextType {
  events: Event[];
  isLoading: boolean;
  error: Error | null;
  addEvent: (event: Omit<Event, 'id'>) => Promise<Event>;
  updateEvent: (id: number, event: Partial<Event>) => Promise<Event>;
  deleteEvent: (id: number) => Promise<void>;
  getEventsByDateRange: (startDate: Date, endDate: Date) => Promise<Event[]>;
  getTodayEvents: () => Event[];
}

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();
  
  const { data: events = [], isLoading, error } = useQuery<Event[], Error>({
    queryKey: ['/api/events'],
  });

  const addEventMutation = useMutation({
    mutationFn: (newEvent: Omit<Event, 'id'>) => 
      apiRequest('POST', '/api/events', newEvent)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
    }
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, event }: { id: number, event: Partial<Event> }) => 
      apiRequest('PATCH', `/api/events/${id}`, event)
        .then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
    }
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest('DELETE', `/api/events/${id}`)
        .then(() => {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/events'] });
    }
  });

  const addEvent = async (event: Omit<Event, 'id'>) => {
    return addEventMutation.mutateAsync(event);
  };

  const updateEvent = async (id: number, event: Partial<Event>) => {
    return updateEventMutation.mutateAsync({ id, event });
  };

  const deleteEvent = async (id: number) => {
    return deleteEventMutation.mutateAsync(id);
  };

  const getEventsByDateRange = async (startDate: Date, endDate: Date) => {
    const response = await fetch(`/api/events?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`, {
      credentials: 'include'
    });
    return await response.json();
  };

  const getTodayEvents = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    return events.filter(event => {
      const eventDate = new Date(event.startTime);
      return eventDate >= today && eventDate < tomorrow;
    });
  };

  return (
    <ScheduleContext.Provider value={{
      events,
      isLoading,
      error,
      addEvent,
      updateEvent,
      deleteEvent,
      getEventsByDateRange,
      getTodayEvents
    }}>
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
}
