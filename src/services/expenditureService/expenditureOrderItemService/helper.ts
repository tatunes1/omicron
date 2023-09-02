import { ProductUnit } from "../../../common/enum";
import { ProductName } from "../../productService/interface";
import { AddRequestExpenditureOrderItem } from "./interfaces";
import * as lodash from 'lodash';
import { CommonUtils } from "../../../common/utils";
import Logging from "../../../library/logging/logging";

export class ExpenditureOrderItemHelper {
  public static validateOrderItems(items: AddRequestExpenditureOrderItem[]): { message: string, success: boolean } {
    for (const item of items) {
      if (!Object.values(ProductName).includes(item.name) ||
        item.quantity <= 0 ||
        lodash.isEmpty(item.size) ||
        !Object.values(ProductUnit).includes(item.unit) ||
        item.price <= 0
      ) {
        Logging.info(item);
        return { message: `${item.name} is not passed with proper params`, success: false };
      }
    }

    return { message: 'Validation successful.', success: true };
  }

  public static getGstAmount(quantity:number, price: number, gstRate: number): number {
    return CommonUtils.roundOff(quantity * price * gstRate * 0.01);
  }

}