export interface Task {
  id: string
  title: string
  description?: string
  completed: boolean
  createdAt: Date
  estimatedTime?: number
  priority: 'low' | 'medium' | 'high'
}

export interface TreeType {
  id: string
  name: string
  description: string
  color: string
  unlocked: boolean
}

export interface UserStats {
  totalFocusTime: number
  streak: number
  tasksCompleted: number
  level: number
}
