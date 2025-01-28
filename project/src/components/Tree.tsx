import React from 'react';
import { TreeType } from '../types';

interface TreeProps {
  progress: number;
  currentTree: TreeType;
}

export function Tree({ progress, currentTree }: TreeProps) {
  return (
    <div className="relative w-64 h-64">
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={{
          width: '8px',
          height: `${Math.min(100, progress * 100)}%`,
          backgroundColor: currentTree.color,
          transition: 'height 0.5s ease-out',
        }}
      />
      <div
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
        style={{
          width: `${Math.min(120, progress * 150)}px`,
          height: `${Math.min(120, progress * 150)}px`,
          backgroundColor: currentTree.color,
          borderRadius: '50%',
          opacity: 0.8,
          transition: 'all 0.5s ease-out',
        }}
      />
    </div>
  );
}