import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import { TaskStatus, TaskPriority } from "../client/src/types";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.get('/api/users/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const user = await storage.getUser(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  });

  app.post('/api/users', async (req, res) => {
    try {
      const user = await storage.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create user' });
    }
  });

  // Task routes
  app.get('/api/tasks', async (req, res) => {
    const tasks = await storage.getAllTasks();
    res.json(tasks);
  });

  app.get('/api/tasks/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const task = await storage.getTask(id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  });

  app.post('/api/tasks', async (req, res) => {
    try {
      const task = await storage.createTask(req.body);
      res.status(201).json(task);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create task' });
    }
  });

  app.patch('/api/tasks/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedTask = await storage.updateTask(id, req.body);
      if (!updatedTask) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json(updatedTask);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update task' });
    }
  });

  app.delete('/api/tasks/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.deleteTask(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: 'Failed to delete task' });
    }
  });

  // Project routes
  app.get('/api/projects', async (req, res) => {
    const projects = await storage.getAllProjects();
    res.json(projects);
  });

  app.post('/api/projects', async (req, res) => {
    try {
      const project = await storage.createProject(req.body);
      res.status(201).json(project);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create project' });
    }
  });

  // Habit routes
  app.get('/api/habits', async (req, res) => {
    const habits = await storage.getAllHabits();
    res.json(habits);
  });

  app.get('/api/habits/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const habit = await storage.getHabit(id);
    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }
    res.json(habit);
  });

  app.post('/api/habits', async (req, res) => {
    try {
      const habit = await storage.createHabit(req.body);
      res.status(201).json(habit);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create habit' });
    }
  });

  app.patch('/api/habits/:id', async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updatedHabit = await storage.updateHabit(id, req.body);
      if (!updatedHabit) {
        return res.status(404).json({ message: 'Habit not found' });
      }
      res.json(updatedHabit);
    } catch (error) {
      res.status(400).json({ message: 'Failed to update habit' });
    }
  });

  // Habit entries routes
  app.post('/api/habits/:habitId/entries', async (req, res) => {
    try {
      const habitId = parseInt(req.params.habitId);
      const entry = await storage.createHabitEntry({
        ...req.body,
        habitId
      });
      res.status(201).json(entry);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create habit entry' });
    }
  });

  app.get('/api/habits/:habitId/entries', async (req, res) => {
    const habitId = parseInt(req.params.habitId);
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    
    const entries = await storage.getHabitEntriesByDateRange(habitId, startDate, endDate);
    res.json(entries);
  });

  // Note routes
  app.get('/api/notes', async (req, res) => {
    const notes = await storage.getAllNotes();
    res.json(notes);
  });

  app.post('/api/notes', async (req, res) => {
    try {
      const note = await storage.createNote(req.body);
      res.status(201).json(note);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create note' });
    }
  });

  // Event routes
  app.get('/api/events', async (req, res) => {
    const startDate = req.query.startDate ? new Date(req.query.startDate as string) : undefined;
    const endDate = req.query.endDate ? new Date(req.query.endDate as string) : undefined;
    
    if (startDate && endDate) {
      const events = await storage.getEventsByDateRange(startDate, endDate);
      return res.json(events);
    }
    
    const events = await storage.getAllEvents();
    res.json(events);
  });

  app.post('/api/events', async (req, res) => {
    try {
      const event = await storage.createEvent(req.body);
      res.status(201).json(event);
    } catch (error) {
      res.status(400).json({ message: 'Failed to create event' });
    }
  });

  app.get('/api/quotes/random', async (req, res) => {
    try {
      const quote = await storage.getRandomQuote();
      res.json(quote);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch quote' });
    }
  });

  // Pre-populate some sample data for demo purposes
  await initializeSampleData();

  const httpServer = createServer(app);
  return httpServer;

  // Helper function to initialize sample data
  async function initializeSampleData() {
    // Check if we already have a user
    const users = await storage.getAllUsers();
    if (users.length === 0) {
      // Create default user
      await storage.createUser({
        username: 'saipraneeth',
        password: 'password',
        displayName: 'SaiPraneeth',
        avatar: '',
        theme: 'light',
      });

      // Create sample projects
      const project1 = await storage.createProject({
        userId: 1,
        name: 'Website Redesign',
        description: 'Redesign company website',
        color: '#4A90E2',
      });

      const project2 = await storage.createProject({
        userId: 1,
        name: 'Mobile App',
        description: 'Develop new mobile app',
        color: '#FF7043',
      });

      // Create sample tasks
      await storage.createTask({
        userId: 1,
        title: 'Research competitors',
        description: 'Analyze top 5 competitors and create a report',
        status: TaskStatus.Todo,
        priority: TaskPriority.High,
        dueDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        project: 'Website Redesign',
        progress: 0,
      });

      await storage.createTask({
        userId: 1,
        title: 'Update documentation',
        description: 'Update API documentation with new endpoints',
        status: TaskStatus.Todo,
        priority: TaskPriority.Medium,
        dueDate: new Date(new Date().getTime() + 4 * 24 * 60 * 60 * 1000), // 4 days from now
        project: 'Mobile App',
        progress: 0,
      });

      await storage.createTask({
        userId: 1,
        title: 'Design mockup',
        description: 'Create UI design mockup for client review',
        status: TaskStatus.InProgress,
        priority: TaskPriority.High,
        dueDate: new Date(),
        project: 'Website Redesign',
        progress: 75,
      });

      await storage.createTask({
        userId: 1,
        title: 'Bug fixes',
        description: 'Fix login page validation issues',
        status: TaskStatus.InProgress,
        priority: TaskPriority.Medium,
        dueDate: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        project: 'Mobile App',
        progress: 40,
      });

      await storage.createTask({
        userId: 1,
        title: 'Initial wireframes',
        description: 'Create initial wireframes for homepage',
        status: TaskStatus.Done,
        priority: TaskPriority.Medium,
        dueDate: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        project: 'Website Redesign',
        progress: 100,
      });

      await storage.createTask({
        userId: 1,
        title: 'Client meeting',
        description: 'Initial project kickoff meeting with client',
        status: TaskStatus.Done,
        priority: TaskPriority.High,
        dueDate: new Date(new Date().getTime() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
        project: 'Website Redesign',
        progress: 100,
      });

      // Create sample habits
      const habit1 = await storage.createHabit({
        userId: 1,
        name: 'Workout',
        icon: 'fitness_center',
        color: 'text-neongreen',
        streakCount: 12,
      });

      const habit2 = await storage.createHabit({
        userId: 1,
        name: 'Reading',
        icon: 'menu_book',
        color: 'text-blue-500',
        streakCount: 8,
      });

      const habit3 = await storage.createHabit({
        userId: 1,
        name: 'Coding',
        icon: 'code',
        color: 'text-purple-500',
        streakCount: 15,
      });

      // Create sample habit entries (last 7 days)
      const today = new Date();
      for (let i = 0; i < 7; i++) {
        const date = new Date();
        date.setDate(today.getDate() - i);
        
        // Workout habit - completed for last 6 days
        if (i < 6) {
          await storage.createHabitEntry({
            habitId: habit1.id,
            date,
            completed: true,
          });
        }
        
        // Reading habit - completed for last 5 days
        if (i < 5) {
          await storage.createHabitEntry({
            habitId: habit2.id,
            date,
            completed: true,
          });
        }
        
        // Coding habit - completed for all 7 days
        await storage.createHabitEntry({
          habitId: habit3.id,
          date,
          completed: true,
        });
      }

      // Create sample events
      const todayStart = new Date();
      todayStart.setHours(9, 30, 0, 0);
      const todayEnd = new Date();
      todayEnd.setHours(10, 30, 0, 0);

      await storage.createEvent({
        userId: 1,
        title: 'Design Review',
        description: 'Review website design with team',
        startTime: todayStart,
        endTime: todayEnd,
        category: 'Work',
        color: '#4A90E2',
      });

      const meeting = new Date();
      meeting.setHours(11, 0, 0, 0);
      const meetingEnd = new Date();
      meetingEnd.setHours(11, 30, 0, 0);

      await storage.createEvent({
        userId: 1,
        title: 'Client Meeting',
        description: 'Discuss project requirements',
        startTime: meeting,
        endTime: meetingEnd,
        category: 'Work',
        color: '#FF7043',
      });

      const lunch = new Date();
      lunch.setHours(12, 0, 0, 0);
      const lunchEnd = new Date();
      lunchEnd.setHours(13, 0, 0, 0);

      await storage.createEvent({
        userId: 1,
        title: 'Lunch Break',
        description: 'Break time',
        startTime: lunch,
        endTime: lunchEnd,
        category: 'Personal',
        color: '#9E9E9E',
      });

      const coding = new Date();
      coding.setHours(13, 30, 0, 0);
      const codingEnd = new Date();
      codingEnd.setHours(14, 30, 0, 0);

      await storage.createEvent({
        userId: 1,
        title: 'Coding Session',
        description: 'Frontend Development',
        startTime: coding,
        endTime: codingEnd,
        category: 'Work',
        color: '#4CAF50',
      });

      // Create sample quotes
      const quotes = [
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
        { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
        { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
      ];

      for (const quote of quotes) {
        await storage.createQuote(quote);
      }
    }
  }
}
