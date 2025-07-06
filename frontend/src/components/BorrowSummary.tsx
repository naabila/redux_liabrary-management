
     import type { BorrowSummary as BorrowSummaryType } from '../redux/types/index';

     interface BorrowSummaryProps {
       summaries: BorrowSummaryType[];
     }

     const BorrowSummary = ({ summaries }: BorrowSummaryProps) => {
       return (
         <div className="overflow-x-auto">
           <table className="min-w-full bg-white border">
             <thead>
               <tr className="bg-gray-100">
                 <th className="p-2 text-left">Book Title</th>
                 <th className="p-2 text-left">ISBN</th>
                 <th className="p-2 text-left">Total Quantity Borrowed</th>
               </tr>
             </thead>
             <tbody>
               {summaries.map((borrowSummary, index) => (
                 <tr key={borrowSummary._id} className="border-t">
                   <td className="p-2">{borrowSummary.title}</td>
                   <td className="p-2">{borrowSummary.isbn}</td>
                   <td className="p-2">{borrowSummary.totalQuantity}</td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       );
     };

     export default BorrowSummary;
     