import { ObjectId } from "mongodb";
import { ProductUnit } from "../../../common/enum";
import { ProductBrand, ProductColour, ProductFlavour, ProductName } from "../../productService/interface";

export interface AddRequestExpenditureOrderItem {
  name: ProductName;
  unit: ProductUnit;
  size: string;
  colour: ProductColour,
  brand: ProductBrand,
  flavour: ProductFlavour,
  quantity: number;
  price: number;
}

export interface IExpenditureOrderDBItem extends IExpenditureOrderItem{
  expenditureOrderId: ObjectId
}

export interface IExpenditureOrderItem{
  name: ProductName;
  unit: ProductUnit;
  size: string;
  colour: ProductColour,
  brand: ProductBrand,
  flavour: ProductFlavour,
  quantity: number;
  price: number;
  cgstPercentage?: number;
  cgstAmount?: number;
  sgstPercentage?: number;
  sgstAmount?: number;
  igstPercentage?: number;
  igstAmount?: number;
  totalGst: number;
  amount: number;
  totalAmount: number;
}