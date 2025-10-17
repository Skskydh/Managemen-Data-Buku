import React, { useState, useEffect, useMemo } from 'react';
import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css'; 

import ManWithLaptop from './assets/gambar-management book.png'; 

function App() {
  // --- STATE DAN LOGIKA CRUD --- //
  const [books, setBooks] = useState(() => {
    try {
      const storedBooks = localStorage.getItem('bookList');
      return storedBooks ? JSON.parse(storedBooks) : [];
    } catch (error) {
      console.error("Error reading localStorage:", error);
      return [];
    }
  });
  const [editingBook, setEditingBook] = useState(null); 
  const [sortBy, setSortBy] = useState('none'); 

  useEffect(() => {
    try {
      localStorage.setItem('bookList', JSON.stringify(books));
    } catch (error) {
      console.error("Error writing to localStorage:", error);
    }
  }, [books]); 

  const addBook = (newBook) => { 
    if (!newBook.title || !newBook.author || !newBook.year) {
      alert("Semua field harus diisi!");
      return;
    }
    const bookWithId = { id: Date.now().toString(), ...newBook };
    setBooks((prevBooks) => [...prevBooks, bookWithId]);
  };
  const deleteBook = (id) => { 
    const updatedBooks = books.filter((book) => book.id !== id);
    setBooks(updatedBooks);
    if (editingBook && editingBook.id === id) {
        setEditingBook(null); 
    }
  };
  const startEdit = (book) => { setEditingBook(book); };
  const updateBook = (updatedBook) => { 
    setBooks((prevBooks) => 
      prevBooks.map((book) => 
        book.id === updatedBook.id ? updatedBook : book
      )
    );
    setEditingBook(null); 
  };

  const sortedBooks = useMemo(() => {
    let sortableBooks = [...books];
    if (sortBy === 'title_asc') {
      sortableBooks.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === 'year_asc') {
        sortableBooks.sort((a, b) => a.year - b.year);
    }
    return sortableBooks;
  }, [books, sortBy]);
  
  return (
    <div className="app-container">
      <div className="app-header">
          <h1>WEBSITE MANAJEMEN DATA BUKU</h1>
          <div className="illustration-wrapper">
              <img 
                src={ManWithLaptop} 
                alt="Ilustrasi Orang Bekerja dengan Laptop" 
                className="main-illustration" 
              />
          </div>
      </div>
      
      <div className="data-container">
          <div className="form-card">
              <BookForm 
                addBook={addBook} 
                editingBook={editingBook} 
                updateBook={updateBook}  
                setEditingBook={setEditingBook}
              />
          </div>
          
          <hr style={{ borderTop: '1px solid #ddd' }} />
          
          <div className="book-list">
              <h2>Daftar Buku ({books.length})</h2>
              
              <div className="sort-controls">
                Urutkan berdasarkan:
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="none">Default (Terbaru)</option>
                    <option value="title_asc">Judul (A-Z)</option>
                    <option value="year_asc">Tahun (Terlama)</option>
                </select>
              </div>

              {books.length > 0 ? (
                  <div className="book-list-container">
                      <BookList 
                        books={sortedBooks} 
                        deleteBook={deleteBook}
                        startEdit={startEdit} 
                      />
                  </div>
              ) : (
                  <p style={{ textAlign: 'center' }}>Belum ada buku dalam daftar.</p>
              )}
          </div>
      </div>
    </div>
  );
}

export default App;