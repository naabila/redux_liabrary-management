import { Link } from 'react-router-dom';
import { useGetBooksQuery, useDeleteBookMutation } from '../redux/api/bookApi';
import type  { Book } from '../redux/types/index';

import ConfirmationDialog from './ConfirmationDialog';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface BookTableProps {
  books: Book[];
  page: number;
  limit: number;
}

const BookTable = ({ books, page, limit }: BookTableProps) => {
  const [deleteBook] = useDeleteBookMutation();
  const [showDialog, setShowDialog] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    try {
      await deleteBook(id).unwrap();
      toast.success('Book deleted successfully');
    } catch (error) {
      toast.error('Failed to delete book');
    }
    setShowDialog(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Title</th>
            <th className="p-2 text-left">Author</th>
            <th className="p-2 text-left">Genre</th>
            <th className="p-2 text-left">ISBN</th>
            <th className="p-2 text-left">Copies</th>
            <th className="p-2 text-left">Availability</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {books?.map((book) => (
            <tr key={book._id} className="border-t">
              <td className="p-2">
                <Link to={`/books/${book._id}`} className="text-blue-600 hover:underline">
                  {book.title}
                </Link>
              </td>
              <td className="p-2">{book.author}</td>
              <td className="p-2">{book.genre}</td>
              <td className="p-2">{book.isbn}</td>
              <td className="p-2">{book.copies}</td>
              <td className="p-2">{book.available ? 'Available' : 'Unavailable'}</td>
              <td className="p-2 space-x-2">
                <Link to={`/edit-book/${book._id}`} className="text-blue-600 hover:underline">
                  Edit
                </Link>
                <button
                  onClick={() => setShowDialog(book._id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
                {book.available && (
                  <Link to={`/borrow/${book._id}`} className="text-green-600 hover:underline">
                    Borrow
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showDialog && (
        <ConfirmationDialog
          message="Are you sure you want to delete this book?"
          onConfirm={() => handleDelete(showDialog)}
          onCancel={() => setShowDialog(null)}
        />
      )}
    </div>
  );
};

export default BookTable;