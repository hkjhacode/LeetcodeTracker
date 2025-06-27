import React, { useState } from 'react';
import { DailyPost, LeetCodeProblem } from '../types';
import { Plus, Trash2, Save, Calendar, Hash, BookOpen } from 'lucide-react';
import ImageUpload from './ImageUpload';

interface AddPostFormProps {
  onAddPost: (post: Omit<DailyPost, 'id'>) => void;
  lastDay: number;
}

const AddPostForm: React.FC<AddPostFormProps> = ({ onAddPost, lastDay }) => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    day: lastDay + 1,
    pattern: '',
    notes: '',
    tags: '' as string
  });

  const [problems, setProblems] = useState<Omit<LeetCodeProblem, 'id'>[]>([
    { title: '', slug: '', difficulty: 'Easy' as const, pattern: '' }
  ]);

  const [images, setImages] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validProblems = problems.filter(p => p.title.trim() && p.slug.trim());
    if (validProblems.length === 0) {
      alert('Please add at least one problem with title and slug.');
      return;
    }

    const post: Omit<DailyPost, 'id'> = {
      date: formData.date,
      day: formData.day,
      pattern: formData.pattern,
      problemsSolved: validProblems.length,
      problems: validProblems.map((p, index) => ({
        ...p,
        id: `${Date.now()}-${index}`,
        url: `https://leetcode.com/problems/${p.slug}/`
      })),
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      notes: formData.notes || undefined,
      images: images.length > 0 ? images : undefined
    };

    onAddPost(post);
    
    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      day: lastDay + 2,
      pattern: '',
      notes: '',
      tags: ''
    });
    setProblems([{ title: '', slug: '', difficulty: 'Easy', pattern: '' }]);
    setImages([]);
  };

  const addProblem = () => {
    setProblems([...problems, { title: '', slug: '', difficulty: 'Easy', pattern: '' }]);
  };

  const removeProblem = (index: number) => {
    if (problems.length > 1) {
      setProblems(problems.filter((_, i) => i !== index));
    }
  };

  const updateProblem = (index: number, field: keyof Omit<LeetCodeProblem, 'id'>, value: string) => {
    setProblems(problems.map((p, i) => i === index ? { ...p, [field]: value } : p));
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Add New Post</h2>
          <p className="text-gray-600">Document your daily LeetCode progress</p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Calendar className="w-4 h-4" />
              <span>Date</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <Hash className="w-4 h-4" />
              <span>Day</span>
            </label>
            <input
              type="number"
              min="1"
              max="100"
              value={formData.day}
              onChange={(e) => setFormData({ ...formData, day: parseInt(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              required
            />
          </div>
          
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
              <BookOpen className="w-4 h-4" />
              <span>Pattern</span>
            </label>
            <input
              type="text"
              value={formData.pattern}
              onChange={(e) => setFormData({ ...formData, pattern: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
              placeholder="e.g., two pointer, sliding window"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="block text-sm font-medium text-gray-700">Problems</label>
            <button
              type="button"
              onClick={addProblem}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm hover:shadow-md"
            >
              <Plus className="w-4 h-4" />
              <span>Add Problem</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {problems.map((problem, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-700">Problem {index + 1}</span>
                  {problems.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProblem(index)}
                      className="text-red-500 hover:text-red-700 p-1 rounded hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Problem title"
                      value={problem.title}
                      onChange={(e) => updateProblem(index, 'title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Problem slug (from URL)"
                      value={problem.slug}
                      onChange={(e) => updateProblem(index, 'slug', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      required
                    />
                  </div>
                  
                  <div>
                    <select
                      value={problem.difficulty}
                      onChange={(e) => updateProblem(index, 'difficulty', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  
                  <div>
                    <input
                      type="text"
                      placeholder="Pattern (optional)"
                      value={problem.pattern || ''}
                      onChange={(e) => updateProblem(index, 'pattern', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Images (Optional)</label>
          <ImageUpload
            images={images}
            onImagesChange={setImages}
            maxImages={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            placeholder="e.g., stack, array, dynamic programming"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            placeholder="Add any additional notes about today's progress, insights, or challenges..."
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-gray-200">
          <button
            type="submit"
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
          >
            <Save className="w-4 h-4" />
            <span>Save Post</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPostForm;