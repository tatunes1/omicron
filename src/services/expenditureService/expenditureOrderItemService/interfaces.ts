import { ProductUnits } from "../../../common/interfaces";
import { Product } from "../../productService/interface";

export interface ExpenditureOrderItem {
  name: Product,
  quantity: number,
  unit: ProductUnits
  price: number,
}