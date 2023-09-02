import { ProductName } from "./interface";
import * as ProductConstants from './constants';

export class ProductService{
  public static getInstance(){
    return new ProductService();
  }

  public getGstRateOfProduct(productName: ProductName): number{
    return ProductConstants.PRODUCT_GST_RATE_MAP[productName];
  }

  public getHsnCodeOfProduct(productName: ProductName):string{
    return ProductConstants.PRODUCT_HSN_CODE_MAP[productName];
  }
}