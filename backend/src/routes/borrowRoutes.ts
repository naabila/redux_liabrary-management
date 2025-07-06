import { Router } from 'express';
import { createBorrow, getBorrowSummary } from '../controllers/borrowController';

const router = Router();

// POST /api/borrows - Borrow a book
router.post('/', createBorrow);

// GET /api/borrows/summary - Get borrow summary
router.get('/summary', getBorrowSummary);

export default router;