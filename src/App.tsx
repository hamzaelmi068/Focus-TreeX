import React, { useState, useEffect } from 'react';
import { Trees as Tree, Timer, Moon, Sun, Trophy, MessageSquare, Play, Pause, RefreshCw, 
         Calendar, BarChart2, Settings, Clock, Target, Award, Plus, X, AlertCircle, Wind, Cloud, Leaf } from 'lucide-react';

type TreeVariant = 'oak' | 'maple' | 'cherry';

interface TreeStyle {
  trunk: string;
  foliage: string;
  name: string;
  requiredSessions: number;
  leaves: number;
}

interface FocusSession {
  date: string;
  duration: number;
  treeType: TreeVariant;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  createdAt: string;
  parentId?: string;
  focusTime: number;
}

const treeStyles: Record<TreeVariant, TreeStyle> = {
  oak: {
    trunk: '#854d0e',
    foliage: '#22c55e',
    name: 'Oak Tree',
    requiredSessions: 0,
    leaves: 5
  },
  maple: {
    trunk: '#7c2d12',
    foliage: '#dc2626',
    name: 'Maple Tree',
    requiredSessions: 10,
    leaves: 7
  },
  cherry: {
    trunk: '#881337',
    foliage: '#fb7185',
    name: 'Cherry Blossom',
    requiredSessions: 25,
    leaves: 9
  }
};

const motivationalMessages = [
  "Stay focused! Your forest is growing stronger.",
  "Every minute of focus plants seeds for future success.",
  "Your dedication is transforming into a beautiful forest.",
  "Keep going! Nature rewards persistence.",
  "Your focus is creating something beautiful."
];

const achievements = [
  { id: 'first_tree', name: 'First Tree', description: 'Complete your first focus session', icon: Tree },
  { id: 'streak_3', name: 'Consistent Growth', description: 'Maintain a 3-day streak', icon: Award },
  { id: 'maple_unlock', name: 'Maple Master', description: 'Unlock the Maple Tree', icon: Trophy },
  { id: 'cherry_unlock', name: 'Cherry Champion', description: 'Unlock the Cherry Blossom', icon: Award },
  { id: 'forest_10', name: 'Growing Forest', description: 'Plant 10 trees', icon: Tree }
];

const priorityColors = {
  high: 'bg-red-500',
  medium: 'bg-yellow-500',
  low: 'bg-green-500'
};

function App() {
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(25 * 60);
  const [treeGrowth, setTreeGrowth] = useState(0);
  const [trees, setTrees] = useState<TreeVariant[]>([]);
  const [streak, setStreak] = useState(0);
  const [lastCompleted, setLastCompleted] = useState<string | null>(null);
  const [selectedTree, setSelectedTree] = useState<TreeVariant>('oak');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [message, setMessage] = useState('');
  const [completedSessions, setCompletedSessions] = useState(0);
  const [sessionHistory, setSessionHistory] = useState<FocusSession[]>([]);
  const [showStats, setShowStats] = useState(false);
  const [selectedDuration, setSelectedDuration] = useState(25);
  const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
  const [showAchievements, setShowAchievements] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showTaskInput, setShowTaskInput] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskPriority, setNewTaskPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [showParticles, setShowParticles] = useState(true);
  const [windDirection, setWindDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setWindDirection(prev => -prev);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('focusTreeData');
    if (savedData) {
      const { trees, streak, lastCompleted, completedSessions, sessionHistory, achievements, tasks } = JSON.parse(savedData);
      setTrees(trees);
      setStreak(streak);
      setLastCompleted(lastCompleted);
      setCompletedSessions(completedSessions);
      setSessionHistory(sessionHistory || []);
      setUnlockedAchievements(achievements || []);
      setTasks(tasks || []);
    }
  }, []);

  const saveData = () => {
    localStorage.setItem('focusTreeData', JSON.stringify({
      trees,
      streak,
      lastCompleted,
      completedSessions,
      sessionHistory,
      achievements: unlockedAchievements,
      tasks
    }));
  };

  const addTask = () => {
    if (newTaskTitle.trim()) {
      const newTask: Task = {
        id: Math.random().toString(36).substr(2, 9),
        title: newTaskTitle.trim(),
        priority: newTaskPriority,
        completed: false,
        createdAt: new Date().toISOString(),
        focusTime: 0
      };
      setTasks(prev => [...prev, newTask]);
      setNewTaskTitle('');
      setShowTaskInput(false);
      saveData();
    }
  };

  const completeTask = (taskId: string) => {
    setTasks(prev => prev.map(task => {
      if (task.id === taskId) {
        return { ...task, completed: true };
      }
      return task;
    }));
    
    setTreeGrowth(prev => Math.min(prev + 10, 100));
    saveData();
  };

  const deleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
    saveData();
  };

  const updateTaskFocusTime = () => {
    if (activeTaskId && isActive) {
      setTasks(prev => prev.map(task => {
        if (task.id === activeTaskId) {
          return { ...task, focusTime: task.focusTime + 1 };
        }
        return task;
      }));
    }
  };

  useEffect(() => {
    let interval: number | undefined;
    
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime % 60 === 0) {
            setTreeGrowth((prev) => Math.min(prev + 4, 100));
            setMessage(motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)]);
            updateTaskFocusTime();
          }
          return newTime;
        });
      }, 1000);
    } else if (time === 0) {
      setIsActive(false);
      completeSession();
    }

    return () => clearInterval(interval);
  }, [isActive, time, activeTaskId]);

  const checkAchievements = () => {
    const newAchievements = [...unlockedAchievements];
    
    if (!newAchievements.includes('first_tree') && trees.length > 0) {
      newAchievements.push('first_tree');
    }
    
    if (!newAchievements.includes('streak_3') && streak >= 3) {
      newAchievements.push('streak_3');
    }
    
    if (!newAchievements.includes('maple_unlock') && completedSessions >= 10) {
      newAchievements.push('maple_unlock');
    }
    
    if (!newAchievements.includes('cherry_unlock') && completedSessions >= 25) {
      newAchievements.push('cherry_unlock');
    }
    
    if (!newAchievements.includes('forest_10') && trees.length >= 10) {
      newAchievements.push('forest_10');
    }

    if (newAchievements.length > unlockedAchievements.length) {
      setUnlockedAchievements(newAchievements);
      return true;
    }
    return false;
  };

  const completeSession = () => {
    const today = new Date().toDateString();
    const newCompletedSessions = completedSessions + 1;
    setCompletedSessions(newCompletedSessions);
    
    if (lastCompleted !== today) {
      if (lastCompleted === new Date(Date.now() - 86400000).toDateString()) {
        setStreak(s => s + 1);
      } else {
        setStreak(1);
      }
      setLastCompleted(today);
    }

    setTrees(prev => [...prev, selectedTree]);
    setTreeGrowth(0);

    const newSession: FocusSession = {
      date: new Date().toISOString(),
      duration: selectedDuration,
      treeType: selectedTree,
      completed: true
    };
    setSessionHistory(prev => [...prev, newSession]);

    const newAchievementUnlocked = checkAchievements();
    if (newAchievementUnlocked) {
      setShowAchievements(true);
    }

    if (activeTaskId) {
      completeTask(activeTaskId);
    }

    saveData();
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = () => {
    setIsActive(false);
    setTime(selectedDuration * 60);
    setTreeGrowth(0);
    setMessage('');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getStats = () => {
    const totalMinutes = sessionHistory.reduce((acc, session) => acc + session.duration, 0);
    const averageSession = sessionHistory.length > 0 
      ? Math.round(totalMinutes / sessionHistory.length) 
      : 0;
    const thisWeekSessions = sessionHistory.filter(session => {
      const sessionDate = new Date(session.date);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return sessionDate >= weekAgo;
    }).length;

    return { totalMinutes, averageSession, thisWeekSessions };
  };

  const TreeVisualization = ({ growth, style }: { growth: number, style: TreeStyle }) => {
    const leaves = Array.from({ length: style.leaves }, (_, i) => {
      const angle = (i * (360 / style.leaves)) * (Math.PI / 180);
      const radius = (growth / 2) * (0.8 + Math.random() * 0.4);
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const scale = (growth / 100) * (0.8 + Math.random() * 0.4);
      const rotation = windDirection * (Math.random() * 15);
      
      return (
        <div
          key={i}
          className="absolute rounded-full transition-all duration-1000"
          style={{
            width: '30px',
            height: '30px',
            backgroundColor: style.foliage,
            transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${rotation}deg)`,
            opacity: growth / 100,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        />
      );
    });

    return (
      <div className="relative w-64 h-64">
        <div 
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 transition-all duration-1000 rounded-lg"
          style={{
            width: '8px',
            height: `${growth}%`,
            backgroundColor: style.trunk,
            boxShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
          }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {leaves}
        </div>
        {showParticles && (
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 20 }, (_, i) => (
              <div
                key={i}
                className="absolute animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: 0.3,
                }}
              >
                {i % 3 === 0 ? (
                  <Leaf className="w-3 h-3 text-green-300" />
                ) : i % 3 === 1 ? (
                  <Cloud className="w-4 h-4 text-gray-300" />
                ) : (
                  <div className="w-2 h-2 rounded-full bg-yellow-200" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const currentTreeStyle = treeStyles[selectedTree];
  const stats = getStats();

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-b from-green-50 via-blue-50 to-green-50'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <header className="flex justify-between items-center mb-12">
          <div className="flex items-center gap-2">
            <Tree className={`w-8 h-8 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
            <h1 className={`text-4xl font-bold ${isDarkMode ? 'text-green-400' : 'text-green-800'}`}>
              Focus Tree
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`}>
              <Trophy className="w-5 h-5" />
              <span className="font-semibold">Streak: {streak} days</span>
            </div>
            <button
              onClick={() => setShowStats(!showStats)}
              className={`p-2 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <BarChart2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowAchievements(!showAchievements)}
              className={`p-2 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-800 hover:bg-gray-700' 
                  : 'bg-white hover:bg-gray-100'
              }`}
            >
              <Award className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full ${
                isDarkMode 
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </header>

        <div className={`max-w-2xl mx-auto rounded-2xl shadow-xl p-8 backdrop-blur-sm ${
          isDarkMode ? 'bg-gray-800/90' : 'bg-white/90'
        }`}>
          {showStats ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Your Focus Journey</h2>
              <div className="grid grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-green-50'
                }`}>
                  <Clock className="w-6 h-6 mb-2" />
                  <h3 className="text-lg font-semibold">Total Focus Time</h3>
                  <p className="text-2xl font-bold">{stats.totalMinutes} mins</p>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-green-50'
                }`}>
                  <Target className="w-6 h-6 mb-2" />
                  <h3 className="text-lg font-semibold">Average Session</h3>
                  <p className="text-2xl font-bold">{stats.averageSession} mins</p>
                </div>
                <div className={`p-4 rounded-lg ${
                  isDarkMode ? 'bg-gray-700' : 'bg-green-50'
                }`}>
                  <Calendar className="w-6 h-6 mb-2" />
                  <h3 className="text-lg font-semibold">This Week</h3>
                  <p className="text-2xl font-bold">{stats.thisWeekSessions} sessions</p>
                </div>
              </div>
              <button
                onClick={() => setShowStats(false)}
                className="mt-6 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Back to Timer
              </button>
            </div>
          ) : showAchievements ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Achievements</h2>
              <div className="grid gap-4">
                {achievements.map(achievement => {
                  const isUnlocked = unlockedAchievements.includes(achievement.id);
                  return (
                    <div
                      key={achievement.id}
                      className={`p-4 rounded-lg flex items-center gap-4 ${
                        isDarkMode 
                          ? isUnlocked ? 'bg-gray-700' : 'bg-gray-700/50' 
                          : isUnlocked ? 'bg-green-50' : 'bg-gray-50'
                      } ${!isUnlocked && 'opacity-50'}`}
                    >
                      <achievement.icon className="w-8 h-8" />
                      <div>
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-sm opacity-75">{achievement.description}</p>
                      </div>
                      {isUnlocked && (
                        <Award className="w-6 h-6 ml-auto text-yellow-400" />
                      )}
                    </div>
                  );
                })}
              </div>
              <button
                onClick={() => setShowAchievements(false)}
                className="mt-6 px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
              >
                Back to Timer
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-full mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-lg font-semibold ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    Tasks
                  </h3>
                  <button
                    onClick={() => setShowTaskInput(true)}
                    className="p-2 rounded-full bg-green-500 text-white hover:bg-green-600"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>

                {showTaskInput && (
                  <div className="mb-4 p-4 rounded-lg bg-gray-100 dark:bg-gray-700">
                    <input
                      type="text"
                      value={newTaskTitle}
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                      placeholder="Enter task title..."
                      className="w-full p-2 rounded-md mb-2 bg-white dark:bg-gray-800"
                    />
                    <div className="flex gap-2 mb-2">
                      {(['high', 'medium', 'low'] as const).map((priority) => (
                        <button
                          key={priority}
                          onClick={() => setNewTaskPriority(priority)}
                          className={`px-3 py-1 rounded-full ${
                            newTaskPriority === priority
                              ? priorityColors[priority]
                              : 'bg-gray-200 dark:bg-gray-600'
                          } text-white text-sm`}
                        >
                          {priority}
                        </button>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={addTask}
                        className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
                      >
                        Add Task
                      </button>
                      <button
                        onClick={() => setShowTaskInput(false)}
                        className="px-4 py-2 rounded-lg bg-gray-500 text-white hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-4">
                  {tasks.filter(task => !task.completed).map((task) => (
                    <div
                      key={task.id}
                      className={`relative group p-4 rounded-full ${priorityColors[task.priority]} 
                        ${activeTaskId === task.id ? 'ring-4 ring-green-400' : ''}
                        transform transition-transform hover:scale-110 cursor-pointer`}
                      onClick={() => setActiveTaskId(task.id)}
                    >
                      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteTask(task.id);
                          }}
                          className="p-1 rounded-full bg-red-500 text-white hover:bg-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="w-16 h-16 flex items-center justify-center text-white text-center text-sm">
                        {task.title}
                      </div>
                      {task.focusTime > 0 && (
                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs bg-black/50 text-white px-2 rounded-full">
                          {Math.floor(task.focusTime / 60)}m
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="w-full mb-8">
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Select Your Tree
                </h3>
                <div className="flex gap-4 justify-center">
                  {Object.entries(treeStyles).map(([variant, style]) => (
                    <button
                      key={variant}
                      onClick={() => completedSessions >= style.requiredSessions && setSelectedTree(variant as TreeVariant)}
                      className={`relative p-6 rounded-lg transform transition-all duration-300 ${
                        selectedTree === variant
                          ? 'ring-2 ring-green-500 scale-105'
                          : completedSessions >= style.requiredSessions
                          ? isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'
                          : 'opacity-50 cursor-not-allowed'
                      }`}
                    >
                      <div className="relative">
                        <div
                          className="w-12 h-12 rounded-full mx-auto mb-2 transform transition-all duration-300 hover:scale-110"
                          style={{ backgroundColor: style.foliage }}
                        />
                        {selectedTree === variant && (
                          <div className="absolute inset-0 animate-pulse rounded-full"
                               style={{ backgroundColor: style.foliage, opacity: 0.3 }} />
                        )}
                      </div>
                      <span className="text-sm font-medium block">{style.name}</span>
                      {completedSessions < style.requiredSessions && (
                        <span className="block text-xs opacity-75 mt-1">
                          {style.requiredSessions - completedSessions} more to unlock
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="w-full mb-8">
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Focus Duration
                </h3>
                <div className="flex gap-4 justify-center">
                  {[15, 25, 45].map(duration => (
                    <button
                      key={duration}
                      onClick={() => {
                        setSelectedDuration(duration);
                        setTime(duration * 60);
                      }}
                      className={`px-4 py-2 rounded-lg ${
                        selectedDuration === duration
                          ? 'bg-green-600 text-white'
                          : isDarkMode
                          ? 'bg-gray-700 hover:bg-gray-600'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {duration} min
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mb-8 p-4">
                <TreeVisualization growth={treeGrowth} style={treeStyles[selectedTree]} />
              </div>

              {activeTaskId && (
                <div className="mb-4 text-center">
                  <p className="text-sm opacity-75">
                    Focusing on: {tasks.find(t => t.id === activeTaskId)?.title}
                  </p>
                </div>
              )}

              <div className={`text-6xl font-bold mb-8 ${
                isDarkMode ? 'text-gray-100' : 'text-gray-800'
              }`}>
                {formatTime(time)}
              </div>

              {message && (
                <div className="flex items-center gap-2 mb-8 text-center">
                  <MessageSquare className={`w-5 h-5 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <p className="text-lg italic">{message}</p>
                </div>
              )}

              <div className="flex gap-4 mb-8">
                <button
                  onClick={toggleTimer}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                  {isActive ? 'Pause' : 'Start'}
                </button>
                <button
                  onClick={resetTimer}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                    isDarkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                  }`}
                >
                  <RefreshCw className="w-5 h-5" />
                  Reset
                </button>
              </div>

              <div className="w-full mt-8">
                <h3 className={`text-lg font-semibold mb-4 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Completed Tasks
                </h3>
                <div className="space-y-2">
                  {tasks.filter(task => task.completed).map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center justify-between p-2 rounded-lg ${
                        isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
                      }`}
                    >
                      <span className="line-through opacity-50">{task.title}</span>
                      <span className="text-sm opacity-50">
                        {Math.floor(task.focusTime / 60)}m focus time
                      </span>
                    </div>
                  ))}
                </div>
              </div>

   <div className="w-full">
  <h3
    className={`text-lg font-semibold mb-4 ${
      isDarkMode ? "text-gray-300" : "text-gray-700"
    }`}
  >
    Your Forest ({trees?.length || 0} trees)
  </h3>
  <div className="space-y-4">
    {trees?.map((tree, index) => (
      <div
        key={index}
        className={`flex items-center p-4 rounded-lg ${
          isDarkMode ? "bg-gray-700" : "bg-gray-100"
        }`}
      >
        <p
          className={`text-base ${
            isDarkMode ? "text-gray-300" : "text-gray-700"
          }`}
        >
          {tree.name || `Tree ${index + 1}`}
        </p>
      </div>
    ))}
  </div>
</div>