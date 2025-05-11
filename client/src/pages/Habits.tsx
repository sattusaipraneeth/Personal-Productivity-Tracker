import React from 'react';
import { useHabit } from '@/contexts/HabitContext';
import ControlBar from '@/components/layout/ControlBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Habits = () => {
  const { habits, isLoading } = useHabit();
  
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

  const weekDays = generateLastWeekDays();
  
  return (
    <main className="flex-1 overflow-y-auto py-8 px-4 md:px-8 bg-softwhite dark:bg-darkbg">
      <ControlBar title="Habits" subtitle="Track your daily habits and build consistency" />
      
      <div className="glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden mb-6">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Habit Tracker</h2>
            <Button>
              <span className="material-icons text-sm mr-1">add</span>
              New Habit
            </Button>
          </div>
          
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="all">All Habits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="active" className="mt-0">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white dark:bg-darkgray rounded-lg p-4 animate-pulse h-28"></div>
                  ))}
                </div>
              ) : (
                habits.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p className="mb-2">You don't have any active habits yet</p>
                    <Button variant="outline" size="sm">
                      <span className="material-icons text-sm mr-1">add</span>
                      Start tracking a habit
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {habits.map(habit => (
                      <Card key={habit.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                              <span className={`material-icons text-2xl mr-3 ${habit.color || 'text-neongreen'}`}>
                                {habit.icon || 'star'}
                              </span>
                              <div>
                                <h3 className="font-medium text-lg">{habit.name}</h3>
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                  <span className="material-icons text-sunset text-sm mr-1">local_fire_department</span>
                                  <span className="text-sm">{habit.streakCount} day streak</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <span className="material-icons">more_vert</span>
                            </Button>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm text-gray-600 dark:text-gray-400">Last 7 days</p>
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                              {weekDays.map((day, idx) => (
                                <div key={idx} className="text-center">
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                                  </p>
                                  <div className="mx-auto h-10 w-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <span className="material-icons text-gray-400 dark:text-gray-500">check</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )
              )}
            </TabsContent>
            
            <TabsContent value="completed" className="mt-0">
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>No completed habits yet</p>
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="mt-0">
              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="bg-white dark:bg-darkgray rounded-lg p-4 animate-pulse h-28"></div>
                  ))}
                </div>
              ) : (
                habits.length === 0 ? (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <p className="mb-2">You don't have any habits yet</p>
                    <Button variant="outline" size="sm">
                      <span className="material-icons text-sm mr-1">add</span>
                      Start tracking a habit
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {habits.map(habit => (
                      <Card key={habit.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                              <span className={`material-icons text-2xl mr-3 ${habit.color || 'text-neongreen'}`}>
                                {habit.icon || 'star'}
                              </span>
                              <div>
                                <h3 className="font-medium text-lg">{habit.name}</h3>
                                <div className="flex items-center text-gray-500 dark:text-gray-400">
                                  <span className="material-icons text-sunset text-sm mr-1">local_fire_department</span>
                                  <span className="text-sm">{habit.streakCount} day streak</span>
                                </div>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <span className="material-icons">more_vert</span>
                            </Button>
                          </div>
                          
                          <div className="mt-4">
                            <div className="flex justify-between items-center mb-2">
                              <p className="text-sm text-gray-600 dark:text-gray-400">Last 7 days</p>
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                              {weekDays.map((day, idx) => (
                                <div key={idx} className="text-center">
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    {day.toLocaleDateString('en-US', { weekday: 'short' })}
                                  </p>
                                  <div className="mx-auto h-10 w-10 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                                    <span className="material-icons text-gray-400 dark:text-gray-500">check</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Habits;
