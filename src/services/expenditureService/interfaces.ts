import { ExpenditureOrderItem } from "./expenditureOrderItemService/interfaces";

export enum PaymentMode{
  CASH = 'cash',
  UPI = 'upi',
  IMPS = 'imps',
  CHEQUE = 'cheque'
}

export enum Vendor{
  SHREE_SHYAM_ENTERPRISES = 'shree_shyam_enterprises',
  ABHISHEK_HOUSEKEEPING = 'abhishek_housekeeping',
  ABHISHEK_POLYTHENES = 'abhishek_polythenes',
  KMI = 'kmi',
  VINOD_MITTAL = 'vinod_mittal',
  JAIN_DONA_PATTAL = 'jain_dona_pattal',
  KAGAZ_WALI_FACTORY = 'kagaz_wali_factory',
  ADEERA_ENTERPRISES = 'adeera_enterprises',
}

export interface AddExpenditureRequest{
  payment_mode: PaymentMode;
  amount: Number;
  payer: String;
  items: ExpenditureOrderItem[],
  created_by: String;
  updated_by: String;
}