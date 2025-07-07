# Minimal Library Management System

## Project Overview
The Minimal Library Management System is a full-stack web application designed to manage a library's book inventory and borrowing operations. It provides a responsive user interface for performing CRUD (Create, Read, Update, Delete) operations on books, managing book borrowing with quantity tracking, and viewing a borrow summary. The application uses optimistic updates for a seamless user experience and includes toast notifications for user feedback. The project is built with modern web technologies, ensuring type safety and scalability.

## Features
- **Book Management**:
  - Create, read, update, and delete books with details (title, author, genre, ISBN, description, copies).
  - Display a paginated list of books with responsive grid layout.
  - Edit book details with pre-populated form fields.
- **Borrowing System**:
  - Borrow books with quantity and due date tracking.
  - View a borrow summary showing total quantities borrowed per book.
- **User Experience**:
  - Optimistic updates for instant UI feedback on create, update, and delete operations.
  - Toast notifications for success and error messages.
  - Responsive design using Tailwind CSS, optimized for mobile and desktop.
- **Type Safety**:
  - Type-safe forms and API interactions using TypeScript.
  - RTK Query for efficient data fetching and caching.

## Technologies Used
- **Frontend**:
  - React (v18.x) with TypeScript
  - Redux Toolkit and RTK Query for state management and API calls
  - React Router for navigation
  - Tailwind CSS for styling
  - React Hot Toast for notifications
  - Vite as the build tool
- **Backend**:
  - Node.js with Express.js (v4.x)
  - MongoDB with Mongoose for data storage
  - TypeScript for type safety
  - Nodemon and ts-node for development
- **Other**:
  - MongoDB (local or Atlas) for the database
  - CORS for cross-origin requests
  - Dotenv for environment variable management

## Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- PowerShell or Command Prompt (for Windows users)
- Web browser (e.g., Chrome, Firefox)

## Setup Instructions
1. **Clone the Repository**:
   ```bash
   git clone <repository-url>
   cd library-management-system
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` directory:
     ```env
     MONGO_URI=mongodb://localhost:27017/library
     PORT=5000
     ```
     - For MongoDB Atlas, use: `MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/library?retryWrites=true&w=majority`
   - Start the backend:
     ```bash
     npm run dev
     ```
     - Ensure `MongoDB connected successfully` appears in the console.

3. **Frontend Setup**:
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the frontend:
     ```bash
     npm run dev
     ```
     - The app will run at `http://localhost:3000`.

4. **Access the Application**:
   - Open `http://localhost:3000` in your browser.
   - Navigate to `/books` to view the book list, `/create-book` to add a book, `/edit-book/:id` to edit a book, or `/borrow-summary` to view borrowing data.

## Project Structure
- **Backend** (`backend/`):
  - `src/config/db.ts`: MongoDB connection setup.
  - `src/controllers/`: Book and borrow controllers.
  - `src/models/`: Mongoose schemas for books and borrows.
  - `src/routes/`: Express routes for books and borrows.
  - `src/middleware/errorHandler.ts`: Error handling middleware.
  - `src/index.ts`: Entry point for the Express server.
- **Frontend** (`frontend/`):
  - `src/components/`: React components (e.g., `BookList.tsx`, `EditBook.tsx`, `BorrowSummary.tsx`).
  - `src/redux/api/bookApi.ts`: RTK Query API for book operations.
  - `src/types/`: TypeScript interfaces.
  - `src/index.css`: Tailwind CSS setup.
  - `vite.config.ts`: Vite configuration with API proxy.

## API Endpoints
- **Books**:
  - `GET /api/books`: List all books (paginated).
  - `GET /api/books/:id`: Get a single book by ID.
  - `POST /api/books`: Create a new book.
  - `PUT /api/books/:id`: Update a book.
  - `DELETE /api/books/:id`: Delete a book.
- **Borrows**:
  - `POST /api/borrows`: Borrow a book.
  - `GET /api/borrows/summary`: Get borrow summary.



## Submission Notes
- **Screenshots**:
  - Book list (`/books`)
  - Create book form (`/create-book`)
  - Edit book form (`/edit-book/:id`)
  - Borrow summary (`/borrow-summary`)
  - Toast notifications
  - Responsive UI (mobile and desktop views)
- **Files**:
  - `backend/package.json`
  - `frontend/package.json`
  - `README.md`
- **Zip Structure**:
  - Zip the entire project folder, including `backend/` and `frontend/`.
- **Requirements Met**:
  - Book CRUD operations
  - Borrowing with quantity tracking
  - Responsive UI with Tailwind CSS
  - Optimistic updates via RTK Query
  - Toast notifications with `react-hot-toast`
  - Type-safe forms with TypeScript

## Known Issues and Resolutions
- **CORS**: Resolved by adding `cors` middleware.
- **TypeScript Errors**: Fixed incorrect handler signatures in `bookController.ts` and `borrowController.ts`.
- **Database Connection**: Ensured stable MongoDB connection with `MONGO_URI`.
- **Frontend Data Fetching**: Fixed RTK Query issues in `bookApi.ts`.
- **Book Deletion/Editing**: Corrected handlers and mutations for reliable CRUD.
- **Form Population**: Ensured `EditBook.tsx` populates fields using `useGetBookByIdQuery`.

## Future Improvements
- Add user authentication for secure access.
- Implement search and filter functionality for books.
- Add pagination controls to the frontend book list.

