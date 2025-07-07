import { Router } from 'express';
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../controllers/bookController';

const router = Router();

//get books
router.get('/', getBooks);

// get books by id
router.get('/:id', getBookById);

// POST /api/books - Create a new book
router.post('/', createBook);

// PUT /api/books/:id - Update an existing book
router.put('/:id', updateBook);

// DELETE /api/books/:id - Delete a book
router.delete('/:id', deleteBook);

export default router;