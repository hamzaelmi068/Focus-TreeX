import React, { useState, useEffect } from 'react';
import { Timer } from './components/Timer';
import { Tree } from './components/Tree';
import { TaskBubbles } from './components/TaskBubbles';
import { Stats } from './components/Stats';
import { AICoach } from './components/AICoach';
import { StreakTracker } from './components/StreakTracker';
import { TreeGallery } from './components/TreeGallery';
import { Navbar } from './components/Navbar';
import { Task, TreeType, UserStats } from './types';
import { Plus, Moon, Sun } from 'lucide-react';

const TREE_TYPES: TreeType[] = [
  {
    name: 'Oak Tree',
    requiredSessions: 0,
    color: '#2d5a27',
    unlocked: true,
    description: 'A sturdy oak tree, perfect for beginning your focus journey.'
  },
  {
    name: 'Maple Tree',
    requiredSessions: 10,
    color: '#8b4513',
    unlocked: false,
    description: 'A beautiful maple tree with vibrant leaves. Unlocks after 10 sessions.'
  },
  {
    name: 'Cherry Blossom',
    requiredSessions: 25,
    color: '#ffb7c5',
    unlocked: false,
    description: 'A delicate cherry blossom tree. Unlocks after 25 sessions.'
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('timer');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<string>();
  const [currentTree, setCurrentTree] = useState(TREE_TYPES[0]);
  const [progress, setProgress] = useState(0);
  const [stats, setStats] = useState<UserStats>({
    totalFocusTime: 0,
    completedSessions: 0,
    currentStreak: 0,
    longestStreak: 0,
    averageSessionDuration: 0,
    weeklySessionCount: 0,
    lastSessionDate: null,
    dailyFocusTimes: {},
  });

  useEffect(() => {
    const savedStats = localStorage.getItem('focusStats');
    if (savedStats) {
      setStats(JSON.parse(savedStats));
    }

    // Check system dark mode preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  const updateStreak = () => {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = stats.lastSessionDate;
    
    let newStreak = stats.currentStreak;
    if (!lastDate) {
      newStreak = 1;
    } else if (lastDate === today) {
      // Already completed a session today, streak stays the same
      return stats.currentStreak;
    } else {
      const lastDateTime = new Date(lastDate);
      const todayTime = new Date(today);
      const diffDays = Math.floor((todayTime.getTime() - lastDateTime.getTime()) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day
        newStreak += 1;
      } else {
        // Streak broken
        newStreak = 1;
      }
    }

    return newStreak;
  };

  const handleAddTask = () => {
    const title = prompt('Enter task name:');
    if (title) {
      const priority = prompt('Enter priority (high, medium, low):') as Task['priority'] || 'medium';
      const newTask: Task = {
        id: Date.now().toString(),
        title,
        priority,
        completed: false,
        focusTime: 0,
        createdAt: Date.now(),
      };
      setTasks([...tasks, newTask]);
    }
  };

  const handleTaskComplete = (taskId: string) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: true } : task
    ));
  };

  const handleTimerComplete = () => {
    const today = new Date().toISOString().split('T')[0];
    const newStreak = updateStreak();
    
    const newStats = {
      ...stats,
      completedSessions: stats.completedSessions + 1,
      weeklySessionCount: stats.weeklySessionCount + 1,
      currentStreak: newStreak,
      longestStreak: Math.max(newStreak, stats.longestStreak),
      lastSessionDate: today,
      dailyFocusTimes: {
        ...stats.dailyFocusTimes,
        [today]: (stats.dailyFocusTimes[today] || 0) + 25 * 60, // 25 minutes in seconds
      },
    };
    
    setStats(newStats);
    localStorage.setItem('focusStats', JSON.stringify(newStats));
    
    if (selectedTaskId) {
      handleTaskComplete(selectedTaskId);
    }
  };

  const handleTimeUpdate = (timeLeft: number) => {
    setProgress(1 - timeLeft / (25 * 60));
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'timer':
        return (
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="flex flex-col items-center space-y-12 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
              <Timer onComplete={handleTimerComplete} onTimeUpdate={handleTimeUpdate} />
              <div className="relative w-full max-w-md aspect-square">
                <Tree progress={progress} currentTree={currentTree} />
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-semibold">Tasks</h2>
                  <button
                    onClick={handleAddTask}
                    className="p-3 rounded-full bg-green-500 text-white hover:bg-green-600 transform hover:scale-105 transition-all duration-200"
                    aria-label="Add task"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                <TaskBubbles
                  tasks={tasks}
                  onTaskComplete={handleTaskComplete}
                  onTaskDelete={(id) => setTasks(tasks.filter(t => t.id !== id))}
                  onTaskSelect={setSelectedTaskId}
                  selectedTaskId={selectedTaskId}
                />
              </div>

              <AICoach stats={stats} />
              <StreakTracker
                currentStreak={stats.currentStreak}
                longestStreak={stats.longestStreak}
              />
            </div>
          </div>
        );
      
      case 'forest':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Your Forest</h2>
            <TreeGallery
              trees={TREE_TYPES}
              completedSessions={stats.completedSessions}
              onSelectTree={setCurrentTree}
              selectedTree={currentTree}
            />
          </div>
        );
      
      case 'stats':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Statistics</h2>
            <Stats stats={stats} />
          </div>
        );
      
      case 'achievements':
        return (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Achievements</h2>
            <p className="text-gray-600 dark:text-gray-400">Coming soon!</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <Navbar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-end mb-8">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>

        {renderContent()}
      </main>
    </div>
  );
}

export default App;