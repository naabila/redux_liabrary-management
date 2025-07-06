import mongoose, { Schema, Document } from 'mongoose';

export interface IBorrow extends Document {
  bookId: string;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
}

const BorrowSchema: Schema = new Schema(
  {
    bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
    quantity: { type: Number, required: true, min: 1 },
    dueDate: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBorrow>('Borrow', BorrowSchema);