import { useState } from 'react'
import { Menu, X, Settings, User, BarChart3 } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-white/20 dark:border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center glow-effect">
              <span className="text-white font-bold text-sm">🌳</span>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Focus Tree
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">
              Dashboard
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">
              Statistics
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors font-medium">
              Settings
            </a>
            
            {/* Theme Toggle */}
            <ThemeToggle />
            
            <div className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 dark:bg-black/10 backdrop-blur-md border border-white/20 dark:border-white/10">
              <User size={20} className="text-gray-600 dark:text-gray-300" />
              <span className="text-gray-600 dark:text-gray-300 font-medium">User</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 dark:hover:bg-black/10 transition-colors"
            >
              {isMenuOpen ? <X size={24} className="text-gray-600 dark:text-gray-300" /> : <Menu size={24} className="text-gray-600 dark:text-gray-300" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20 dark:border-white/10">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 font-medium">
                Dashboard
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 font-medium">
                Statistics
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2 font-medium">
                Settings
              </a>
              <div className="flex items-center space-x-2 py-2">
                <User size={20} className="text-gray-600 dark:text-gray-300" />
                <span className="text-gray-600 dark:text-gray-300 font-medium">User</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
