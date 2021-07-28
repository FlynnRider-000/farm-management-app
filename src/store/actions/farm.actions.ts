import {FARM_TYPES} from '../types';
import {IFarm} from '../../entities/general';

export const setFarms = (farms: IFarm) => ({
  type: FARM_TYPES.SET_FARMS,
  payload: farms,
});

export const setVessels = (vessels: IFarm) => ({
  type: FARM_TYPES.SET_VESSELS,
  payload: vessels,
});

export const setUpdate = (action: boolean) => ({
  type: FARM_TYPES.SET_UPDATED,
  payload: action,
});

export const setBays = (bays: any) => ({
  type: FARM_TYPES.SET_BAYS,
  payload: bays,
});

export const setCompanies = (company: any) => ({
  type: FARM_TYPES.SET_COMPANIES,
  payload: company,
});

export const setFloats = (floats: any) => ({
  type: FARM_TYPES.SET_FLOATS,
  payload: floats,
});
