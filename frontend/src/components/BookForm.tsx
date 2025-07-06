import type { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import type  { Book } from '../redux/types/index';
import toast from 'react-hot-toast';

interface BookFormProps {
  initialData?: Partial<Book>;
  onSubmit: (data: Partial<Book>) => Promise<void>;
}

const BookForm = ({ initialData, onSubmit }: BookFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Book>>({
    title: initialData?.title || '',
    author: initialData?.author || '',
    genre: initialData?.genre || '',
    isbn: initialData?.isbn || '',
    description: initialData?.description || '',
    copies: initialData?.copies || 1,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(formData);
      toast.success('Book saved successfully');
      navigate('/books');
    } catch (error) {
      toast.error('Failed to save book');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <div>
        <label className="block text-sm font-medium">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Author</label>
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Genre</label>
        <input
          type="text"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">ISBN</label>
        <input
          type="text"
          value={formData.isbn}
          onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
          required
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full p-2 border rounded"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Copies</label>
        <input
          type="number"
          value={formData.copies}
          onChange={(e) => setFormData({ ...formData, copies: parseInt(e.target.value) })}
          required
          min="0"
          className="w-full p-2 border rounded"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
        Save
      </button>
    </form>
  );
};

export default BookForm;