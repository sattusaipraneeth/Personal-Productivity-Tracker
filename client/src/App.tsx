import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { TaskProvider } from "@/contexts/TaskContext";
import { HabitProvider } from "@/contexts/HabitContext";
import { ScheduleProvider } from "@/contexts/ScheduleContext";

import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import Tasks from "@/pages/Tasks";
import Projects from "@/pages/Projects";
import Habits from "@/pages/Habits";
import Notes from "@/pages/Notes";
import Calendar from "@/pages/Calendar";
import Analytics from "@/pages/Analytics";
import Profile from "@/pages/Profile";
import Sidebar from "@/components/layout/Sidebar";

function Router() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/tasks" component={Tasks} />
        <Route path="/projects" component={Projects} />
        <Route path="/habits" component={Habits} />
        <Route path="/notes" component={Notes} />
        <Route path="/calendar" component={Calendar} />
        <Route path="/analytics" component={Analytics} />
        <Route path="/profile" component={Profile} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TaskProvider>
          <HabitProvider>
            <ScheduleProvider>
              <Router />
              <Toaster />
            </ScheduleProvider>
          </HabitProvider>
        </TaskProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
