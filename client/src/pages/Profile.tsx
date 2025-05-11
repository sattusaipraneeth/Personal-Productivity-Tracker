import React, { useState } from 'react';
import ControlBar from '@/components/layout/ControlBar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTheme } from '@/contexts/ThemeContext';
import { Switch } from '@/components/ui/switch';
import { generateAvatar } from '@/lib/utils';

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  
  // Mock user profile data
  const [user, setUser] = useState({
    username: 'SaiPraneeth',
    displayName: 'Sai Praneeth',
    email: 'sai.praneeth@example.com',
    avatar: '',
    plan: 'Premium'
  });

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked);
    setTheme(checked ? 'dark' : 'light');
  };

  const avatarUrl = user.avatar || generateAvatar(user.displayName);

  return (
    <main className="flex-1 overflow-y-auto py-8 px-4 md:px-8 bg-softwhite dark:bg-darkbg">
      <ControlBar title="Profile" subtitle="Manage your account settings" />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden lg:col-span-1">
          <div className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="h-24 w-24 rounded-full bg-royal mb-4 flex items-center justify-center text-white text-2xl font-semibold">
                {user.displayName.split(' ').map(name => name[0]).join('')}
              </div>
              <h2 className="text-xl font-semibold">{user.displayName}</h2>
              <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
              <div className="mt-2 px-3 py-1 bg-royal bg-opacity-20 text-royal rounded-full text-sm">
                {user.plan} Plan
              </div>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons mr-2 text-gray-600 dark:text-gray-400">schedule</span>
                    <span>Account Created</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Jul 15, 2023</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons mr-2 text-gray-600 dark:text-gray-400">check_circle</span>
                    <span>Tasks Completed</span>
                  </div>
                  <span className="font-medium">247</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="material-icons mr-2 text-gray-600 dark:text-gray-400">local_fire_department</span>
                    <span>Longest Streak</span>
                  </div>
                  <span className="font-medium">21 days</span>
                </div>
              </div>
            </div>
            
            <Button className="w-full mt-6" variant="outline">
              <span className="material-icons mr-2 text-sm">logout</span>
              Sign Out
            </Button>
          </div>
        </div>
        
        <div className="lg:col-span-2 glass rounded-xl shadow-glass dark:shadow-glass-dark overflow-hidden">
          <div className="p-6">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="appearance">Appearance</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="subscription">Subscription</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">Full Name</Label>
                      <Input 
                        id="displayName" 
                        value={user.displayName} 
                        onChange={(e) => setUser({...user, displayName: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <Input 
                        id="username" 
                        value={user.username} 
                        onChange={(e) => setUser({...user, username: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={user.email} 
                      onChange={(e) => setUser({...user, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" value="••••••••" disabled />
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Last changed: 3 months ago
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Change Password
                    </Button>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="appearance" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Dark Mode</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Toggle between light and dark themes
                      </p>
                    </div>
                    <Switch 
                      checked={isDarkMode} 
                      onCheckedChange={handleThemeToggle} 
                    />
                  </div>
                  
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                    <h3 className="font-medium mb-4">Color Theme</h3>
                    
                    <RadioGroup defaultValue="blue" className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="blue" id="blue" />
                        <div className="h-5 w-5 rounded-full bg-royal"></div>
                        <Label htmlFor="blue">Royal Blue</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="green" id="green" />
                        <div className="h-5 w-5 rounded-full bg-neongreen"></div>
                        <Label htmlFor="green">Neon Green</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="orange" id="orange" />
                        <div className="h-5 w-5 rounded-full bg-sunset"></div>
                        <Label htmlFor="orange">Sunset Orange</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="purple" id="purple" />
                        <div className="h-5 w-5 rounded-full bg-purple-600"></div>
                        <Label htmlFor="purple">Purple</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications" className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Task Reminders</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Get notified about upcoming tasks
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Habit Tracking</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Get reminded to complete your daily habits
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Weekly Summary</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Receive weekly productivity reports via email
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">System Notifications</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Updates and announcements about new features
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button>Save Changes</Button>
                </div>
              </TabsContent>
              
              <TabsContent value="subscription" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Premium Plan</CardTitle>
                    <CardDescription>Your subscription is active</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Plan</span>
                        <span className="font-medium">Premium</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Billing Period</span>
                        <span className="font-medium">Yearly</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Next Billing Date</span>
                        <span className="font-medium">July 15, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Amount</span>
                        <span className="font-medium">$99.99/year</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex gap-4">
                      <Button variant="outline">Change Plan</Button>
                      <Button variant="destructive">Cancel Subscription</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;
