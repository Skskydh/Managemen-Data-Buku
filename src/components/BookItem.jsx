import React from 'react';

function BookItem({ book, deleteBook, startEdit }) { 
  
  const handleDelete = () => {
    if (window.confirm(`Yakin ingin menghapus buku "${book.title}"?`)) {
        deleteBook(book.id); 
    }
  };
  
  return (
    <div className="book-item">
      <div className="book-info">
        <h4>{book.title}</h4>
        <p>Penulis: {book.author} | Tahun: {book.year}</p>
      </div>
      <div className="book-actions">
        <button 
          onClick={() => startEdit(book)} 
          className="edit-button"
        >
          Edit
        </button>
        <button onClick={handleDelete} className="delete-button">Hapus</button>
      </div>
    </div>
  );
}

export default BookItem;