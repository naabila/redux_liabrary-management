import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCreateBorrowMutation } from '../redux/api/borrowApi';
import { useGetBookByIdQuery } from '../redux/api/bookApi';
import toast from 'react-hot-toast';

interface BorrowFormProps {
  bookId: string;
}

const BorrowForm = ({ bookId }: BorrowFormProps) => {
  const navigate = useNavigate();
  const { data: book } = useGetBookByIdQuery(bookId);
  const [createBorrow] = useCreateBorrowMutation();
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!book) return;
    if (quantity > book.copies) {
      toast.error('Quantity exceeds available copies');
      return;
    }
    try {
      await createBorrow({ bookId, quantity, dueDate }).unwrap();
      toast.success('Book borrowed successfully');
      navigate('/borrow-summary');
    } catch (error) {
      toast.error('Failed to borrow book');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <div>
        <label className="block text-sm font-medium">Quantity</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          required
          min="1"
          max={book?.copies}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Borrow
      </button>
    </form>
  );
};

export default BorrowForm;