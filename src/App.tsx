import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import Tree from './components/Tree'
import TaskBubbles from './components/TaskBubbles'
import StreakTracker from './components/StreakTracker'
import TreeGallery from './components/TreeGallery'
import Navbar from './components/Navbar'
import AICoach from './components/AICoach'
import ProgressTimeline from './components/ProgressTimeline'
import ThemeToggle from './components/ThemeToggle'
import { ThemeProvider } from './contexts/ThemeContext'
import { Task } from './utils/types'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalSessions, setTotalSessions] = useState(0)
  const [totalFocusTime, setTotalFocusTime] = useState(0)
  const [selectedTree, setSelectedTree] = useState('oak')

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }

  const completeTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    setStreak(streak + 1)
    setProgress(Math.min(progress + 10, 100))
    setTotalSessions(totalSessions + 1)
    setTotalFocusTime(totalFocusTime + 25) // 25 minutes per session
  }

  const startTimer = () => {
    setIsTimerRunning(true)
  }

  const stopTimer = () => {
    setIsTimerRunning(false)
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen gradient-bg relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-blue-500/10 to-purple-600/10 dark:from-green-400/20 dark:via-blue-500/20 dark:to-purple-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.1),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.2),transparent_50%)]" />
        
        <Navbar />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <Timer 
                isRunning={isTimerRunning}
                onStart={startTimer}
                onStop={stopTimer}
              />
              <Tree 
                progress={progress}
                treeType={selectedTree}
              />
              <StreakTracker streak={streak} />
            </div>
            
            {/* Middle Column */}
            <div className="space-y-6">
              <TaskBubbles 
                tasks={tasks}
                onAddTask={addTask}
                onTaskComplete={completeTask}
              />
              <TreeGallery 
                selectedTree={selectedTree}
                onTreeSelect={setSelectedTree}
              />
            </div>
            
            {/* Right Column */}
            <div className="space-y-6">
              <ProgressTimeline 
                streak={streak}
                totalSessions={totalSessions}
                totalFocusTime={totalFocusTime}
              />
              <AICoach />
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}

export default App
