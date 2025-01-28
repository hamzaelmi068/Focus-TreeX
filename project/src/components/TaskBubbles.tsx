import React from 'react';
import { Task } from '../types';
import { Circle, CheckCircle, X } from 'lucide-react';

interface TaskBubblesProps {
  tasks: Task[];
  onTaskComplete: (taskId: string) => void;
  onTaskDelete: (taskId: string) => void;
  onTaskSelect: (taskId: string) => void;
  selectedTaskId?: string;
}

const PRIORITY_COLORS = {
  high: 'bg-red-200 hover:bg-red-300',
  medium: 'bg-yellow-200 hover:bg-yellow-300',
  low: 'bg-green-200 hover:bg-green-300',
};

export function TaskBubbles({
  tasks,
  onTaskComplete,
  onTaskDelete,
  onTaskSelect,
  selectedTaskId,
}: TaskBubblesProps) {
  return (
    <div className="flex flex-wrap gap-4 p-4">
      {tasks.map((task) => (
        <div
          key={task.id}
          className={`
            relative group flex items-center p-3 rounded-full cursor-pointer
            transform transition-all hover:scale-105
            ${PRIORITY_COLORS[task.priority]}
            ${selectedTaskId === task.id ? 'ring-2 ring-blue-500' : ''}
            ${task.completed ? 'opacity-50' : ''}
          `}
          onClick={() => !task.completed && onTaskSelect(task.id)}
        >
          <span className="mr-2">
            {task.completed ? (
              <CheckCircle className="text-green-600" />
            ) : (
              <Circle />
            )}
          </span>
          <span className="mr-2">{task.title}</span>
          {task.focusTime > 0 && (
            <span className="text-sm text-gray-600">
              {Math.round(task.focusTime / 60)}m
            </span>
          )}
          <button
            className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100
              bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onTaskDelete(task.id);
            }}
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}