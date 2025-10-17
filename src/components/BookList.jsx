import React from 'react';
import BookItem from './BookItem';

function BookList({ books, deleteBook, startEdit }) { 
  return (
    <div className="book-list-container">
      {/* Loop melalui array 'books' */}
      {books.map((book) => (
        <BookItem 
          key={book.id} 
          book={book} 
          deleteBook={deleteBook} 
          startEdit={startEdit} 
        />
      ))}
    </div>
  );
}

export default BookList;