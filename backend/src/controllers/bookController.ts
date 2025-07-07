import { Request, Response, NextFunction } from 'express';
import Book from '../models/book';

// GET /api/books/:id - Get a single book by ID
export const getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: `Invalid book ID: ${req.params.id}` });
      return;
    }
    const book = await Book.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: `Book not found with ID: ${req.params.id}` });
      return;
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

//update books
export const updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { title, author, genre, isbn, description, copies } = req.body;

   

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, genre, isbn, description, copies, available: copies > 0 },
      { new: true, runValidators: true }
    );
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};

// DELETE /api/books/:id 
export const deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) {
      res.status(404).json({ message: 'Book not found' });
      return;
    }
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    next(error);
  }
};

//create books
export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    next(error);
  }
};

// GET /api/books - List all books with pagination
export const getBooks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const books = await Book.find().skip(skip).limit(limit);
    const total = await Book.countDocuments();

    res.json({ books, total, page, limit });
  } catch (error) {
    next(error);
  }
};