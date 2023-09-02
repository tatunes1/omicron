import { ClientSession } from "mongoose";
import { ExpenditureOrder } from "./interfaces";
import Expenditure from './schema';

export class ExpenditureDao{
  public static createExpenditureOrder(data: ExpenditureOrder){
    return Expenditure.create(data);
  }

  public static createExpenditureOrderInSession(data: ExpenditureOrder, session: ClientSession){
    return Expenditure.create([data], { session });
  }
}