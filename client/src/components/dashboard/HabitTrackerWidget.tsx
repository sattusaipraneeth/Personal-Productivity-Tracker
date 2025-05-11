import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useHabit } from '@/contexts/HabitContext';
import { isToday, formatShortDate } from '@/lib/utils';

const HabitTrackerWidget = () => {
  const { habits, isLoading, markHabitComplete } = useHabit();

  // Generate last 7 days for habit tracking
  const generateLastWeekDays = () => {
    const days = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(today.getDate() - i);
      days.push(date);
    }
    
    return days;
  };

  const lastWeekDays = generateLastWeekDays();
  
  // Determine if a habit was completed on a given day
  const wasHabitCompleted = (habit: any, date: Date) => {
    if (!habit.entries) return false;
    
    const dateString = date.toISOString().split('T')[0];
    return habit.entries.some((entry: any) => 
      entry.completed && entry.date.split('T')[0] === dateString
    );
  };

  const handleToggleHabit = async (habitId: number, date: Date, currentState: boolean) => {
    try {
      await markHabitComplete(habitId, date, !currentState);
    } catch (error) {
      console.error('Failed to toggle habit:', error);
    }
  };

  return (
    <div className="glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold">Habit Streaks</h2>
          <Button variant="link" className="text-royal text-sm font-medium p-0">View All</Button>
        </div>
        
        {isLoading ? (
          <div className="space-y-4">
            <div className="h-14 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-14 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-14 animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          </div>
        ) : (
          <div className="space-y-4">
            {habits.slice(0, 3).map((habit) => (
              <div key={habit.id}>
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="material-icons text-neongreen mr-2">
                      {habit.icon || 'star'}
                    </span>
                    <p>{habit.name}</p>
                  </div>
                  <div className="flex items-center">
                    <span className="material-icons text-sunset mr-1">local_fire_department</span>
                    <p className="font-medium">{habit.streakCount}</p>
                  </div>
                </div>
                <div className="flex space-x-1">
                  {lastWeekDays.map((day, index) => {
                    const completed = wasHabitCompleted(habit, day);
                    const isToday = new Date().toDateString() === day.toDateString();
                    
                    return (
                      <button
                        key={index}
                        className={`h-6 w-6 rounded-md flex items-center justify-center text-xs ${
                          completed 
                            ? `bg-${habit.color || 'neongreen'} text-white` 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500'
                        }`}
                        onClick={() => {
                          if (isToday) {
                            handleToggleHabit(habit.id, day, completed);
                          }
                        }}
                        disabled={!isToday}
                      >
                        {completed ? '✓' : isToday ? '?' : '○'}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            
            {habits.length === 0 && (
              <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                <p>No habits tracked yet.</p>
                <p className="text-sm mt-2">Start building consistent habits today!</p>
              </div>
            )}
          </div>
        )}
        
        <Button 
          variant="outline"
          className="w-full mt-6 p-2 text-sm"
        >
          Add New Habit
        </Button>
      </div>
    </div>
  );
};

export default HabitTrackerWidget;
