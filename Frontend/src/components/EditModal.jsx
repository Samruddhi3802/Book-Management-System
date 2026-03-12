import React from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { updateBook } from '../api/bookAPI';

const EditModal = ({id, allBooks, setAllBooks, isOpen, setIsOpen, editForm, setEditForm, setActiveTab}) => {
    if(!isOpen) return null

    const handleChange=(e)=>{
        setEditForm({
            ...editForm,
            [e.target.name]:e.target.value
        })
    }

    const handleUpdate=async()=>{
        try {
            let res=await updateBook(id,editForm);
            if(res.data.success){
                alert(`${res.data.message}`)
                setIsOpen(false);
                setAllBooks(
                    allBooks.map((book)=>(
                        book._id===id?{...book, ...editForm}:book
                    ))
                )
                setActiveTab('dashboard');
            }
        } catch (error) {
            console.error(error);
            alert("Error updating book")
        }
    }
    const formattedDate = editForm.publishDate ? editForm.publishDate.split('T')[0] : "";
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-200 overflow-hidden transform animate-in zoom-in-95 duration-300">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 text-white rounded-lg">
              <Save size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Edit Book</h2>
              <p className="text-xs text-slate-500 italic">Updating ID: {id}</p>
            </div>
          </div>
          <button 
            className="p-2 hover:bg-slate-200 text-slate-400 hover:text-slate-600 rounded-full transition-colors"
            onClick={()=>{
              setActiveTab('dashboard')
              setIsOpen(false)}}
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Body / Form */}
        <form className="p-8 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Book Title</label>
            <input 
              type="text" 
              name="bookTitle"
              value={editForm.bookTitle}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Author</label>
              <input 
                type="text" 
                name="bookAuthor"
                value={editForm.bookAuthor}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Price ($)</label>
              <input 
                type="number" 
                name="Price"
                value={editForm.Price}
                onChange={handleChange}
                step="0.01" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Publish Date</label>
            <input 
              type="date"
              name="publishDate"
              value={formattedDate}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition" 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Description</label>
            <textarea 
              rows="3" 
              name="Description"
              value={editForm.Description}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition resize-none"
            ></textarea>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button 
              onClick={()=>{
                setActiveTab('dashboard')
                setIsOpen(false)}}
              className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button 
              type="submit"
              onClick={(e)=>{
                e.preventDefault();
                handleUpdate();
              }}
              className="flex-[2] bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-100 transition-all active:scale-[0.98]"
            >
              Update Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;