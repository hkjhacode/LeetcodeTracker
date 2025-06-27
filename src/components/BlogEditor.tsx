import React, { useState } from 'react';
import { BlogPost } from '../types';
import { Save, Eye, Hash, Clock, User } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface BlogEditorProps {
  onSaveBlog: (blog: Omit<BlogPost, 'id'>) => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ onSaveBlog }) => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Harsh Kumar Jha',
    tags: '',
    difficulty: '' as '' | 'Easy' | 'Medium' | 'Hard',
    problemSlug: ''
  });
  
  const [images, setImages] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState(false);

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.max(1, Math.ceil(words / wordsPerMinute));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please fill in title and content');
      return;
    }

    const blog: Omit<BlogPost, 'id'> = {
      title: formData.title,
      content: formData.content,
      author: formData.author,
      date: new Date().toISOString(),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      difficulty: formData.difficulty || undefined,
      problemSlug: formData.problemSlug || undefined,
      images: images.length > 0 ? images : undefined,
      readTime: calculateReadTime(formData.content)
    };

    onSaveBlog(blog);
    
    // Reset form
    setFormData({
      title: '',
      content: '',
      author: 'Harsh Kumar Jha',
      tags: '',
      difficulty: '',
      problemSlug: ''
    });
    setImages([]);
  };

  const renderPreview = () => (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{formData.title || 'Blog Title'}</h1>
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <User className="w-4 h-4" />
            <span>{formData.author}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Clock className="w-4 h-4" />
            <span>{calculateReadTime(formData.content)} min read</span>
          </div>
          {formData.difficulty && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              formData.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              formData.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {formData.difficulty}
            </span>
          )}
        </div>
      </div>

      {images.length > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Blog image ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      <div className="prose max-w-none">
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {formData.content || 'Your blog content will appear here...'}
        </div>
      </div>

      {formData.tags && (
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center space-x-2 flex-wrap">
            <Hash className="w-4 h-4 text-gray-400" />
            {formData.tags.split(',').map((tag, index) => (
              <span key={index} className="text-blue-600 text-sm hover:text-blue-800">
                #{tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (isPreview) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Blog Preview</h2>
          <button
            onClick={() => setIsPreview(false)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Back to Editor
          </button>
        </div>
        {renderPreview()}
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Create Blog Post</h2>
          <p className="text-gray-600">Share your LeetCode solutions and insights</p>
        </div>
        <button
          onClick={() => setIsPreview(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>Preview</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="Enter blog post title..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty (Optional)</label>
            <select
              value={formData.difficulty}
              onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            >
              <option value="">Select difficulty</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Problem Slug (Optional)</label>
            <input
              type="text"
              value={formData.problemSlug}
              onChange={(e) => setFormData({ ...formData, problemSlug: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="e.g., two-sum"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={5}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            rows={12}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            placeholder="Write your blog content here... You can include code snippets, explanations, and insights."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="e.g., algorithms, data structures, dynamic programming"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Publish Blog</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;