import {IFarm, IUtil} from './general';

export interface FarmStateInterface {
  allFarms: Array<IFarm> | null;
  allUtils: Array<IUtil> | null;
}
