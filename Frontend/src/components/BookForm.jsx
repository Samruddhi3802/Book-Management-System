import React, { useState, useEffect } from 'react';
import { X, BookOpen, User, Calendar, DollarSign, AlignLeft, Check } from 'lucide-react';

export default function BookForm({ onSubmit, onClose, initialData }) {
  const [formData, setFormData] = useState({
    title: '', author: '', publishdate: '', price: '', description: ''
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-indigo-950/40 backdrop-blur-md" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative bg-white rounded-[2.5rem] w-full max-w-lg shadow-2xl border border-white overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* FIXED HEADER */}
        <div className="shrink-0 bg-gradient-to-r from-indigo-600 to-purple-600 p-6 flex justify-between items-center">
          <h2 className="text-xl font-black text-white uppercase tracking-tight">
            {initialData ? 'Update Book' : 'Add New Entry'}
          </h2>
          <button onClick={onClose} className="p-2 bg-white/20 hover:bg-white/30 rounded-xl text-white transition-all">
            <X size={20} />
          </button>
        </div>

        {/* SCROLLABLE FORM BODY */}
        <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="flex flex-col overflow-hidden">
          <div className="overflow-y-auto p-8 space-y-6 custom-scrollbar">
            {/* Title */}
            <div className="space-y-2">
              <label className="label-style"><BookOpen size={12}/> Title</label>
              <input required className="input-style m-5" placeholder="Enter book title" value={formData.title}     
                onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </div>

            {/* Author */}
            <div className="space-y-2">
              <label className="label-style"><User size={12}/> Author</label>
              <input required className="input-style m-5" placeholder="Enter author name" value={formData.author} 
                onChange={(e) => setFormData({...formData, author: e.target.value})} />
            </div>

            {/* Row: Date & Price */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="label-style"> Date</label>
                <input required type="date" className="input-style m-3" value={formData.publishdate} 
                  onChange={(e) => setFormData({...formData, publishdate: e.target.value})} />
              </div>
              <div className="flex space-y-2">
                <label className="label-style"> Price</label>
                <input required type="number" className="input-style m-3" placeholder="Enter book price" value={formData.price} 
                  onChange={(e) => setFormData({...formData, price: e.target.value})} />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2 pb-2">
              <label className="label-style"><AlignLeft size={12}/> Description</label>
              <textarea required rows="4" className="input-style resize-none" value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </div>
          </div>

          {/* FIXED FOOTER BUTTON */}
          <div className="shrink-0 p-6 bg-gray-50 border-t border-gray-100">
            <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2 active:scale-95">
              <Check size={20} strokeWidth={3} />
              {initialData ? 'Update Records' : 'Save Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Add these to your global CSS or keep as Tailwind classes
const labelStyle = "flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1";
const inputStyle = "w-full px-5 py-3.5 bg-gray-50 border-2 border-transparent focus:border-indigo-500 focus:bg-white rounded-xl outline-none font-semibold transition-all";