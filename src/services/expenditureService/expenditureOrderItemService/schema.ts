
import { ObjectId } from 'mongodb';
import * as mongoose from 'mongoose';
import { GstRate, HsnCodes, ProductBrand, ProductColour, ProductFlavour, ProductName } from '../../productService/interface';

const Schema = mongoose.Schema;

const expenditureOrderItemSchema = new Schema({
  expenditureOrderId: ObjectId,
  name: { type: String, enum: ProductName },
  size: String,
  hsnCode:{ type: String, enum: HsnCodes },
  quantity: Number,
  unit: String,
  colour: { type: String, enum: ProductColour || null },
  brand: { type: String, enum: ProductBrand || null },
  flavour: { type: String, enum: ProductFlavour || null},
  price: Number,
  amount: Number,
  igstPercentage: Number,
  igstAmount: Number,
  cgstPercentage: Number,
  cgstAmount: Number,
  sgstPercentage: Number,
  sgstAmount: Number,
  totalGst: Number,
  totalAmount: Number,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
})

export default mongoose.model('ExpenditureOrderItem', expenditureOrderItemSchema);