import { AddExpenditureRequest, PaymentMode } from "./interfaces";
import * as lodash from 'lodash';
import { ExpenditureDao } from "./dao";
import { trusted } from "mongoose";
import { ExpenditureOrderItemHelper } from "./expenditureOrderItemService/helper";

export class ExpenditureService {

  private isValidExpenditureRequest(request: AddExpenditureRequest): { message: string, success: boolean } {
    if (!Object.values(PaymentMode).includes(request.payment_mode) ||
      !lodash.isNaN(request.amount) ||
      lodash.isEmpty(request.payer)
    ) {
      return { message: 'Expenditure order is not passed with valid parameters', success: false };
    }

    return ExpenditureOrderItemHelper.validateOrderItems(request.items);
  }

  public addExpense(request: AddExpenditureRequest) {
    const validationRes = this.isValidExpenditureRequest(request);
    if (!validationRes.success) {
      return {
        success: false,
        message: validationRes.message
      };
    }

    const addExpenditureRes = ExpenditureDao.addExpenditure(request);
    return {
      success: true,
      message: 'added expenditure successfully'
    };
  }
}