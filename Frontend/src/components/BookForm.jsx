import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function BookForm({ onSubmit, onClose, initialData }) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    author: '',
    category: 'Fiction'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-indigo-900/20 backdrop-blur-sm flex items-center justify-center p-4 z-[100]">
      <div className="bg-white rounded-[2.5rem] w-full max-w-md p-10 shadow-2xl border border-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-black text-gray-900">{initialData ? 'Update Book' : 'New Story'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Book Title</label>
            <input 
              required
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
              value={formData.title}
              placeholder="e.g. The Great Gatsby"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Author Name</label>
            <input 
              required
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium"
              value={formData.author}
              placeholder="e.g. F. Scott Fitzgerald"
              onChange={(e) => setFormData({...formData, author: e.target.value})}
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 ml-1">Genre</label>
            <select 
              className="w-full px-5 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium appearance-none"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
            >
              <option>Fiction</option>
              <option>Non-Fiction</option>
              <option>Science</option>
              <option>History</option>
            </select>
          </div>
          <button type="submit" className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-xl shadow-indigo-200 transition-all active:scale-95 mt-4">
            {initialData ? 'Save Changes' : 'Add to Collection'}
          </button>
        </form>
      </div>
    </div>
  );
}