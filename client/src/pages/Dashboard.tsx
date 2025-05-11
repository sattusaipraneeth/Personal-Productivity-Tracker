import React from 'react';
import ControlBar from '@/components/layout/ControlBar';
import DateTimeWidget from '@/components/dashboard/DateTimeWidget';
import TaskSummaryWidget from '@/components/dashboard/TaskSummaryWidget';
import HabitTrackerWidget from '@/components/dashboard/HabitTrackerWidget';
import MotivationalQuoteWidget from '@/components/dashboard/MotivationalQuoteWidget';
import KanbanBoardSection from '@/components/dashboard/KanbanBoardSection';
import UpcomingScheduleWidget from '@/components/dashboard/UpcomingScheduleWidget';

const Dashboard = () => {
  return (
    <main className="flex-1 overflow-y-auto py-8 px-4 md:px-8 bg-softwhite dark:bg-darkbg">
      <ControlBar title="Dashboard" subtitle="Welcome back, SaiPraneeth!" />
      
      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DateTimeWidget />
        <TaskSummaryWidget />
        <HabitTrackerWidget />
        <MotivationalQuoteWidget />
        <KanbanBoardSection />
        <UpcomingScheduleWidget />
      </div>
    </main>
  );
};

export default Dashboard;
