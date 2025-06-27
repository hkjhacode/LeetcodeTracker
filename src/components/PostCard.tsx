import React, { useState } from 'react';
import { DailyPost } from '../types';
import { Calendar, Hash, ExternalLink, BookOpen, Edit3, Trash2, Save, X, Image as ImageIcon } from 'lucide-react';

interface PostCardProps {
  post: DailyPost;
  isOwner?: boolean;
  onEdit?: (post: DailyPost) => void;
  onDelete?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, isOwner = true, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedPost, setEditedPost] = useState(post);

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

  const handleSave = () => {
    if (onEdit) {
      onEdit(editedPost);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedPost(post);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (onDelete && window.confirm('Are you sure you want to delete this post?')) {
      onDelete(post.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 hover:scale-[1.01] relative group">
      {isOwner && (
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {!isEditing ? (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                title="Edit post"
              >
                <Edit3 className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                title="Delete post"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={handleSave}
                className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                title="Save changes"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                title="Cancel editing"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex items-start justify-between mb-4 pr-20">
        <div className="flex items-center space-x-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{formatDate(post.date)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Problems solved:</span>
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold">
            {post.problemsSolved}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Day {post.day} of #100DaysOfLeetCode
        </h3>
        <div className="flex items-center space-x-2 mb-3">
          <BookOpen className="w-4 h-4 text-purple-500" />
          <span className="text-sm text-gray-600">Pattern:</span>
          {isEditing ? (
            <input
              type="text"
              value={editedPost.pattern}
              onChange={(e) => setEditedPost({ ...editedPost, pattern: e.target.value })}
              className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ) : (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-sm font-medium">
              {post.pattern}
            </span>
          )}
        </div>
      </div>

      {post.images && post.images.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <ImageIcon className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">Screenshots</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {post.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Screenshot ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border border-gray-200 hover:scale-105 transition-transform cursor-pointer"
              />
            ))}
          </div>
        </div>
      )}

      <div className="mb-4">
        <h4 className="font-semibold text-gray-800 mb-3">LeetCode Problems:</h4>
        <div className="space-y-2">
          {post.problems.map((problem, index) => (
            <div key={problem.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-500">{index + 1}.</span>
                <div>
                  <a
                    href={problem.url || `https://leetcode.com/problems/${problem.slug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium hover:underline flex items-center space-x-1"
                  >
                    <span>{problem.title}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                    {problem.pattern && (
                      <span className="text-xs text-gray-500">#{problem.pattern}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {post.tags.length > 0 && (
        <div className="flex items-center space-x-2 flex-wrap mb-4">
          <Hash className="w-4 h-4 text-gray-400" />
          {post.tags.map((tag, index) => (
            <span key={index} className="text-blue-600 text-sm hover:text-blue-800 cursor-pointer">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {post.notes && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          {isEditing ? (
            <textarea
              value={editedPost.notes || ''}
              onChange={(e) => setEditedPost({ ...editedPost, notes: e.target.value })}
              className="w-full text-sm text-gray-700 bg-transparent border-none resize-none focus:outline-none"
              rows={3}
            />
          ) : (
            <p className="text-sm text-gray-700">{post.notes}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default PostCard;