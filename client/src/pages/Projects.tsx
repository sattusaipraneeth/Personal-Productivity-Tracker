import React from 'react';
import ControlBar from '@/components/layout/ControlBar';
import KanbanBoardSection from '@/components/dashboard/KanbanBoardSection';

const Projects = () => {
  return (
    <main className="flex-1 overflow-y-auto py-8 px-4 md:px-8 bg-softwhite dark:bg-darkbg">
      <ControlBar title="Projects" subtitle="Manage your projects and workflows" />
      
      <KanbanBoardSection />
    </main>
  );
};

export default Projects;
