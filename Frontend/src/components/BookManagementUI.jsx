import React, { useState, useEffect } from 'react';
import {
  Library,
  PlusCircle,
  BookOpen,
  Trash2,
  Edit3,
  LayoutDashboard,
  Search,
  Book
} from 'lucide-react';
import { addBook, deleteBook, getBooks } from '../api/bookAPI';
import EditModal from './EditModal';

const BookManagementUI = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [books, setBooks] = useState([]);
  const [booksCopy, setBooksCopy] = useState([]);
  const [bookForm, setBookForm] = useState({
    bookTitle: "",
    bookAuthor: "",
    publishDate: "",
    Price: "",
    Description: ""
  })
  const [isOpen, setIsOpen] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [editingBookId, setEditingBookId] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, [])

  const handleChange = (e) => {
    setBookForm({
      ...bookForm,
      [e.target.name]: e.target.value
    })
  }

  const handleSearch = (e) => {
    let value = e.target.value.toLowerCase();
    let filtered = booksCopy.filter((book) => (
      book.bookTitle.toLowerCase().includes(value) ||
      book.bookAuthor.toLowerCase().includes(value) ||
      book.Description.toLowerCase().includes(value)
    ))
    setBooks(filtered);
  }
  const fetchBooks = async () => {
    try {
      const res = await getBooks();
      if (res.data.success) {
        setBooks(res.data.bookData)
        setBooksCopy(res.data.bookData)
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      let res = await addBook(bookForm);
      if (res.data.success) {
        fetchBooks();
        setBookForm({
          bookTitle: "",
          bookAuthor: "",
          publishDate: "",
          Price: "",
          Description: ""
        })
      }
      setActiveTab('dashboard');
    } catch (error) {
      console.error(error);
    }
  }

  const handleDeleteBook = async (id) => {
    try {
      let res = await deleteBook({ id });
      if (res.data.success) {
        fetchBooks();
        alert(`${res.data.message}`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  let content;
  if (activeTab === 'dashboard') {
    content = (
      <section className="animate-in fade-in duration-500">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Library Catalog</h2>
            <p className="text-slate-500">View and manage all available titles.</p>
          </div>
          <div className="bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium text-slate-600">
            Total Titles: <span className="text-indigo-600">{books.length}</span>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Book Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Author</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Release</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {books.map((book) => (
                <tr key={book._id} className="hover:bg-slate-50/50 transition">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                        <BookOpen size={18} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{book.bookTitle}</p>
                        <p className="text-xs text-slate-400 truncate w-48">{book.Description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 text-sm font-medium">{book.bookAuthor}</td>
                  <td className="px-6 py-4 text-slate-500 text-sm">{book.publishDate}</td>
                  <td className="px-6 py-4">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded text-sm font-bold">
                      ${book.Price}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition"
                        onClick={() => {
                          setEditingBookId(book._id)
                          setActiveTab('editbook')
                          setIsOpen(true);
                          setEditForm(book);
                        }}
                      ><Edit3 size={18} /></button>

                      <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                        onClick={(e) => {
                          e.preventDefault();
                          handleDeleteBook(book._id)
                        }}><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    )
  }
  else if (activeTab === 'addbook') {
    content = (
      <section className="max-w-2xl mx-auto animate-in slide-in-from-bottom-4 duration-500">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden">
          <div className="bg-indigo-600 p-8 text-white">
            <h2 className="text-2xl font-bold">Add New Book</h2>
            <p className="text-indigo-100 text-sm opacity-80">Populate your library database with new titles.</p>
          </div>

          <form className="p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Book Title</label>
              <input type="text" placeholder="e.g. Clean Code" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                name="bookTitle"
                value={bookForm.bookTitle}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Author Name</label>
                <input type="text" placeholder="Robert C. Martin" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  name="bookAuthor"
                  value={bookForm.bookAuthor}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Price ($)</label>
                <input type="number" step="0.01" placeholder="29.99" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  name="Price"
                  value={bookForm.Price}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Publish Date</label>
              <input type="date" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                name="publishDate"
                value={bookForm.publishDate}
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
              <textarea rows="3" placeholder="Enter a brief summary..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
                name="Description"
                value={bookForm.Description}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="button" onClick={handleAddBook} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-[0.98]">
              Register Book
            </button>
          </form>
        </div>
      </section>
    )
  }
  else if (isOpen) {
    content = (
      <EditModal
        id={editingBookId}
        allBooks={books}
        setAllBooks={setBooks}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        editForm={editForm}
        setEditForm={setEditForm}
        setActiveTab={setActiveTab}
      />
    )
  }
  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">

      {/* Sidebar Navigation */}
      <aside className="w-64 bg-indigo-900 text-white flex flex-col shadow-xl">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-indigo-500 p-2 rounded-lg">
            <Book size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight">BookStream</h1>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'dashboard' ? 'bg-indigo-700 shadow-inner' : 'hover:bg-indigo-800'}`}
          >
            <LayoutDashboard size={20} />
            <span className="font-medium">Dashboard</span>
          </button>
          <button
            onClick={() => setActiveTab('addbook')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'addbook' ? 'bg-indigo-700 shadow-inner' : 'hover:bg-indigo-800'}`}
          >
            <PlusCircle size={20} />
            <span className="font-medium">Add New Book</span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white h-20 border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by title or author..."
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-700">Admin User</p>
              <p className="text-xs text-slate-500">Practice Mode</p>
            </div>
            <div className="h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-8">
          {content}
        </div>
      </main>
    </div>
  );
};

export default BookManagementUI;