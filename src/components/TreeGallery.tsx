import { useState } from 'react'

interface TreeGalleryProps {
  selectedTree: string
  onTreeSelect: (treeType: string) => void
}

const TreeGallery = ({ selectedTree, onTreeSelect }: TreeGalleryProps) => {
  const trees = [
    { id: 'oak', name: 'Oak', color: '#8B4513', leafColor: '#228B22', unlocked: true },
    { id: 'pine', name: 'Pine', color: '#228B22', leafColor: '#006400', unlocked: true },
    { id: 'cherry', name: 'Cherry', color: '#FFB6C1', leafColor: '#FF69B4', unlocked: false },
    { id: 'maple', name: 'Maple', color: '#CD853F', leafColor: '#FF4500', unlocked: false }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Tree Gallery</h2>
      
      <div className="grid grid-cols-2 gap-4">
        {trees.map((tree) => (
          <div
            key={tree.id}
            className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedTree === tree.id
                ? 'border-blue-500 bg-blue-50'
                : tree.unlocked
                ? 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                : 'border-gray-100 bg-gray-50 opacity-50 cursor-not-allowed'
            }`}
            onClick={() => tree.unlocked && onTreeSelect(tree.id)}
          >
            <div className="flex flex-col items-center space-y-2">
              {/* Tree Preview */}
              <div className="relative w-16 h-20">
                <div
                  className="absolute bottom-0 w-3 h-8 rounded-t"
                  style={{ backgroundColor: tree.color }}
                />
                <div
                  className="absolute bottom-6 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full"
                  style={{ backgroundColor: tree.leafColor }}
                />
              </div>
              
              <div className="text-center">
                <div className="font-medium text-gray-800">{tree.name}</div>
                {!tree.unlocked && (
                  <div className="text-xs text-gray-500">Locked</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700">
          Complete focus sessions to unlock new tree types!
        </p>
      </div>
    </div>
  )
}

export default TreeGallery
