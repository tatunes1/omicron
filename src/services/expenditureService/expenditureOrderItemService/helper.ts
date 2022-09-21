import { ProductUnits } from "../../../common/interfaces";
import { Product } from "../../productService/interface";
import { ExpenditureOrderItem } from "./interfaces";

export class ExpenditureOrderItemHelper {
  public static validateOrderItems(items: ExpenditureOrderItem[]): { message: string, success: boolean } {
    for (const item of items) {
      if (!Object.values(Product).includes(item.name) ||
        item.quantity <= 0 ||
        !Object.values(ProductUnits).includes(item.unit) ||
        item.price <= 0
      ) {
        return { message: `${item.name} is not passed with proper params`, success: false };
      }
    }

    return { message: 'Validation successful.', success: true };
  }
}