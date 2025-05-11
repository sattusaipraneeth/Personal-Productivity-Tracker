import React, { useState } from 'react';
import ControlBar from '@/components/layout/ControlBar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UpcomingScheduleWidget from '@/components/dashboard/UpcomingScheduleWidget';

const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  return (
    <main className="flex-1 overflow-y-auto py-8 px-4 md:px-8 bg-softwhite dark:bg-darkbg">
      <ControlBar title="Calendar" subtitle="Schedule and manage your events" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden lg:col-span-1">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Calendar</h2>
              <Button>
                <span className="material-icons text-sm mr-1">add</span>
                New Event
              </Button>
            </div>
            
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border border-gray-200 dark:border-gray-700"
            />
            
            <div className="mt-6 space-y-4">
              <h3 className="font-medium">Upcoming Events</h3>
              
              <div className="bg-white dark:bg-darkgray rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Team Meeting</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">10:00 - 11:00 AM</p>
                  </div>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-royal bg-opacity-20 text-royal">
                    Work
                  </span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-darkgray rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Lunch with David</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">12:30 - 1:30 PM</p>
                  </div>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-green-100 dark:bg-green-900 text-neongreen">
                    Personal
                  </span>
                </div>
              </div>
              
              <div className="bg-white dark:bg-darkgray rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">Project Review</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">3:00 - 4:30 PM</p>
                  </div>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-royal bg-opacity-20 text-royal">
                    Work
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-2 glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Schedule</h2>
              <Tabs defaultValue="day" className="w-auto">
                <TabsList>
                  <TabsTrigger value="day">Day</TabsTrigger>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            <div className="overflow-x-auto">
              <div className="min-w-max grid grid-cols-8 gap-4">
                {/* Time Indicators */}
                <div className="text-gray-500 dark:text-gray-400 text-sm space-y-14 pt-8">
                  <div>9 AM</div>
                  <div>10 AM</div>
                  <div>11 AM</div>
                  <div>12 PM</div>
                  <div>1 PM</div>
                  <div>2 PM</div>
                  <div>3 PM</div>
                  <div>4 PM</div>
                  <div>5 PM</div>
                </div>
                
                {/* Day Schedule */}
                <div className="col-span-7 relative">
                  {/* Time Grid Lines */}
                  <div className="absolute left-0 right-0 top-0 bottom-0 grid grid-rows-9 gap-0 pointer-events-none">
                    {[...Array(9)].map((_, idx) => (
                      <div key={idx} className="border-t border-gray-200 dark:border-gray-700 h-14"></div>
                    ))}
                  </div>
                  
                  {/* Event - Team Meeting */}
                  <div className="absolute top-8 left-0 right-0 h-24 bg-royal bg-opacity-20 border-l-4 border-royal rounded-r p-2 text-royal">
                    <h4 className="font-medium">Team Meeting</h4>
                    <div className="flex items-center text-xs mt-1">
                      <span className="material-icons text-sm mr-1">schedule</span>
                      10:00 - 11:00 AM
                    </div>
                    <div className="flex items-center text-xs mt-1">
                      <span className="material-icons text-sm mr-1">people</span>
                      Marketing Team
                    </div>
                  </div>
                  
                  {/* Event - Lunch */}
                  <div className="absolute top-44 left-0 right-0 h-14 bg-green-100 dark:bg-green-900 border-l-4 border-neongreen rounded-r p-2 text-neongreen">
                    <h4 className="font-medium">Lunch with David</h4>
                    <div className="flex items-center text-xs mt-1">
                      <span className="material-icons text-sm mr-1">schedule</span>
                      12:30 - 1:30 PM
                    </div>
                  </div>
                  
                  {/* Event - Project Review */}
                  <div className="absolute top-96 left-0 right-0 h-24 bg-royal bg-opacity-20 border-l-4 border-royal rounded-r p-2 text-royal">
                    <h4 className="font-medium">Project Review</h4>
                    <div className="flex items-center text-xs mt-1">
                      <span className="material-icons text-sm mr-1">schedule</span>
                      3:00 - 4:30 PM
                    </div>
                    <div className="flex items-center text-xs mt-1">
                      <span className="material-icons text-sm mr-1">description</span>
                      Q2 Project Review
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calendar;
