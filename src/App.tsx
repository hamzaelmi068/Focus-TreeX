import { useState, useEffect } from 'react'
import Timer from './components/Timer'
import Tree from './components/Tree'
import TaskBubbles from './components/TaskBubbles'
import StreakTracker from './components/StreakTracker'
import TreeGallery from './components/TreeGallery'
import Navbar from './components/Navbar'
import AICoach from './components/AICoach'
import { Task } from './utils/types'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [currentTask, setCurrentTask] = useState<Task | null>(null)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [progress, setProgress] = useState(0)
  const [streak, setStreak] = useState(0)
  const [selectedTree, setSelectedTree] = useState('oak')

  const addTask = (task: Task) => {
    setTasks([...tasks, task])
  }

  const completeTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId))
    setStreak(streak + 1)
    setProgress(Math.min(progress + 10, 100))
  }

  const startTimer = () => {
    setIsTimerRunning(true)
  }

  const stopTimer = () => {
    setIsTimerRunning(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <AICoach />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
