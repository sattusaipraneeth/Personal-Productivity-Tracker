import React, { useState } from 'react';
import { format, addHours, isToday } from 'date-fns';
import { Button } from '@/components/ui/button';
import { useSchedule } from '@/contexts/ScheduleContext';
import { formatTime } from '@/lib/utils';
import { Event } from '@/types';

type ViewMode = 'today' | 'week' | 'month';

const UpcomingScheduleWidget = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('today');
  const { events, isLoading } = useSchedule();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // Get events for today only for simplicity
  const todayEvents = events.filter(event => {
    const eventDate = new Date(event.startTime);
    eventDate.setHours(0, 0, 0, 0);
    return eventDate.getTime() === today.getTime();
  });

  // For display purposes generate hours for today
  const hours = [];
  for (let i = 9; i <= 14; i++) {
    hours.push(i);
  }

  // Utility to calculate top position for events
  const calculateEventPosition = (startTime: Date) => {
    const hour = startTime.getHours();
    const minute = startTime.getMinutes();
    // Starting from 9 AM (position 0)
    const hourPosition = (hour - 9) * 56; // 56px per hour (14px height * 4 rows)
    const minutePosition = (minute / 60) * 56;
    return hourPosition + minutePosition + 32; // 32px for the top padding
  };

  // Utility to calculate height for events
  const calculateEventHeight = (startTime: Date, endTime: Date) => {
    const durationMs = endTime.getTime() - startTime.getTime();
    const durationHours = durationMs / (1000 * 60 * 60);
    return durationHours * 56; // 56px per hour
  };

  return (
    <div className="col-span-full glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Upcoming Schedule</h2>
          <div className="flex space-x-2">
            <Button 
              variant={viewMode === 'today' ? 'default' : 'outline'}
              size="sm" 
              onClick={() => setViewMode('today')}
            >
              Today
            </Button>
            <Button 
              variant={viewMode === 'week' ? 'default' : 'outline'}
              size="sm" 
              onClick={() => setViewMode('week')}
            >
              Week
            </Button>
            <Button 
              variant={viewMode === 'month' ? 'default' : 'outline'}
              size="sm" 
              onClick={() => setViewMode('month')}
            >
              Month
            </Button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <div className="min-w-max grid grid-cols-8 gap-4">
            {/* Time Indicators */}
            <div className="text-gray-500 dark:text-gray-400 text-sm space-y-14 pt-8">
              {hours.map(hour => (
                <div key={hour}>
                  {hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                </div>
              ))}
            </div>
            
            {/* Day Schedule */}
            <div className="col-span-7 relative">
              {/* Time Grid Lines */}
              <div className="absolute left-0 right-0 top-0 bottom-0 grid grid-rows-6 gap-0 pointer-events-none">
                {hours.map((hour, idx) => (
                  <div key={idx} className="border-t border-gray-200 dark:border-gray-700 h-14"></div>
                ))}
              </div>
              
              {isLoading ? (
                <div className="absolute top-8 left-0 right-0 space-y-4">
                  <div className="h-20 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-r"></div>
                  <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-r"></div>
                  <div className="h-16 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-r"></div>
                </div>
              ) : (
                <>
                  {/* Sample events for demonstration */}
                  <div className="absolute top-8 left-0 right-0 h-24 bg-royal bg-opacity-20 border-l-4 border-royal rounded-r p-2 text-royal">
                    <h4 className="font-medium">Design Review</h4>
                    <div className="flex items-center text-xs mt-1">
                      <span className="material-icons text-sm mr-1">schedule</span>
                      9:30 - 10:30 AM
                    </div>
                    <div className="flex items-center text-xs mt-1">
                      <span className="material-icons text-sm mr-1">people</span>
                      Design Team
                    </div>
                  </div>
                  
                  <div className="absolute top-44 left-0 right-0 h-14 bg-sunset bg-opacity-20 border-l-4 border-sunset rounded-r p-2 text-sunset">
                    <h4 className="font-medium">Client Meeting</h4>
                    <div className="flex items-center text-xs mt-1">
                      <span className="material-icons text-sm mr-1">schedule</span>
                      11:00 - 11:30 AM
                    </div>
                  </div>
                  
                  <div className="absolute top-72 left-0 right-0 h-14 bg-gray-200 dark:bg-gray-700 border-l-4 border-gray-400 dark:border-gray-500 rounded-r p-2 text-gray-700 dark:text-gray-300">
                    <h4 className="font-medium">Lunch Break</h4>
                    <div className="flex items-center text-xs mt-1">
                      <span className="material-icons text-sm mr-1">schedule</span>
                      12:00 - 1:00 PM
                    </div>
                  </div>
                  
                  <div className="absolute top-96 left-0 right-0 h-24 bg-neongreen bg-opacity-20 border-l-4 border-neongreen rounded-r p-2 text-neongreen">
                    <h4 className="font-medium">Coding Session</h4>
                    <div className="flex items-center text-xs mt-1">
                      <span className="material-icons text-sm mr-1">schedule</span>
                      1:30 - 2:30 PM
                    </div>
                    <div className="flex items-center text-xs mt-1">
                      <span className="material-icons text-sm mr-1">computer</span>
                      Frontend Development
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingScheduleWidget;
