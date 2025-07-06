import { useParams } from 'react-router-dom';
import BorrowForm from '../components/BorrowForm';

const BorrowBook = () => {
  const { bookId } = useParams<{ bookId: string }>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Borrow Book</h2>
      <BorrowForm bookId={bookId!} />
    </div>
  );
};

export default BorrowBook;