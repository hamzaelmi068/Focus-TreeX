import { useState } from 'react'
import { Plus, Check, Clock, AlertCircle } from 'lucide-react'
import { Task } from '../utils/types'

interface TaskBubblesProps {
  tasks: Task[]
  onAddTask: (task: Task) => void
  onTaskComplete: (taskId: string) => void
}

const TaskBubbles = ({ tasks, onAddTask, onTaskComplete }: TaskBubblesProps) => {
  const [newTask, setNewTask] = useState('')
  const [showAddForm, setShowAddForm] = useState(false)

  const handleAddTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.trim(),
        completed: false,
        createdAt: new Date(),
        priority: 'medium'
      }
      onAddTask(task)
      setNewTask('')
      setShowAddForm(false)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 border-red-300'
      case 'medium': return 'bg-yellow-100 border-yellow-300'
      case 'low': return 'bg-green-100 border-green-300'
      default: return 'bg-gray-100 border-gray-300'
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <AlertCircle size={16} className="text-red-500" />
      case 'medium': return <Clock size={16} className="text-yellow-500" />
      case 'low': return <Check size={16} className="text-green-500" />
      default: return <Clock size={16} className="text-gray-500" />
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Tasks</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center space-x-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          <Plus size={20} />
          <span>Add Task</span>
        </button>
      </div>

      {showAddForm && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter task title..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <div className="flex justify-end mt-2 space-x-2">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleAddTask}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No tasks yet. Add one to get started!</p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${getPriorityColor(task.priority)}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getPriorityIcon(task.priority)}
                  <span className="font-medium text-gray-800">{task.title}</span>
                </div>
                <button
                  onClick={() => onTaskComplete(task.id)}
                  className="flex items-center space-x-1 bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                >
                  <Check size={16} />
                  <span>Complete</span>
                </button>
              </div>
              {task.description && (
                <p className="mt-2 text-sm text-gray-600">{task.description}</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TaskBubbles
