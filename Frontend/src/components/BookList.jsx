import { Edit3, Trash, Star, Library, MoreHorizontal } from 'lucide-react';

export default function BookList({ books, onEdit, onDelete }) {
  if (books.length === 0) {
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
        <div key={book.id} className="group bg-white/80 backdrop-blur-md rounded-[2.5rem] p-8 border border-white shadow-[0_20px_50px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(79,70,229,0.15)] transition-all duration-500 hover:-translate-y-3 relative overflow-hidden">
          
          <div className="flex justify-between items-start mb-6">
            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${
              book.category === 'Science' ? 'bg-blue-100 text-blue-600' : 
              book.category === 'Fiction' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'
            }`}>
              {book.category}
            </span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button onClick={() => onEdit(book)} className="p-2.5 bg-white text-gray-600 hover:text-indigo-600 rounded-xl shadow-sm border border-gray-100">
                <Edit3 size={18} />
              </button>
              <button onClick={() => onDelete(book.id)} className="p-2.5 bg-white text-red-500 hover:bg-red-50 rounded-xl shadow-sm border border-gray-100">
                <Trash size={18} />
              </button>
            </div>
          </div>

          <div className="space-y-3 mb-12">
            <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-indigo-600 transition-colors">
              {book.title}
            </h3>
            <p className="text-gray-500 font-semibold italic text-lg">by {book.author}</p>
          </div>

          <div className="flex items-center justify-between pt-6 border-t border-gray-50">
            <div className="flex gap-0.5 text-amber-400">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} size={16} fill={s <= 4 ? "currentColor" : "none"} className={s > 4 ? "text-gray-200" : ""} />
              ))}
            </div>
            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
              Ref: {book.id.toString().slice(-4)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}