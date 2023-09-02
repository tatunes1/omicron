import { AddExpenditureRequest, ExpenditureOrder, PaymentMode, Vendor } from "./interfaces";
import * as lodash from 'lodash';
import { ExpenditureDao } from "./dao";
import Logging from "../../library/logging/logging";
import { ExpenditureOrderItemService } from "./expenditureOrderItemService/service";
import { IExpenditureOrderItem } from "./expenditureOrderItemService/interfaces";
import { CommonUtils } from "../../common/utils";

export class ExpenditureService {
  private expenditureOrderItemService: ExpenditureOrderItemService = ExpenditureOrderItemService.getInstance();

  private isValidExpenditureRequest(request: AddExpenditureRequest): { message: string, success: boolean } {
    if (!Object.values(PaymentMode).includes(request.paymentMode) ||
      lodash.isNaN(request.amount)  || request.amount <= 0 ||
      lodash.isEmpty(request.payer) ||
      !Object.values(Vendor).includes(request.vendor) ||
      !lodash.isDate(new Date(request.orderDate))
    ) {
      return { message: 'Expenditure order is not passed with valid parameters', success: false };
    }

    return this.expenditureOrderItemService.validateExpenditureOrderItems(request.items);
  }

  private getExpenditureOrderFromExpenditureReq(request: AddExpenditureRequest, expenditureOrderItems: IExpenditureOrderItem[]){
    let expenditureOrder: ExpenditureOrder = {
      paymentMode: request.paymentMode,
      vendor: request.vendor,
      isGstPaid: request.isGstPaid,
      isIgstTransaction: request.isIgstTransaction,
      amount: expenditureOrderItems.reduce((sum, item) => sum + item.amount, 0),
      totalAmount: expenditureOrderItems.reduce((sum, item) => sum + item.amount, 0),
      payer: request.payer,
      orderDate: new Date(request.orderDate),
      createdBy: request.createdBy,
      updatedBy: request.createdBy,
    };

   
    if(!request.isGstPaid){
      return expenditureOrder;
    }

    expenditureOrder.totalGst = CommonUtils.roundOff(expenditureOrderItems.reduce((sum, item) => sum + item.totalGst || 0, 0));
    expenditureOrder.totalAmount = CommonUtils.ceil(expenditureOrder.amount + expenditureOrder.totalGst);
    return expenditureOrder;
  }

  private async saveExpenditureDetails(request: AddExpenditureRequest){
    try {
      const expeditureOrderItems: IExpenditureOrderItem[] = this.expenditureOrderItemService.convertItemsToEOI(request.items, request.isGstPaid, request.isIgstTransaction);
      const expenditureOrder: ExpenditureOrder = this.getExpenditureOrderFromExpenditureReq(request, expeditureOrderItems);

      // const connection = mongoose.connection;
      // console.log('connection: ', connection);
      // const session: ClientSession = await connection.startSession();
      // await session.withTransaction(async () => {
      //   const order = await ExpenditureDao.createExpenditureOrderInSession(expenditureOrder, session);
      //   await this.expenditureOrderItemService.addExpenditureOrderItemsInSession(expeditureOrderItems, session);
      //   return order;
      // });

      // session.endSession();

      const order = await ExpenditureDao.createExpenditureOrder(expenditureOrder);
      await this.expenditureOrderItemService.addExpenditureOrderItems(expeditureOrderItems, order._id);

    } catch (error) {
      Logging.error(error);

    }
    
  }

  public addExpense(request: AddExpenditureRequest) {
    const validationRes = this.isValidExpenditureRequest(request);
    if (!validationRes.success) {
      return {
        success: false,
        message: validationRes.message
      };
    }
    this.saveExpenditureDetails(request);
    return {
      success: true,
      message: 'added expenditure successfully'
    };
  }
}