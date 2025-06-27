import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import StatsCard from './components/StatsCard';
import PostCard from './components/PostCard';
import AddPostForm from './components/AddPostForm';
import StatisticsView from './components/StatisticsView';
import BlogEditor from './components/BlogEditor';
import BlogCard from './components/BlogCard';
import { DailyPost, UserStats, BlogPost } from './types';
import { mockPosts } from './data/mockData';
import { calculateStats } from './utils/storage';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Search, Filter, BookOpen, PlusCircle } from 'lucide-react';

function App() {
  const [activeSection, setActiveSection] = useState('daily-posts');
  const [posts, setPosts] = useLocalStorage<DailyPost[]>('leetcode-posts', mockPosts);
  const [blogs, setBlogs] = useLocalStorage<BlogPost[]>('leetcode-blogs', []);
  const [stats, setStats] = useState<UserStats>(() => calculateStats(posts));
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPattern, setFilterPattern] = useState('');
  const [isOwner] = useState(true); // Set to false for read-only mode

  useEffect(() => {
    const newStats = calculateStats(posts);
    setStats(newStats);
  }, [posts]);

  const handleAddPost = (newPost: Omit<DailyPost, 'id'>) => {
    const postWithId: DailyPost = {
      ...newPost,
      id: Date.now().toString()
    };
    setPosts([postWithId, ...posts]);
    setActiveSection('daily-posts');
  };

  const handleAddBlog = (newBlog: Omit<BlogPost, 'id'>) => {
    const blogWithId: BlogPost = {
      ...newBlog,
      id: Date.now().toString()
    };
    setBlogs([blogWithId, ...blogs]);
    setActiveSection('solutions-blog');
  };

  const handleEditPost = (editedPost: DailyPost) => {
    setPosts(posts.map(post => post.id === editedPost.id ? editedPost : post));
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(post => post.id !== postId));
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchTerm === '' || 
      post.pattern.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.problems.some(p => p.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterPattern === '' || post.pattern === filterPattern;
    
    return matchesSearch && matchesFilter;
  });

  const filteredBlogs = blogs.filter(blog => {
    return searchTerm === '' || 
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      blog.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
  });

  const uniquePatterns = Array.from(new Set(posts.map(post => post.pattern))).sort();

  const renderEmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <BookOpen className="w-12 h-12 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Welcome to your #100DaysOfLeetCode tracker! Document your daily progress, 
        track patterns, and watch your skills grow over the next 100 days.
      </p>
      {isOwner && (
        <button
          onClick={() => setActiveSection('add-post')}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
        >
          <PlusCircle className="w-5 h-5" />
          <span>Add Your First Post</span>
        </button>
      )}
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'daily-posts':
        return (
          <div>
            <StatsCard stats={stats} />
            
            {posts.length > 0 && (
              <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search posts, problems, or tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  />
                </div>
                
                <div className="relative">
                  <Filter className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <select
                    value={filterPattern}
                    onChange={(e) => setFilterPattern(e.target.value)}
                    className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white transition-colors"
                  >
                    <option value="">All Patterns</option>
                    {uniquePatterns.map(pattern => (
                      <option key={pattern} value={pattern}>{pattern}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {posts.length === 0 ? (
                renderEmptyState()
              ) : filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <PostCard 
                    key={post.id} 
                    post={post} 
                    isOwner={isOwner}
                    onEdit={handleEditPost}
                    onDelete={handleDeletePost}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No posts found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'add-post':
        return isOwner ? (
          <AddPostForm 
            onAddPost={handleAddPost} 
            lastDay={Math.max(...posts.map(p => p.day), 0)} 
          />
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Read-Only Mode</h2>
            <p className="text-gray-600">
              You're viewing this tracker in read-only mode. Only the owner can add new posts.
            </p>
          </div>
        );

      case 'stats':
        return <StatisticsView stats={stats} />;

      case 'solutions-blog':
        return (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Solutions Blog</h2>
                <p className="text-gray-600">Detailed explanations and tutorials</p>
              </div>
              {isOwner && (
                <button
                  onClick={() => setActiveSection('add-blog')}
                  className="flex items-center space-x-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>New Blog</span>
                </button>
              )}
            </div>

            {blogs.length > 0 && (
              <div className="mb-6">
                <div className="relative">
                  <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search blog posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="space-y-6">
              {blogs.length === 0 ? (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <BookOpen className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Blog Posts Yet</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    Start sharing your LeetCode solutions and insights with detailed blog posts.
                  </p>
                  {isOwner && (
                    <button
                      onClick={() => setActiveSection('add-blog')}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                    >
                      <PlusCircle className="w-5 h-5" />
                      <span>Write Your First Blog</span>
                    </button>
                  )}
                </div>
              ) : filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No blogs found</h3>
                  <p className="text-gray-500">
                    Try adjusting your search criteria
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'add-blog':
        return isOwner ? (
          <BlogEditor onSaveBlog={handleAddBlog} />
        ) : (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
            <div className="text-gray-400 text-6xl mb-4">🔒</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Read-Only Mode</h2>
            <p className="text-gray-600">
              You're viewing this tracker in read-only mode. Only the owner can add blog posts.
            </p>
          </div>
        );

      case 'profile':
        return (
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-8">
            <div className="flex items-center space-x-6 mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">HK</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Harsh Kumar Jha</h2>
                <p className="text-gray-600">Full Stack Developer</p>
                <p className="text-sm text-gray-500">#100DaysOfLeetCode Journey</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Journey Stats</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Started:</span>
                    <span className="font-medium">
                      {posts.length > 0 ? new Date(Math.min(...posts.map(p => new Date(p.date).getTime()))).toLocaleDateString() : 'Not started yet'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Day:</span>
                    <span className="font-medium">{stats.currentDay}/100</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Problems:</span>
                    <span className="font-medium">{stats.totalProblems}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blog Posts:</span>
                    <span className="font-medium">{blogs.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Streak:</span>
                    <span className="font-medium">{stats.currentStreak} days</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Favorite Patterns</h3>
                <div className="space-y-2">
                  {Object.entries(stats.patternCounts).length > 0 ? (
                    Object.entries(stats.patternCounts)
                      .sort(([,a], [,b]) => b - a)
                      .slice(0, 3)
                      .map(([pattern, count]) => (
                        <div key={pattern} className="flex justify-between">
                          <span className="text-gray-600 capitalize">{pattern}:</span>
                          <span className="font-medium">{count} problems</span>
                        </div>
                      ))
                  ) : (
                    <p className="text-gray-500 text-sm">No patterns tracked yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}

export default App;