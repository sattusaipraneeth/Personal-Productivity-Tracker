import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  avatar: text("avatar"),
  theme: text("theme").default("light"),
});

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  status: text("status").notNull().default("pending"),
  priority: text("priority").notNull().default("medium"),
  dueDate: timestamp("due_date"),
  category: text("category"),
  project: text("project"),
  progress: integer("progress").default(0),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  color: text("color"),
});

export const habits = pgTable("habits", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  name: text("name").notNull(),
  icon: text("icon"),
  color: text("color"),
  streakCount: integer("streak_count").default(0),
});

export const habitEntries = pgTable("habit_entries", {
  id: serial("id").primaryKey(),
  habitId: integer("habit_id").notNull(),
  date: timestamp("date").notNull(),
  completed: boolean("completed").default(false),
});

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  content: text("content"),
  tags: jsonb("tags").$type<string[]>(),
  lastUpdated: timestamp("last_updated"),
});

export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  startTime: timestamp("start_time").notNull(),
  endTime: timestamp("end_time").notNull(),
  category: text("category"),
  color: text("color"),
});

export const quotes = pgTable("quotes", {
  id: serial("id").primaryKey(),
  text: text("text").notNull(),
  author: text("author").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  avatar: true,
  theme: true,
});

export const insertTaskSchema = createInsertSchema(tasks).pick({
  userId: true,
  title: true,
  description: true,
  status: true,
  priority: true,
  dueDate: true,
  category: true,
  project: true,
  progress: true,
});

export const insertProjectSchema = createInsertSchema(projects).pick({
  userId: true,
  name: true,
  description: true,
  color: true,
});

export const insertHabitSchema = createInsertSchema(habits).pick({
  userId: true,
  name: true,
  icon: true,
  color: true,
  streakCount: true,
});

export const insertHabitEntrySchema = createInsertSchema(habitEntries).pick({
  habitId: true,
  date: true,
  completed: true,
});

export const insertNoteSchema = createInsertSchema(notes).pick({
  userId: true,
  title: true,
  content: true,
  tags: true,
  lastUpdated: true,
});

export const insertEventSchema = createInsertSchema(events).pick({
  userId: true,
  title: true,
  description: true,
  startTime: true,
  endTime: true,
  category: true,
  color: true,
});

export const insertQuoteSchema = createInsertSchema(quotes).pick({
  text: true,
  author: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTask = z.infer<typeof insertTaskSchema>;
export type Task = typeof tasks.$inferSelect;

export type InsertProject = z.infer<typeof insertProjectSchema>;
export type Project = typeof projects.$inferSelect;

export type InsertHabit = z.infer<typeof insertHabitSchema>;
export type Habit = typeof habits.$inferSelect;

export type InsertHabitEntry = z.infer<typeof insertHabitEntrySchema>;
export type HabitEntry = typeof habitEntries.$inferSelect;

export type InsertNote = z.infer<typeof insertNoteSchema>;
export type Note = typeof notes.$inferSelect;

export type InsertEvent = z.infer<typeof insertEventSchema>;
export type Event = typeof events.$inferSelect;

export type InsertQuote = z.infer<typeof insertQuoteSchema>;
export type Quote = typeof quotes.$inferSelect;
