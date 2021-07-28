import {IFarm} from './general';

export interface FarmStateInterface {
  allFarms: Array<IFarm> | null;
  allVessels: Array<IFarm> | null;
  allBays?: any | null;
  allCompanies?: any | null;
  allFloats: Array<IFarm> | null;
  updated: boolean;
}
