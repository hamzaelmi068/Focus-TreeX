import { useEffect, useRef } from 'react'

interface TimelineEntry {
  title: string
  content: React.ReactNode
  timestamp?: string
  completed?: boolean
}

interface TimelineProps {
  data: TimelineEntry[]
  className?: string
}

const Timeline = ({ data, className = '' }: TimelineProps) => {
  const timelineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timeline = timelineRef.current
    if (!timeline) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    const items = timeline.querySelectorAll('.timeline-item')
    items.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={timelineRef} className={`relative ${className}`}>
      {/* Timeline Line */}
      <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-400 via-blue-500 to-purple-600 dark:from-green-500 dark:via-blue-400 dark:to-purple-500" />
      
      {data.map((entry, index) => (
        <div
          key={index}
          className={`timeline-item relative flex items-start mb-8 opacity-0 translate-y-4 transition-all duration-700 ease-out ${
            entry.completed ? 'opacity-100' : ''
          }`}
          style={{ transitionDelay: `${index * 100}ms` }}
        >
          {/* Timeline Dot */}
          <div className="relative z-10 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-500 dark:from-green-500 dark:to-blue-400 shadow-lg border-4 border-white dark:border-gray-800">
            <div className="w-3 h-3 rounded-full bg-white dark:bg-gray-100" />
            {entry.completed && (
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-400 to-blue-500 animate-ping opacity-75" />
            )}
          </div>

          {/* Content Card */}
          <div className="ml-6 flex-1">
            <div className="glass-card rounded-xl p-6 card-hover">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {entry.title}
                </h3>
                {entry.timestamp && (
                  <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    {entry.timestamp}
                  </span>
                )}
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                {entry.content}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Timeline
