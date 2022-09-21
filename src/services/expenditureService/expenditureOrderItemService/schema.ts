
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { GstRate, HsnCodes, Product } from '../../productService/interface';

const Schema = mongoose.Schema;

const expenditureOrderItemSchema = new Schema({
  expenditure_id: ObjectId,
  item: Product,
  quantity: Number,
  price: Number,
  gst_rate: GstRate,
  hsn_code: HsnCodes,
  amount: Number,
  total_amount: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
})

export default mongoose.model('ExpenditureOrderItem', expenditureOrderItemSchema);