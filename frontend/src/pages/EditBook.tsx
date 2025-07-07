
     import { useState, useEffect } from 'react';
     import { useParams, useNavigate } from 'react-router-dom';
     import { useGetBookByIdQuery, useUpdateBookMutation } from '../redux/api/bookApi';
     import type { Book } from '../redux/types';
     import toast from 'react-hot-toast';

          const EditBook = () => {
       const { id } = useParams<{ id: string }>();
       const navigate = useNavigate();
       const { data: book, isLoading, error } = useGetBookByIdQuery(id!, { skip: !id });
       const [updateBook] = useUpdateBookMutation();
      console.log("book:", book); 
       const [formData, setFormData] = useState<Partial<Book>>({
         title: '',
         author: '',
         genre: '',
         isbn: '',
         description: '',
         copies: 0,
       });

       useEffect(() => {
         if (book) {
           console.log('Book data:', book); // Debug log
           setFormData({
             title: book.title || '',
             author: book.author || '',
             genre: book.genre || '',
             isbn: book.isbn || '',
             description: book.description || '',
             copies: book.copies || 0,
           });
         }
       }, [book]);

       const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
         const { name, value } = e.target;
         setFormData((prev) => ({
           ...prev,
           [name]: name === 'copies' ? parseInt(value) || 0 : value,
         }));
       };

       const handleSubmit = async (e: React.FormEvent) => {
         e.preventDefault();
         try {
           if (!id) {
             toast.error('Invalid book ID');
             return;
           }
           console.log('Submitting form data:', formData); 
           await updateBook({ id, book: formData }).unwrap();
           toast.success('Book updated successfully');
           navigate('/books');
         } catch (err) {
           console.error('Update error:', err); // Debug log
           toast.error('Failed to update book');
         }
       };

       if (isLoading) return <div className="text-center">Loading...</div>;
       if (error) {
         console.error('Fetch error:', error); // Debug log
         toast.error('Failed to load book');
         return <div className="text-center text-red-600">Error loading book</div>;
       }

       return (
         <div className="container mx-auto p-4">
           <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
           <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
             <div className="mb-4">
               <label className="block text-sm font-medium">Title</label>
               <input
                 type="text"
                 name="title"
                 value={formData.title}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                 required
               />
             </div>
             <div className="mb-4">
               <label className="block text-sm font-medium">Author</label>
               <input
                 type="text"
                 name="author"
                 value={formData.author}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                 required
               />
             </div>
             <div className="mb-4">
               <label className="block text-sm font-medium">Genre</label>
               <input
                 type="text"
                 name="genre"
                 value={formData.genre}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                 required
               />
             </div>
             <div className="mb-4">
               <label className="block text-sm font-medium">ISBN</label>
               <input
                 type="text"
                 name="isbn"
                 value={formData.isbn}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                 required
               />
             </div>
             <div className="mb-4">
               <label className="block text-sm font-medium">Description</label>
               <textarea
                 name="description"
                 value={formData.description}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                 required
               />
             </div>
             <div className="mb-4">
               <label className="block text-sm font-medium">Copies</label>
               <input
                 type="number"
                 name="copies"
                 value={formData.copies}
                 onChange={handleChange}
                 className="w-full p-2 border rounded"
                 required
               />
             </div>
             <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
               Update Book
             </button>
           </form>
         </div>
       );
     };

     export default EditBook;
    