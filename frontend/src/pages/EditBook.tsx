
     import { useParams } from 'react-router-dom';
     import { useGetBookByIdQuery, useUpdateBookMutation } from '../redux/api/bookApi';
     import BookForm from '../components/BookForm';
     import type  { Book } from '../redux/types/index';

     const EditBook = () => {
       const { id } = useParams<{ id: string }>();
       const { data: book, isLoading, error } = useGetBookByIdQuery(id!);
       const [updateBook] = useUpdateBookMutation();

       const handleSubmit = async (data: Partial<Book>) => {
         await updateBook({ id: id!, book: data }).unwrap();
       };

       if (isLoading) return <div className="text-center">Loading...</div>;
       if (error || !book) return <div className="text-center text-red-600">Error loading book</div>;

       return (
         <div>
           <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
           <BookForm initialData={book} onSubmit={handleSubmit} />
         </div>
       );
     };

     export default EditBook;
     