
import BorrowSummary from '../components/BorrowSummary';
import { useGetBorrowSummaryQuery } from '../redux/api/borrowApi';
     

     const BorrowSummaryPage = () => {
       const { data, isLoading, error } = useGetBorrowSummaryQuery();

       if (isLoading) return <div className="text-center">Loading...</div>;
       if (error) return <div className="text-center text-red-600">Error loading summary</div>;

       return (
         <div>
           <h2 className="text-2xl font-bold mb-4">Borrow Summary</h2>
           {data && data.length > 0 ? (
             <BorrowSummary summaries={data} />
           ) : (
             <p>No books have been borrowed yet.</p>
           )}
         </div>
       );
     };

     export default BorrowSummaryPage;
     