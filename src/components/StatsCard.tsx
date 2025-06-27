import React from 'react';
import { UserStats } from '../types';
import { TrendingUp, Target, Flame, Trophy, Calendar } from 'lucide-react';

interface StatsCardProps {
  stats: UserStats;
}

const StatsCard: React.FC<StatsCardProps> = ({ stats }) => {
  const getMotivationalMessage = () => {
    if (stats.currentDay === 0) {
      return "Ready to start your coding journey? Let's make it happen! 🚀";
    } else if (stats.currentDay < 10) {
      return "Great start! Building momentum one problem at a time 💪";
    } else if (stats.currentDay < 50) {
      return "You're making excellent progress! Keep the streak alive 🔥";
    } else if (stats.currentDay < 90) {
      return "Almost there! The finish line is in sight 🎯";
    } else {
      return "Final stretch! You're about to complete an amazing journey! 🏆";
    }
  };

  const getProgressColor = () => {
    if (stats.completionPercentage < 25) return 'from-blue-400 to-blue-600';
    if (stats.completionPercentage < 50) return 'from-green-400 to-green-600';
    if (stats.completionPercentage < 75) return 'from-yellow-400 to-orange-500';
    return 'from-purple-400 to-pink-600';
  };

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white mb-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Harsh Kumar Jha's #100DaysOfLeetCode</h2>
            <p className="text-blue-100 mt-1">{getMotivationalMessage()}</p>
            {stats.currentDay === 0 && (
              <p className="text-blue-200 text-sm mt-2">Click "Add Post" to begin your journey!</p>
            )}
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{stats.completionPercentage}%</div>
            <div className="text-blue-100">Complete</div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2 mb-2">
              <Trophy className="w-5 h-5 text-yellow-300" />
              <span className="text-sm text-blue-100">Problems Solved</span>
            </div>
            <div className="text-2xl font-bold">{stats.totalProblems}</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-green-300" />
              <span className="text-sm text-blue-100">Current Day</span>
            </div>
            <div className="text-2xl font-bold">{stats.currentDay}/100</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2 mb-2">
              <Flame className="w-5 h-5 text-orange-300" />
              <span className="text-sm text-blue-100">Current Streak</span>
            </div>
            <div className="text-2xl font-bold">{stats.currentStreak} days</div>
          </div>
          
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/20">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-pink-300" />
              <span className="text-sm text-blue-100">Max Streak</span>
            </div>
            <div className="text-2xl font-bold">{stats.maxStreak} days</div>
          </div>
        </div>
        
        <div className="bg-white/10 rounded-lg p-3 backdrop-blur-sm border border-white/20">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-blue-100">Progress to 100 Days</span>
            <span className="text-sm text-blue-100">{stats.currentDay}/100 days</span>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className={`bg-gradient-to-r ${getProgressColor()} h-3 rounded-full transition-all duration-1000 ease-out`}
              style={{ width: `${stats.completionPercentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;