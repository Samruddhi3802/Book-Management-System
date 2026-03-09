import React, { useState } from 'react';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import BookForm from './components/BookForm';
import { Library } from 'lucide-react';

function App() {
  // Use these states to hold data fetched from your Backend
  const [books, setBooks] = useState([]); 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  // HANDLERS: Hook your API calls (POST/PUT/DELETE) inside these
  const handleOpenModal = (book = null) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditingBook(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] relative overflow-hidden font-sans">
      {/* Visual Backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/30 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-200/30 rounded-full blur-[120px] -z-10" />

      <Navbar onAddClick={() => handleOpenModal()} />
      
      <main className="max-w-7xl mx-auto px-6 lg:px-8 -mt-12 relative z-10">
        <div className="flex justify-center m-5 w-full">
          <StatCard icon={<Library size={24} />} label="Collection Size" value={books.length} color="bg-indigo-600 text-white" />
        </div>

        {/* Search Bar (Static UI) */}
        <div className="group relative mb-12 max-w-2xl mx-auto">
          <input 
            type="text"
            placeholder="Search your library..."
            className="w-full pl-14 pr-6 py-5 rounded-3xl border-none shadow-[0_10px_40px_rgba(0,0,0,0.04)] focus:ring-2 focus:ring-indigo-500 text-lg transition-all bg-white/80 backdrop-blur-xl"
          />
          <div className="absolute left-5 top-5 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        <BookList 
          books={books} 
          onEdit={handleOpenModal} 
          onDelete={(id) => {/* Logic: axios.delete(`/api/books/${id}`) */}} 
        />
      </main>

      {isModalOpen && (
        <BookForm 
          onClose={handleCloseModal} 
          initialData={editingBook} 
          onSubmit={(data) => {/* Logic: axios.post or axios.put */}}
        />
      )}
    </div>
  );
}

function StatCard({ icon, label, value, color }) {
  return (
    <div className="bg-white/70 backdrop-blur-md p-6 rounded-[2rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-5">
      <div className={`p-4 rounded-2xl ${color} shadow-lg shadow-indigo-200`}>{icon}</div>
      <div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">{label}</p>
        <h3 className="font-black text-gray-900 text-3xl">{value}</h3>
      </div>
    </div>
  );
}

export default App;