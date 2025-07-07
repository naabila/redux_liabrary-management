
  export interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

     export interface Borrow {
       _id: string;
       bookId: string;
       quantity: number;
       dueDate: string;
       createdAt: string;
     }

     export interface BorrowSummary {
       _id: string;
       title: string;
       isbn: string;
       totalQuantity: number;
     }
  