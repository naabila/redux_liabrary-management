import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { store } from './redux/store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookList from './pages/BookList';
import CreateBook from './pages/CreateBook';
import EditBook from './pages/EditBook';
import BookDetails from './pages/BookDetails';
import BorrowBook from './pages/BorrowBook';
import BorrowSummaryPage from './pages/BorrowSummaryPage';
import './index.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow container mx-auto p-4">
            <Routes>
              <Route path="/" element={<BookList />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/create-book" element={<CreateBook />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="/edit-book/:id" element={<EditBook />} />
              <Route path="/borrow/:bookId" element={<BorrowBook />} />
              <Route path="/borrow-summary" element={<BorrowSummaryPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </Provider>
  );
}

export default App;