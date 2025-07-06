import { useCreateBookMutation } from '../redux/api/bookApi';
import BookForm from '../components/BookForm';

const CreateBook = () => {
  const [createBook] = useCreateBookMutation();

  const handleSubmit = async (data: any) => {
    await createBook(data).unwrap();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Add New Book</h2>
      <BookForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateBook;