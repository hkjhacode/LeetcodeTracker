import React from 'react';
import { BlogPost } from '../types';
import { Calendar, Clock, User, Hash, ExternalLink } from 'lucide-react';

interface BlogCardProps {
  blog: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'text-green-600 bg-green-50 border-green-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Hard': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <article className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(blog.date)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{blog.readTime} min read</span>
          </div>
        </div>
        {blog.difficulty && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(blog.difficulty)}`}>
            {blog.difficulty}
          </span>
        )}
      </div>

      <h2 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 cursor-pointer transition-colors">
        {blog.title}
      </h2>

      <div className="flex items-center space-x-2 mb-4">
        <User className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">by {blog.author}</span>
        {blog.problemSlug && (
          <>
            <span className="text-gray-300">•</span>
            <a
              href={`https://leetcode.com/problems/${blog.problemSlug}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center space-x-1"
            >
              <span>View Problem</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </>
        )}
      </div>

      {blog.images && blog.images.length > 0 && (
        <div className="mb-4">
          <img
            src={blog.images[0]}
            alt="Blog cover"
            className="w-full h-48 object-cover rounded-lg"
          />
        </div>
      )}

      <div className="text-gray-700 mb-4">
        <p className="line-clamp-3">
          {blog.content.substring(0, 200)}...
        </p>
      </div>

      {blog.tags.length > 0 && (
        <div className="flex items-center space-x-2 flex-wrap mb-4">
          <Hash className="w-4 h-4 text-gray-400" />
          {blog.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-blue-600 text-sm hover:text-blue-800 cursor-pointer">
              #{tag}
            </span>
          ))}
          {blog.tags.length > 3 && (
            <span className="text-gray-500 text-sm">+{blog.tags.length - 3} more</span>
          )}
        </div>
      )}

      <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
        Read More →
      </button>
    </article>
  );
};

export default BlogCard;