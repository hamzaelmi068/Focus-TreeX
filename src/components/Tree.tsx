import { useState, useEffect } from 'react'

interface TreeProps {
  progress: number
  treeType: string
}

const Tree = ({ progress, treeType }: TreeProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
    }, 100)
    return () => clearTimeout(timer)
  }, [progress])

  const getTreeColor = () => {
    switch (treeType) {
      case 'oak': return '#8B4513'
      case 'pine': return '#228B22'
      case 'cherry': return '#FFB6C1'
      case 'maple': return '#CD853F'
      default: return '#8B4513'
    }
  }

  const getLeafColor = () => {
    switch (treeType) {
      case 'oak': return '#228B22'
      case 'pine': return '#006400'
      case 'cherry': return '#FF69B4'
      case 'maple': return '#FF4500'
      default: return '#228B22'
    }
  }

  const trunkHeight = Math.max(20, animatedProgress * 0.8)
  const branchCount = Math.floor(animatedProgress / 10)
  const leafCount = Math.floor(animatedProgress / 5)

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
        {treeType} Tree
      </h2>
      
      <div className="relative">
        {/* Tree Container */}
        <div className="relative w-64 h-80 flex items-end justify-center">
          
          {/* Trunk */}
          <div 
            className="absolute bottom-0 w-8 bg-gradient-to-t from-gray-800 to-gray-600 rounded-t-lg shadow-lg"
            style={{ 
              height: `${trunkHeight}px`,
              background: `linear-gradient(to top, ${getTreeColor()}, ${getTreeColor()}dd)`
            }}
          />
          
          {/* Branches */}
          {Array.from({ length: branchCount }, (_, i) => (
            <div
              key={i}
              className="absolute branch"
              style={{
                bottom: `${trunkHeight + (i * 15)}px`,
                left: `${50 + (i % 2 === 0 ? -20 : 20)}px`,
                width: `${30 + (i * 2)}px`,
                height: '4px',
                background: getTreeColor(),
                borderRadius: '2px',
                transform: `rotate(${i % 2 === 0 ? -15 : 15}deg)`,
                animationDelay: `${i * 0.2}s`
              }}
            />
          ))}
          
          {/* Leaves */}
          {Array.from({ length: leafCount }, (_, i) => (
            <div
              key={i}
              className="absolute leaf"
              style={{
                bottom: `${trunkHeight + 20 + (i * 8)}px`,
                left: `${50 + (i % 2 === 0 ? -15 : 15) + (i * 3)}px`,
                width: '12px',
                height: '12px',
                background: getLeafColor(),
                borderRadius: '50%',
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
          
          {/* Particles during growth */}
          {animatedProgress > 0 && (
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 5 }, (_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-400 rounded-full sparkle"
                  style={{
                    left: `${30 + (i * 20)}px`,
                    top: `${50 + (i * 10)}px`,
                    animationDelay: `${i * 0.3}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-6 w-full bg-gray-200 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${animatedProgress}%` }}
          />
        </div>
        
        <div className="text-center mt-2">
          <span className="text-sm font-medium text-gray-600">
            {Math.round(animatedProgress)}% Complete
          </span>
        </div>
      </div>
    </div>
  )
}

export default Tree
