import { ClientSession } from "mongoose";
import { IExpenditureOrderDBItem, IExpenditureOrderItem } from "./interfaces";
import ExpenditureOrderItem from './schema';

export class ExpenditureOrderItemDao{

  public static createExpenditureOrderItem(item: IExpenditureOrderDBItem){
    return ExpenditureOrderItem.create(item);
  }

  public static createExpenditureOrderItemInSession(item: IExpenditureOrderDBItem, session: ClientSession){
    return ExpenditureOrderItem.create([item], { session });
  }

}