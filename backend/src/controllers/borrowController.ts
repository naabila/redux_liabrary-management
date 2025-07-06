
     import { Request, Response, NextFunction } from 'express';
     import Borrow from '../models/borrow';
     import Book from '../models/book';

     // POST /api/borrows - Borrow a book
     export const createBorrow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try {
         const { bookId, quantity, dueDate } = req.body;

         // Validate input
         if (!bookId || !quantity || !dueDate) {
           res.status(400).json({ message: 'Missing required fields' });
           return;
         }

         // Validate book exists and has enough copies
         const book = await Book.findById(bookId);
         if (!book) {
           res.status(404).json({ message: 'Book not found' });
           return;
         }
         if (book.copies < quantity) {
           res.status(400).json({ message: 'Not enough copies available' });
           return;
         }

         // Create borrow record
         const borrow = new Borrow({ bookId, quantity, dueDate });
         await borrow.save();

         // Update book copies and availability
         book.copies -= quantity;
         book.available = book.copies > 0;
         await book.save();

         res.status(201).json(borrow);
       } catch (error) {
         next(error);
       }
     };

     // GET /api/borrows/summary - Get borrow summary
     export const getBorrowSummary = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
       try {
         const summary = await Borrow.aggregate([
           {
             $group: {
               _id: '$bookId',
               totalQuantity: { $sum: '$quantity' },
             },
           },
           {
             $lookup: {
               from: 'books',
               localField: '_id',
               foreignField: '_id',
               as: 'book',
             },
           },
           { $unwind: '$book' },
           {
             $project: {
               _id: '$book._id',
               title: '$book.title',
               isbn: '$book.isbn',
               totalQuantity: 1,
             },
           },
         ]);

         res.json(summary);
       } catch (error) {
         next(error);
       }
     };
     