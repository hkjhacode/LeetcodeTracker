import React from 'react';
import { Home, BookOpen, Plus, PlusCircle, User, BarChart3 } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  const navigationItems = [
    { id: 'daily-posts', label: 'Daily Posts', icon: Home },
    { id: 'solutions-blog', label: 'Solutions Blog', icon: BookOpen },
    { id: 'add-post', label: 'Add Post', icon: Plus },
    { id: 'add-blog', label: 'Add Blog', icon: PlusCircle },
    { id: 'stats', label: 'Statistics', icon: BarChart3 },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  return (
    <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 z-40 border-r border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">LC</span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-900">LeetCode Tracker</h1>
            <p className="text-sm text-gray-500">#100DaysOfCode</p>
          </div>
        </div>
      </div>
      
      <nav className="p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-blue-50 text-blue-600 border border-blue-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;