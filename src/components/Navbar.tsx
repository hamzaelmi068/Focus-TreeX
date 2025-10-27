import { useState } from 'react'
import { Menu, X, Settings, User, BarChart3 } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">🌳</span>
            </div>
            <span className="text-xl font-bold text-gray-800">Focus Tree</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
              Dashboard
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
              Statistics
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors">
              Settings
            </a>
            <div className="flex items-center space-x-2">
              <User size={20} className="text-gray-600" />
              <span className="text-gray-600">User</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors py-2">
                Dashboard
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors py-2">
                Statistics
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-800 transition-colors py-2">
                Settings
              </a>
              <div className="flex items-center space-x-2 py-2">
                <User size={20} className="text-gray-600" />
                <span className="text-gray-600">User</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
