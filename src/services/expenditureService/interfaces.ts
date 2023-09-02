import { AddRequestExpenditureOrderItem } from "./expenditureOrderItemService/interfaces";

export enum PaymentMode{
  CASH = 'cash',
  UPI = 'upi',
  IMPS = 'imps',
  CHEQUE = 'cheque',
  CC = 'cc'
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
  KAILASH_SAI_PARMANAND_PAN_MANDI = 'kailash_sai_parmanand_pan_mandi',
  MA_TRADING = 'ma_trading',
  AMERICAN_SALES = 'american_sales',
  HEDIT_PACKAGING = 'hedit_packaging',
  SHREE_NATH_BRROM_INDUSTRIES = 'shree_nath_broom_industries',
  PORTER = 'porter',
  MISCELLANEOUS = 'miscellaneous',
  NIRMAL_TRADING = 'nirmal_trading',
  NAVYUG_PAPER_PRODUCTS = 'navyug_paper_products',
}

export interface AddExpenditureRequest{
  paymentMode: PaymentMode;
  amount: number;
  payer: string;
  vendor: Vendor;
  isGstPaid: boolean;
  isIgstTransaction: boolean;
  items: AddRequestExpenditureOrderItem[],
  createdBy: string;
  orderDate: Date;
}

export interface ExpenditureOrder{
  paymentMode: PaymentMode;
  payer: string;
  vendor: Vendor;
  amount: number;
  isGstPaid: boolean;
  isIgstTransaction: boolean;
  totalGst?: number;
  totalAmount: number;
  orderDate: Date;
  createdBy: string;
  updatedBy: string;
}