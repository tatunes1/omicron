import * as mongoose from 'mongoose';
import { PaymentMode, Vendor } from './interfaces';

const Schema = mongoose.Schema;

const expenditureSchema = new Schema({
  payment_mode: PaymentMode,
  amount: Number,
  payer: String,
  vendor: Vendor,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  created_by: String,
  updated_by: String,
});


export default mongoose.model('Expenditure', expenditureSchema);
