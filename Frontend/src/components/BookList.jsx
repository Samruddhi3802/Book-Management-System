import { Edit3, Trash, Library, Calendar, DollarSign } from 'lucide-react';

export default function BookList({ books, onEdit, onDelete }) {
  if (!books || books.length === 0) {
    return (
      <div className="bg-white/50 backdrop-blur-sm rounded-[3rem] p-20 text-center border-2 border-dashed border-gray-200">
        <div className="bg-indigo-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <Library className="text-indigo-600 w-12 h-12" />
        </div>
        <h2 className="text-3xl font-black text-gray-800">Your shelf is waiting</h2>
        <p className="text-gray-500 mt-3 text-lg">Every great story starts with a single entry.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {books.map((book) => (
        <div key={book._id} className="group bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.15)] transition-all duration-500 hover:-translate-y-3 relative overflow-hidden flex flex-col h-full">
          
          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 mb-4">
            <button onClick={() => onEdit(book)} className="p-3 bg-white text-gray-600 hover:text-indigo-600 rounded-2xl shadow-sm border border-gray-50 transition-colors">
              <Edit3 size={18} />
            </button>
            <button onClick={() => onDelete(book._id)} className="p-3 bg-white text-red-500 hover:bg-red-50 rounded-2xl shadow-sm border border-gray-50 transition-colors">
              <Trash size={18} />
            </button>
          </div>

          <div className="flex-grow space-y-3">
            <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
              {book.title}
            </h3>
            <p className="text-gray-400 font-bold italic text-lg">by {book.author}</p>
            <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed mt-4">
              {book.description || "No description provided."}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-50 flex items-center justify-between">
            <div className="flex items-center gap-2 text-indigo-600">
              <DollarSign size={20} className="font-bold" />
              <span className="text-2xl font-black tracking-tighter">{book.price}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-400 font-bold text-xs uppercase tracking-widest">
              <Calendar size={14} />
              {book.publishdate?.split('T')[0] || "N/A"}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}