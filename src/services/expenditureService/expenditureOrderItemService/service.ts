import { ObjectId } from "mongodb";
import { ClientSession } from "mongoose";
import { ProductService } from "../../productService/service";
import { ExpenditureOrderItemDao } from "./dao";
import { ExpenditureOrderItemHelper } from "./helper";
import { AddRequestExpenditureOrderItem, IExpenditureOrderItem } from "./interfaces";

export class ExpenditureOrderItemService {
  private productService: ProductService = ProductService.getInstance();
  public static getInstance(){
    return new ExpenditureOrderItemService();
  }

  public validateExpenditureOrderItems(items: AddRequestExpenditureOrderItem[]){
    return ExpenditureOrderItemHelper.validateOrderItems(items);
  }

  public convertItemToEOI(item : AddRequestExpenditureOrderItem, isGstPaid: boolean, isIgstTransaction: boolean): IExpenditureOrderItem{
    let gstDetails: any = { totalGst: 0 };
    const itemGstRate: number = this.productService.getGstRateOfProduct(item.name);

    if(isGstPaid){
      if(isIgstTransaction){
        gstDetails = {
          igstPercentage: itemGstRate,
          igstAmount: ExpenditureOrderItemHelper.getGstAmount(item.quantity, item.price, itemGstRate),
          totalGst: ExpenditureOrderItemHelper.getGstAmount(item.quantity, item.price, itemGstRate),
        }
      }else{
        gstDetails = {
          cgstPercentage: itemGstRate/2,
          cgstAmount: ExpenditureOrderItemHelper.getGstAmount(item.quantity, item.price, itemGstRate/2),
          sgstPercentage: itemGstRate/2,
          sgstAmount: ExpenditureOrderItemHelper.getGstAmount(item.quantity, item.price, itemGstRate/2),
          totalGst: ExpenditureOrderItemHelper.getGstAmount(item.quantity, item.price, itemGstRate),
        }
      }
    }

    return {
      ...item,
      ...gstDetails,
      amount: item.price * item.quantity,
      totalAmount: item.price * item.quantity + gstDetails.totalGst
    };

  }

  // EOI = Expenditure Order Item
  public convertItemsToEOI(items: AddRequestExpenditureOrderItem[], isGstPaid: boolean, isIgstTransaction: boolean): IExpenditureOrderItem[]{
    const orderItems: IExpenditureOrderItem[] = [];

    for(let item of items){
      orderItems.push(this.convertItemToEOI(item, isGstPaid, isIgstTransaction));
    }
    return orderItems;
  }

  public async addExpenditureOrderItems(items: IExpenditureOrderItem[], expenditureOrderId: ObjectId){
    const createExpenditureItemPromises: any[] = [];
    const dbItems = items.map(item => ({
      expenditureOrderId,
      ...item
    }))
    dbItems.forEach(item => createExpenditureItemPromises.push(ExpenditureOrderItemDao.createExpenditureOrderItem(item)));
    await Promise.all(createExpenditureItemPromises);
  }

  public async addExpenditureOrderItemsInSession(items: IExpenditureOrderItem[], expenditureOrderId: ObjectId, session: ClientSession){
    const createExpenditureItemPromises: any[] = [];
    const dbItems = items.map(item => ({
      expenditureOrderId,
      ...item
    }))
    dbItems.forEach(item => createExpenditureItemPromises.push(ExpenditureOrderItemDao.createExpenditureOrderItemInSession(item, session)));
    await Promise.all(createExpenditureItemPromises);
  }

}