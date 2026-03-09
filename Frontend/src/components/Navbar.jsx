import { BookOpen, Plus } from 'lucide-react';

export default function Navbar({ onAddClick }) {
  return (
    <nav className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white pt-8 pb-20 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
            <BookOpen size={28} />
          </div>
          <span className="text-2xl font-black tracking-tighter italic">BookShelf</span>
        </div>
        <button 
          onClick={onAddClick}
          className="bg-white text-indigo-700 px-6 py-3 rounded-2xl font-bold flex items-center gap-2 hover:shadow-xl hover:shadow-white/10 transition-all active:scale-95"
        >
          <Plus size={20} strokeWidth={3} /> Add New Book
        </button>
      </div>
    </nav>
  );
}