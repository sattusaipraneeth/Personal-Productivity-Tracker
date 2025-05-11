export enum TaskStatus {
  Todo = "todo",
  InProgress = "in-progress",
  Done = "done"
}

export enum TaskPriority {
  Low = "low",
  Medium = "medium",
  High = "high"
}

export interface Task {
  id: number;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate?: Date;
  category?: string;
  project?: string;
  progress: number;
  userId: number;
}

export interface Project {
  id: number;
  name: string;
  description?: string;
  color?: string;
  userId: number;
}

export interface Habit {
  id: number;
  name: string;
  icon?: string;
  color?: string;
  streakCount: number;
  userId: number;
  entries?: HabitEntry[];
}

export interface HabitEntry {
  id: number;
  habitId: number;
  date: Date;
  completed: boolean;
}

export interface Note {
  id: number;
  title: string;
  content?: string;
  tags?: string[];
  lastUpdated?: Date;
  userId: number;
}

export interface Event {
  id: number;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  category?: string;
  color?: string;
  userId: number;
}

export interface Quote {
  id: number;
  text: string;
  author: string;
}

export interface User {
  id: number;
  username: string;
  displayName?: string;
  avatar?: string;
  theme: "light" | "dark";
}

export interface TaskSummary {
  urgent: number;
  inProgress: number;
  completed: number;
  upcoming: number;
  progress: number;
}

export interface DashboardStats {
  taskSummary: TaskSummary;
  habitStreaks: Habit[];
  focusTask?: Task;
  upcomingEvents: Event[];
}
