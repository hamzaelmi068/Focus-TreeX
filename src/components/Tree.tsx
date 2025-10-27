import { useState, useEffect } from 'react'
import { Sparkles, Leaf, Zap } from 'lucide-react'

interface TreeProps {
  progress: number
  treeType: string
}

const Tree = ({ progress, treeType }: TreeProps) => {
  const [animatedProgress, setAnimatedProgress] = useState(0)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([])
  const [isGrowing, setIsGrowing] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedProgress(progress)
      if (progress > 0) {
        setIsGrowing(true)
        setTimeout(() => setIsGrowing(false), 2000)
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [progress])

  useEffect(() => {
    if (isGrowing) {
      // Generate particles during growth
      const newParticles = Array.from({ length: 8 }, (_, i) => ({
        id: i,
        x: Math.random() * 200 + 50,
        y: Math.random() * 150 + 50,
        delay: Math.random() * 1000
      }))
      setParticles(newParticles)
      
      // Clear particles after animation
      setTimeout(() => setParticles([]), 3000)
    }
  }, [isGrowing])

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

  const trunkHeight = Math.max(30, animatedProgress * 0.8)
  const branchCount = Math.floor(animatedProgress / 8)
  const leafCount = Math.floor(animatedProgress / 4)
  const rootCount = Math.floor(animatedProgress / 15)

  return (
    <div className="glass-card rounded-2xl p-8 text-center card-hover relative overflow-hidden">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 capitalize flex items-center justify-center gap-2">
        <Leaf className="text-green-500" size={28} />
        {treeType} Tree
      </h2>
      
      <div className="relative">
        {/* Tree Container */}
        <div className="relative w-80 h-96 flex items-end justify-center mx-auto">
          
          {/* Roots */}
          {Array.from({ length: rootCount }, (_, i) => (
            <div
              key={`root-${i}`}
              className="absolute root"
              style={{
                bottom: '-10px',
                left: `${50 + (i % 2 === 0 ? -15 : 15)}px`,
                width: `${20 + (i * 2)}px`,
                height: '15px',
                background: `linear-gradient(45deg, ${getTreeColor()}, ${getTreeColor()}dd)`,
                borderRadius: '0 0 10px 10px',
                transform: `rotate(${i % 2 === 0 ? -20 : 20}deg)`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
          
          {/* Trunk */}
          <div 
            className="absolute bottom-0 w-12 bg-gradient-to-t from-gray-800 to-gray-600 rounded-t-lg shadow-lg trunk-grow"
            style={{ 
              height: `${trunkHeight}px`,
              background: `linear-gradient(to top, ${getTreeColor()}, ${getTreeColor()}dd)`,
              boxShadow: `0 0 20px ${getTreeColor()}40`
            }}
          />
          
          {/* Main Branches */}
          {Array.from({ length: Math.min(branchCount, 6) }, (_, i) => (
            <div
              key={`branch-${i}`}
              className="absolute branch"
              style={{
                bottom: `${trunkHeight + (i * 20)}px`,
                left: `${50 + (i % 2 === 0 ? -25 : 25)}px`,
                width: `${35 + (i * 3)}px`,
                height: '6px',
                background: `linear-gradient(90deg, ${getTreeColor()}, ${getTreeColor()}dd)`,
                borderRadius: '3px',
                transform: `rotate(${i % 2 === 0 ? -25 : 25}deg)`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: `0 0 10px ${getTreeColor()}30`
              }}
            />
          ))}
          
          {/* Secondary Branches */}
          {Array.from({ length: Math.max(0, branchCount - 6) }, (_, i) => (
            <div
              key={`sub-branch-${i}`}
              className="absolute sub-branch"
              style={{
                bottom: `${trunkHeight + 40 + (i * 15)}px`,
                left: `${50 + (i % 3 === 0 ? -15 : i % 3 === 1 ? 15 : 0)}px`,
                width: `${20 + (i * 2)}px`,
                height: '4px',
                background: `linear-gradient(90deg, ${getTreeColor()}, ${getTreeColor()}dd)`,
                borderRadius: '2px',
                transform: `rotate(${i % 3 === 0 ? -15 : i % 3 === 1 ? 15 : 0}deg)`,
                animationDelay: `${(i + 6) * 0.15}s`
              }}
            />
          ))}
          
          {/* Leaves */}
          {Array.from({ length: leafCount }, (_, i) => (
            <div
              key={`leaf-${i}`}
              className="absolute leaf"
              style={{
                bottom: `${trunkHeight + 25 + (i * 6)}px`,
                left: `${50 + (i % 2 === 0 ? -20 : 20) + (i * 2)}px`,
                width: `${12 + (i % 3)}px`,
                height: `${12 + (i % 3)}px`,
                background: `radial-gradient(circle, ${getLeafColor()}, ${getLeafColor()}dd)`,
                borderRadius: '50%',
                animationDelay: `${i * 0.1}s`,
                boxShadow: `0 0 8px ${getLeafColor()}40`
              }}
            />
          ))}
          
          {/* Growth Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute particle"
              style={{
                left: `${particle.x}px`,
                top: `${particle.y}px`,
                animationDelay: `${particle.delay}ms`
              }}
            >
              <Sparkles size={16} className="text-yellow-400 animate-pulse" />
            </div>
          ))}
          
          {/* Growth Effect */}
          {isGrowing && (
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-green-400/20 to-blue-500/20 animate-ping" />
              </div>
            </div>
          )}
        </div>
        
        {/* Progress Bar */}
        <div className="mt-8 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
          <div 
            className="h-4 rounded-full bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 transition-all duration-1000 ease-out relative overflow-hidden"
            style={{ width: `${animatedProgress}%` }}
          >
            <div className="absolute inset-0 shimmer" />
          </div>
        </div>
        
        <div className="text-center mt-4">
          <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {Math.round(animatedProgress)}% Complete
          </span>
          {animatedProgress >= 100 && (
            <div className="mt-2 flex items-center justify-center gap-2 text-green-600 dark:text-green-400">
              <Zap size={20} />
              <span className="font-medium">Tree Fully Grown!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Tree
