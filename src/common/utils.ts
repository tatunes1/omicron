import * as lodash from 'lodash';

export class CommonUtils{
  public static roundOff(amount: number){
    return lodash.round(amount, 2);
  }

  public static ceil(amount: number){
    return lodash.ceil(amount);
  }
}