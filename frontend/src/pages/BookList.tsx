import { useGetBooksQuery } from '../redux/api/bookApi';
import BookTable from '../components/BookTable';

const BookList = () => {
  const { data, isLoading, error } = useGetBooksQuery({ page: 1, limit: 10 });

  if (isLoading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-600">Error loading books</div>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Books</h2>
      {data && <BookTable books={data.books} page={data.page} limit={data.limit} />}
    </div>
  );
};

export default BookList;