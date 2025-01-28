import React from 'react';
import { TreeType } from '../types';
import { Lock, Check } from 'lucide-react';

interface TreeGalleryProps {
  trees: TreeType[];
  completedSessions: number;
  onSelectTree: (tree: TreeType) => void;
  selectedTree: TreeType;
}

export function TreeGallery({ trees, completedSessions, onSelectTree, selectedTree }: TreeGalleryProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {trees.map((tree) => {
        const isUnlocked = completedSessions >= tree.requiredSessions;
        const isSelected = selectedTree.name === tree.name;
        
        return (
          <div
            key={tree.name}
            className={`relative overflow-hidden group rounded-xl transition-all duration-300
              ${isUnlocked
                ? 'cursor-pointer hover:scale-105'
                : 'opacity-75 cursor-not-allowed'
              } ${isSelected ? 'ring-2 ring-green-500' : ''}`}
            onClick={() => isUnlocked && onSelectTree(tree)}
          >
            <div className="bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 p-6 h-full">
              <div
                className="w-16 h-16 rounded-full mb-4"
                style={{ backgroundColor: tree.color }}
              />
              <h3 className="text-lg font-semibold mb-2">{tree.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {tree.description}
              </p>
              <div className="flex items-center text-sm">
                {isUnlocked ? (
                  <Check className="w-4 h-4 text-green-500 mr-2" />
                ) : (
                  <Lock className="w-4 h-4 text-gray-400 mr-2" />
                )}
                <span>
                  {isUnlocked
                    ? 'Unlocked'
                    : `${tree.requiredSessions} sessions required`}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}