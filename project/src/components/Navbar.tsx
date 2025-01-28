import React from 'react';
import { Leaf, Timer, TreeDeciduous, BarChart2, Trophy, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick: () => void;
}

interface NavbarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navbar({ activeSection, onSectionChange }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems: NavItem[] = [
    {
      icon: <Timer className="w-5 h-5" />,
      label: 'Timer',
      active: activeSection === 'timer',
      onClick: () => onSectionChange('timer')
    },
    {
      icon: <TreeDeciduous className="w-5 h-5" />,
      label: 'Forest',
      active: activeSection === 'forest',
      onClick: () => onSectionChange('forest')
    },
    {
      icon: <BarChart2 className="w-5 h-5" />,
      label: 'Stats',
      active: activeSection === 'stats',
      onClick: () => onSectionChange('stats')
    },
    {
      icon: <Trophy className="w-5 h-5" />,
      label: 'Achievements',
      active: activeSection === 'achievements',
      onClick: () => onSectionChange('achievements')
    }
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Leaf className="w-8 h-8 text-green-500" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
              Focus Garden
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={item.onClick}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200
                  ${item.active
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-500/10 text-gray-600 dark:text-gray-300'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  item.onClick();
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 w-full px-4 py-2 rounded-lg transition-all duration-200
                  ${item.active
                    ? 'bg-green-500 text-white'
                    : 'hover:bg-green-500/10 text-gray-600 dark:text-gray-300'
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}