import { 
  User, InsertUser, Task, InsertTask, Project, InsertProject, 
  Habit, InsertHabit, HabitEntry, InsertHabitEntry, 
  Note, InsertNote, Event, InsertEvent, Quote, InsertQuote
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;
  
  // Task operations
  getTask(id: number): Promise<Task | undefined>;
  getAllTasks(): Promise<Task[]>;
  getTasksByUserId(userId: number): Promise<Task[]>;
  createTask(task: InsertTask): Promise<Task>;
  updateTask(id: number, task: Partial<Task>): Promise<Task | undefined>;
  deleteTask(id: number): Promise<void>;
  
  // Project operations
  getProject(id: number): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  getProjectsByUserId(userId: number): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<Project>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<void>;
  
  // Habit operations
  getHabit(id: number): Promise<Habit | undefined>;
  getAllHabits(): Promise<Habit[]>;
  getHabitsByUserId(userId: number): Promise<Habit[]>;
  createHabit(habit: InsertHabit): Promise<Habit>;
  updateHabit(id: number, habit: Partial<Habit>): Promise<Habit | undefined>;
  deleteHabit(id: number): Promise<void>;
  
  // Habit entry operations
  getHabitEntry(id: number): Promise<HabitEntry | undefined>;
  getHabitEntriesByHabitId(habitId: number): Promise<HabitEntry[]>;
  getHabitEntriesByDateRange(habitId: number, startDate?: Date, endDate?: Date): Promise<HabitEntry[]>;
  createHabitEntry(entry: InsertHabitEntry): Promise<HabitEntry>;
  updateHabitEntry(id: number, entry: Partial<HabitEntry>): Promise<HabitEntry | undefined>;
  
  // Note operations
  getNote(id: number): Promise<Note | undefined>;
  getAllNotes(): Promise<Note[]>;
  getNotesByUserId(userId: number): Promise<Note[]>;
  createNote(note: InsertNote): Promise<Note>;
  updateNote(id: number, note: Partial<Note>): Promise<Note | undefined>;
  deleteNote(id: number): Promise<void>;
  
  // Event operations
  getEvent(id: number): Promise<Event | undefined>;
  getAllEvents(): Promise<Event[]>;
  getEventsByUserId(userId: number): Promise<Event[]>;
  getEventsByDateRange(startDate: Date, endDate: Date): Promise<Event[]>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: number, event: Partial<Event>): Promise<Event | undefined>;
  deleteEvent(id: number): Promise<void>;
  
  // Quote operations
  getQuote(id: number): Promise<Quote | undefined>;
  getAllQuotes(): Promise<Quote[]>;
  getRandomQuote(): Promise<Quote>;
  createQuote(quote: InsertQuote): Promise<Quote>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tasks: Map<number, Task>;
  private projects: Map<number, Project>;
  private habits: Map<number, Habit>;
  private habitEntries: Map<number, HabitEntry>;
  private notes: Map<number, Note>;
  private events: Map<number, Event>;
  private quotes: Map<number, Quote>;
  
  private userIdCounter: number;
  private taskIdCounter: number;
  private projectIdCounter: number;
  private habitIdCounter: number;
  private habitEntryIdCounter: number;
  private noteIdCounter: number;
  private eventIdCounter: number;
  private quoteIdCounter: number;

  constructor() {
    this.users = new Map();
    this.tasks = new Map();
    this.projects = new Map();
    this.habits = new Map();
    this.habitEntries = new Map();
    this.notes = new Map();
    this.events = new Map();
    this.quotes = new Map();
    
    this.userIdCounter = 1;
    this.taskIdCounter = 1;
    this.projectIdCounter = 1;
    this.habitIdCounter = 1;
    this.habitEntryIdCounter = 1;
    this.noteIdCounter = 1;
    this.eventIdCounter = 1;
    this.quoteIdCounter = 1;
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  // Task operations
  async getTask(id: number): Promise<Task | undefined> {
    return this.tasks.get(id);
  }

  async getAllTasks(): Promise<Task[]> {
    return Array.from(this.tasks.values());
  }

  async getTasksByUserId(userId: number): Promise<Task[]> {
    return Array.from(this.tasks.values()).filter(
      (task) => task.userId === userId,
    );
  }

  async createTask(insertTask: InsertTask): Promise<Task> {
    const id = this.taskIdCounter++;
    const task: Task = { ...insertTask, id };
    this.tasks.set(id, task);
    return task;
  }

  async updateTask(id: number, taskUpdate: Partial<Task>): Promise<Task | undefined> {
    const task = this.tasks.get(id);
    if (!task) return undefined;
    
    const updatedTask: Task = { ...task, ...taskUpdate };
    this.tasks.set(id, updatedTask);
    return updatedTask;
  }

  async deleteTask(id: number): Promise<void> {
    this.tasks.delete(id);
  }

  // Project operations
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectsByUserId(userId: number): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      (project) => project.userId === userId,
    );
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectIdCounter++;
    const project: Project = { ...insertProject, id };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: number, projectUpdate: Partial<Project>): Promise<Project | undefined> {
    const project = this.projects.get(id);
    if (!project) return undefined;
    
    const updatedProject: Project = { ...project, ...projectUpdate };
    this.projects.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<void> {
    this.projects.delete(id);
  }

  // Habit operations
  async getHabit(id: number): Promise<Habit | undefined> {
    const habit = this.habits.get(id);
    if (!habit) return undefined;
    
    // Get all entries for this habit
    const entries = await this.getHabitEntriesByHabitId(id);
    return { ...habit, entries };
  }

  async getAllHabits(): Promise<Habit[]> {
    const habits = Array.from(this.habits.values());
    
    // For each habit, get its entries
    const habitsWithEntries = await Promise.all(
      habits.map(async (habit) => {
        const entries = await this.getHabitEntriesByHabitId(habit.id);
        return { ...habit, entries };
      })
    );
    
    return habitsWithEntries;
  }

  async getHabitsByUserId(userId: number): Promise<Habit[]> {
    const habits = Array.from(this.habits.values()).filter(
      (habit) => habit.userId === userId,
    );
    
    // For each habit, get its entries
    const habitsWithEntries = await Promise.all(
      habits.map(async (habit) => {
        const entries = await this.getHabitEntriesByHabitId(habit.id);
        return { ...habit, entries };
      })
    );
    
    return habitsWithEntries;
  }

  async createHabit(insertHabit: InsertHabit): Promise<Habit> {
    const id = this.habitIdCounter++;
    const habit: Habit = { ...insertHabit, id };
    this.habits.set(id, habit);
    return habit;
  }

  async updateHabit(id: number, habitUpdate: Partial<Habit>): Promise<Habit | undefined> {
    const habit = this.habits.get(id);
    if (!habit) return undefined;
    
    const { entries, ...restUpdate } = habitUpdate as Partial<Habit> & { entries?: HabitEntry[] };
    const updatedHabit: Habit = { ...habit, ...restUpdate };
    this.habits.set(id, updatedHabit);
    
    // Get entries after update
    const habitEntries = await this.getHabitEntriesByHabitId(id);
    return { ...updatedHabit, entries: habitEntries };
  }

  async deleteHabit(id: number): Promise<void> {
    this.habits.delete(id);
    
    // Delete all entries for this habit
    const entriesToDelete = Array.from(this.habitEntries.values())
      .filter(entry => entry.habitId === id)
      .map(entry => entry.id);
    
    entriesToDelete.forEach(entryId => {
      this.habitEntries.delete(entryId);
    });
  }

  // Habit entry operations
  async getHabitEntry(id: number): Promise<HabitEntry | undefined> {
    return this.habitEntries.get(id);
  }

  async getHabitEntriesByHabitId(habitId: number): Promise<HabitEntry[]> {
    return Array.from(this.habitEntries.values()).filter(
      (entry) => entry.habitId === habitId,
    );
  }

  async getHabitEntriesByDateRange(habitId: number, startDate?: Date, endDate?: Date): Promise<HabitEntry[]> {
    let entries = Array.from(this.habitEntries.values()).filter(
      (entry) => entry.habitId === habitId,
    );
    
    if (startDate) {
      const startTime = startDate.getTime();
      entries = entries.filter(entry => new Date(entry.date).getTime() >= startTime);
    }
    
    if (endDate) {
      const endTime = endDate.getTime();
      entries = entries.filter(entry => new Date(entry.date).getTime() <= endTime);
    }
    
    return entries;
  }

  async createHabitEntry(insertEntry: InsertHabitEntry): Promise<HabitEntry> {
    // Check if an entry already exists for this habit and date
    const existingEntries = Array.from(this.habitEntries.values()).filter(
      (entry) => entry.habitId === insertEntry.habitId && 
                new Date(entry.date).toDateString() === new Date(insertEntry.date).toDateString()
    );
    
    if (existingEntries.length > 0) {
      // Update existing entry
      const existingEntry = existingEntries[0];
      const updatedEntry = { ...existingEntry, completed: insertEntry.completed };
      this.habitEntries.set(existingEntry.id, updatedEntry);
      
      // Update streak count if needed
      if (insertEntry.completed) {
        await this.updateHabitStreak(insertEntry.habitId);
      }
      
      return updatedEntry;
    }
    
    // Create new entry
    const id = this.habitEntryIdCounter++;
    const entry: HabitEntry = { ...insertEntry, id };
    this.habitEntries.set(id, entry);
    
    // Update streak count if needed
    if (insertEntry.completed) {
      await this.updateHabitStreak(insertEntry.habitId);
    }
    
    return entry;
  }

  async updateHabitEntry(id: number, entryUpdate: Partial<HabitEntry>): Promise<HabitEntry | undefined> {
    const entry = this.habitEntries.get(id);
    if (!entry) return undefined;
    
    const updatedEntry: HabitEntry = { ...entry, ...entryUpdate };
    this.habitEntries.set(id, updatedEntry);
    
    // Update streak count if needed
    if (entryUpdate.completed !== undefined) {
      await this.updateHabitStreak(entry.habitId);
    }
    
    return updatedEntry;
  }
  
  // Helper method to update habit streak count
  private async updateHabitStreak(habitId: number): Promise<void> {
    const habit = this.habits.get(habitId);
    if (!habit) return;
    
    const entries = await this.getHabitEntriesByHabitId(habitId);
    const sortedEntries = entries
      .filter(entry => entry.completed)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    if (sortedEntries.length === 0) {
      habit.streakCount = 0;
      this.habits.set(habitId, habit);
      return;
    }
    
    // Check if the latest entry is from today or yesterday
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    const latestEntryDate = new Date(sortedEntries[0].date);
    latestEntryDate.setHours(0, 0, 0, 0);
    
    const isToday = latestEntryDate.getTime() === now.getTime();
    const isYesterday = latestEntryDate.getTime() === now.getTime() - 86400000;
    
    if (!isToday && !isYesterday) {
      habit.streakCount = 0;
      this.habits.set(habitId, habit);
      return;
    }
    
    // Count consecutive days
    let streak = 1;
    for (let i = 1; i < sortedEntries.length; i++) {
      const currentDate = new Date(sortedEntries[i-1].date);
      currentDate.setHours(0, 0, 0, 0);
      
      const prevDate = new Date(sortedEntries[i].date);
      prevDate.setHours(0, 0, 0, 0);
      
      const dayDiff = (currentDate.getTime() - prevDate.getTime()) / 86400000;
      
      if (dayDiff === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    habit.streakCount = streak;
    this.habits.set(habitId, habit);
  }

  // Note operations
  async getNote(id: number): Promise<Note | undefined> {
    return this.notes.get(id);
  }

  async getAllNotes(): Promise<Note[]> {
    return Array.from(this.notes.values());
  }

  async getNotesByUserId(userId: number): Promise<Note[]> {
    return Array.from(this.notes.values()).filter(
      (note) => note.userId === userId,
    );
  }

  async createNote(insertNote: InsertNote): Promise<Note> {
    const id = this.noteIdCounter++;
    const note: Note = { ...insertNote, id };
    this.notes.set(id, note);
    return note;
  }

  async updateNote(id: number, noteUpdate: Partial<Note>): Promise<Note | undefined> {
    const note = this.notes.get(id);
    if (!note) return undefined;
    
    const updatedNote: Note = { ...note, ...noteUpdate };
    this.notes.set(id, updatedNote);
    return updatedNote;
  }

  async deleteNote(id: number): Promise<void> {
    this.notes.delete(id);
  }

  // Event operations
  async getEvent(id: number): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async getAllEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEventsByUserId(userId: number): Promise<Event[]> {
    return Array.from(this.events.values()).filter(
      (event) => event.userId === userId,
    );
  }

  async getEventsByDateRange(startDate: Date, endDate: Date): Promise<Event[]> {
    return Array.from(this.events.values()).filter(event => {
      const eventStart = new Date(event.startTime).getTime();
      const eventEnd = new Date(event.endTime).getTime();
      const rangeStart = startDate.getTime();
      const rangeEnd = endDate.getTime();
      
      // Check if the event overlaps with the date range
      return (eventStart <= rangeEnd && eventEnd >= rangeStart);
    });
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = this.eventIdCounter++;
    const event: Event = { ...insertEvent, id };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: number, eventUpdate: Partial<Event>): Promise<Event | undefined> {
    const event = this.events.get(id);
    if (!event) return undefined;
    
    const updatedEvent: Event = { ...event, ...eventUpdate };
    this.events.set(id, updatedEvent);
    return updatedEvent;
  }

  async deleteEvent(id: number): Promise<void> {
    this.events.delete(id);
  }

  // Quote operations
  async getQuote(id: number): Promise<Quote | undefined> {
    return this.quotes.get(id);
  }

  async getAllQuotes(): Promise<Quote[]> {
    return Array.from(this.quotes.values());
  }

  async getRandomQuote(): Promise<Quote> {
    const quotes = Array.from(this.quotes.values());
    if (quotes.length === 0) {
      throw new Error('No quotes available');
    }
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  }

  async createQuote(insertQuote: InsertQuote): Promise<Quote> {
    const id = this.quoteIdCounter++;
    const quote: Quote = { ...insertQuote, id };
    this.quotes.set(id, quote);
    return quote;
  }
}

export const storage = new MemStorage();
