import * as mongoose from 'mongoose';
import { PaymentMode, Vendor } from './interfaces';

const Schema = mongoose.Schema;

const expenditureSchema = new Schema({
  paymentMode: { type: String, enum: PaymentMode, default: PaymentMode.CASH },
  payer: String,
  vendor: { type: String, enum: Vendor },
  amount: Number,
  isGstPaid: Boolean,
  isIgstTransaction: Boolean,
  totalGst: Number,
  totalAmount: Number,
  orderDate: Date,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  createdBy: String,
  updatedy: String,
});


export default mongoose.model('Expenditure', expenditureSchema);
