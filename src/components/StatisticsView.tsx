import React from 'react';
import { UserStats } from '../types';
import { BarChart, PieChart, TrendingUp, Award } from 'lucide-react';

interface StatisticsViewProps {
  stats: UserStats;
}

const StatisticsView: React.FC<StatisticsViewProps> = ({ stats }) => {
  const totalDifficultyProblems = stats.problemsByDifficulty.easy + 
                                  stats.problemsByDifficulty.medium + 
                                  stats.problemsByDifficulty.hard;

  const topPatterns = Object.entries(stats.patternCounts)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
        <div className="flex items-center space-x-3 mb-6">
          <BarChart className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold text-gray-900">Detailed Statistics</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Easy Problems</p>
                <p className="text-2xl font-bold">{stats.problemsByDifficulty.easy}</p>
              </div>
              <Award className="w-8 h-8 text-green-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Medium Problems</p>
                <p className="text-2xl font-bold">{stats.problemsByDifficulty.medium}</p>
              </div>
              <Award className="w-8 h-8 text-yellow-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100 text-sm">Hard Problems</p>
                <p className="text-2xl font-bold">{stats.problemsByDifficulty.hard}</p>
              </div>
              <Award className="w-8 h-8 text-red-200" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Avg/Day</p>
                <p className="text-2xl font-bold">
                  {stats.currentDay > 0 ? (stats.totalProblems / stats.currentDay).toFixed(1) : '0'}
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <PieChart className="w-6 h-6 text-purple-500" />
            <h3 className="text-xl font-bold text-gray-900">Difficulty Distribution</h3>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-700">Easy</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-900 font-semibold">{stats.problemsByDifficulty.easy}</span>
                <span className="text-gray-500 text-sm">
                  ({totalDifficultyProblems > 0 ? Math.round((stats.problemsByDifficulty.easy / totalDifficultyProblems) * 100) : 0}%)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-yellow-500 rounded"></div>
                <span className="text-gray-700">Medium</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-900 font-semibold">{stats.problemsByDifficulty.medium}</span>
                <span className="text-gray-500 text-sm">
                  ({totalDifficultyProblems > 0 ? Math.round((stats.problemsByDifficulty.medium / totalDifficultyProblems) * 100) : 0}%)
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-red-500 rounded"></div>
                <span className="text-gray-700">Hard</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-900 font-semibold">{stats.problemsByDifficulty.hard}</span>
                <span className="text-gray-500 text-sm">
                  ({totalDifficultyProblems > 0 ? Math.round((stats.problemsByDifficulty.hard / totalDifficultyProblems) * 100) : 0}%)
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="flex h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500"
                  style={{ width: `${totalDifficultyProblems > 0 ? (stats.problemsByDifficulty.easy / totalDifficultyProblems) * 100 : 0}%` }}
                />
                <div 
                  className="bg-yellow-500"
                  style={{ width: `${totalDifficultyProblems > 0 ? (stats.problemsByDifficulty.medium / totalDifficultyProblems) * 100 : 0}%` }}
                />
                <div 
                  className="bg-red-500"
                  style={{ width: `${totalDifficultyProblems > 0 ? (stats.problemsByDifficulty.hard / totalDifficultyProblems) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-indigo-500" />
            <h3 className="text-xl font-bold text-gray-900">Top Patterns</h3>
          </div>

          <div className="space-y-4">
            {topPatterns.length > 0 ? (
              topPatterns.map(([pattern, count], index) => (
                <div key={pattern} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold
                      ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'}`}>
                      {index + 1}
                    </div>
                    <span className="text-gray-700 capitalize">{pattern}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(count / Math.max(...Object.values(stats.patternCounts))) * 100}%` }}
                      />
                    </div>
                    <span className="text-gray-900 font-semibold w-8 text-right">{count}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500 py-8">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No patterns tracked yet</p>
                <p className="text-sm">Start adding posts to see pattern statistics</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsView;