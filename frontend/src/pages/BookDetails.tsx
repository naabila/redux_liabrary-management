import { useParams, Link } from 'react-router-dom';
import { useGetBookByIdQuery } from '../redux/api/bookApi';

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: book, isLoading, error } = useGetBookByIdQuery(id!);

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error || !book) return <div className="text-center text-red-600">Error loading book</div>;

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
      <div className="bg-white p-6 rounded shadow">
        <p><strong>Author:</strong> {book.author}</p>
        <p><strong>Genre:</strong> {book.genre}</p>
        <p><strong>ISBN:</strong> {book.isbn}</p>
        <p><strong>Description:</strong> {book.description || 'No description'}</p>
        <p><strong>Copies:</strong> {book.copies}</p>
        <p><strong>Availability:</strong> {book.available ? 'Available' : 'Unavailable'}</p>
        <div className="mt-4 space-x-2">
          <Link to={`/edit-book/${book._id}`} className="text-blue-600 hover:underline">
            Edit
          </Link>
          {book.available && (
            <Link to={`/borrow/${book._id}`} className="text-green-600 hover:underline">
              Borrow
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookDetails;