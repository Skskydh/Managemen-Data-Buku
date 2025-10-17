import React, { useState, useEffect } from 'react';

function BookForm({ addBook, editingBook, updateBook, setEditingBook }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');

  const resetForm = () => {
    setTitle('');
    setAuthor('');
    setYear('');
  };
  useEffect(() => {   //efek saat mengisi form dalam mode edit
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year);
    } else {
      resetForm(); 
    }
  }, [editingBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !author || !year) {
      alert("Semua field harus diisi!");
      return;
    }

    const bookData = { title, author, year: parseInt(year) };

    if (editingBook) {
      updateBook({ ...bookData, id: editingBook.id });
    } else {
      addBook(bookData);
      
      resetForm();  
    }
  };

  const handleCancelEdit = () => {
      setEditingBook(null);
  };

  return (
    <div>
      <h3>{editingBook ? 'Edit Data Buku' : 'Tambah Data Buku Baru'}</h3>
      <form className="book-form" onSubmit={handleSubmit}>
        <div>
          <input 
            type="text" 
            placeholder="Judul Buku" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="text" 
            placeholder="Penulis" 
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <input 
            type="number" 
            placeholder="Tahun Terbit" 
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button type="submit">
          {editingBook ? 'Simpan Perubahan' : 'Tambah Buku'}
        </button>
        
        {editingBook && (
            <button 
                type="button" 
                className="cancel-edit"
                onClick={handleCancelEdit}
            >
                Batalkan Edit
            </button>
        )}
      </form>
    </div>
  );
}

export default BookForm;