import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isSameDay, isSameMonth } from "date-fns";
import { TaskPriority, TaskStatus } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string | number): string {
  if (!date) return '';
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return format(dateObj, 'EEEE, MMMM d');
}

export function formatTime(date: Date | string | number): string {
  if (!date) return '';
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return format(dateObj, 'h:mm a');
}

export function formatDateTime(date: Date | string | number): string {
  if (!date) return '';
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return format(dateObj, 'MMM d, yyyy h:mm a');
}

export function formatShortDate(date: Date | string | number): string {
  if (!date) return '';
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return format(dateObj, 'MMM d');
}

export function isToday(date: Date | string | number): boolean {
  if (!date) return false;
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return isSameDay(dateObj, new Date());
}

export function isCurrentMonth(date: Date | string | number): boolean {
  if (!date) return false;
  const dateObj = typeof date === 'string' || typeof date === 'number' ? new Date(date) : date;
  return isSameMonth(dateObj, new Date());
}

export function getPriorityColor(priority: TaskPriority): string {
  switch (priority) {
    case TaskPriority.High:
      return 'text-sunset bg-sunset bg-opacity-10';
    case TaskPriority.Medium:
      return 'text-royal bg-blue-100 dark:bg-blue-900';
    case TaskPriority.Low:
      return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
    default:
      return 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800';
  }
}

export function getStatusColor(status: TaskStatus): string {
  switch (status) {
    case TaskStatus.Todo:
      return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
    case TaskStatus.InProgress:
      return 'bg-royal bg-opacity-20 text-royal border-royal';
    case TaskStatus.Done:
      return 'bg-green-100 dark:bg-green-900 text-neongreen border-neongreen';
    default:
      return 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300';
  }
}

export function getInitials(name: string | undefined): string {
  if (!name) return 'U';
  
  const words = name.trim().split(/\s+/);
  
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}

export function generateAvatar(name: string | undefined): string {
  const initials = getInitials(name || 'User');
  const colors = ['#1B1F3B', '#4A90E2', '#4CAF50', '#FF7043', '#9C27B0', '#3F51B5'];
  
  // Simple hash function to get consistent color for the same name
  let hash = 0;
  for (let i = 0; i < (name || 'User').length; i++) {
    hash = (name || 'User').charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const color = colors[Math.abs(hash) % colors.length];
  
  return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="${encodeURIComponent(color)}"/><text x="50" y="50" font-family="Arial" font-size="40" font-weight="bold" text-anchor="middle" dominant-baseline="central" fill="white">${initials}</text></svg>`;
}
