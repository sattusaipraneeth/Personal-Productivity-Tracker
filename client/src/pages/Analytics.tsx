import React from 'react';
import ControlBar from '@/components/layout/ControlBar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useTask } from '@/contexts/TaskContext';
import { useHabit } from '@/contexts/HabitContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const { tasks, getTaskSummary } = useTask();
  const { habits } = useHabit();
  const summary = getTaskSummary();

  // Sample data for task completion by day
  const taskCompletionData = [
    { name: 'Mon', completed: 5 },
    { name: 'Tue', completed: 8 },
    { name: 'Wed', completed: 6 },
    { name: 'Thu', completed: 9 },
    { name: 'Fri', completed: 4 },
    { name: 'Sat', completed: 3 },
    { name: 'Sun', completed: 2 },
  ];

  // Sample data for task distribution
  const taskDistributionData = [
    { name: 'Urgent', value: summary.urgent, color: '#FF7043' },
    { name: 'In Progress', value: summary.inProgress, color: '#4A90E2' },
    { name: 'Completed', value: summary.completed, color: '#4CAF50' },
    { name: 'Upcoming', value: summary.upcoming, color: '#9E9E9E' },
  ];
  
  // Sample data for habit consistency
  const habitConsistencyData = [
    { name: 'Reading', consistency: 80 },
    { name: 'Exercise', consistency: 65 },
    { name: 'Meditation', consistency: 90 },
    { name: 'Coding', consistency: 75 },
  ];

  return (
    <main className="flex-1 overflow-y-auto py-8 px-4 md:px-8 bg-softwhite dark:bg-darkbg">
      <ControlBar title="Analytics" subtitle="Track your productivity and habits" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Tasks Completed</p>
                <h3 className="text-3xl font-semibold mt-1">{summary.completed}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <span className="material-icons text-neongreen">check_circle</span>
              </div>
            </div>
            <p className="text-sm text-neongreen mt-2">
              <span className="material-icons text-xs align-middle mr-1">arrow_upward</span>
              15% increase from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Pending Tasks</p>
                <h3 className="text-3xl font-semibold mt-1">{summary.urgent + summary.inProgress}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-sunset bg-opacity-10 flex items-center justify-center">
                <span className="material-icons text-sunset">schedule</span>
              </div>
            </div>
            <p className="text-sm text-sunset mt-2">
              <span className="material-icons text-xs align-middle mr-1">arrow_downward</span>
              5% decrease from last week
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Habit Streaks</p>
                <h3 className="text-3xl font-semibold mt-1">{habits.reduce((acc, habit) => acc + habit.streakCount, 0)}</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-royal bg-opacity-10 flex items-center justify-center">
                <span className="material-icons text-royal">local_fire_department</span>
              </div>
            </div>
            <p className="text-sm text-royal mt-2">
              <span className="material-icons text-xs align-middle mr-1">arrow_upward</span>
              20% increase from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Productivity Score</p>
                <h3 className="text-3xl font-semibold mt-1">85%</h3>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <span className="material-icons text-neongreen">trending_up</span>
              </div>
            </div>
            <p className="text-sm text-neongreen mt-2">
              <span className="material-icons text-xs align-middle mr-1">arrow_upward</span>
              10% increase from last week
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Task Completion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={taskCompletionData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#4A90E2" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Task Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={400} height={400}>
                  <Pie
                    data={taskDistributionData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {taskDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Habit Consistency</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={habitConsistencyData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                layout="vertical"
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" />
                <Tooltip />
                <Legend />
                <Bar dataKey="consistency" fill="#4CAF50" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default Analytics;
