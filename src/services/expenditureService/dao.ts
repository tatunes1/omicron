import { AddExpenditureRequest } from "./interfaces";
import Expenditure from './schema';

export class ExpenditureDao{
  public static addExpenditure(data: AddExpenditureRequest){
    return Expenditure.create(data);
  }
}