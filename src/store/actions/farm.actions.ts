import {FARM_TYPES} from '../types';
import {IFarm, IUtil} from '../../entities/general';

export const setFarms = (farms: Array<IFarm>) => ({
  type: FARM_TYPES.SET_FARMS,
  payload: farms,
});

export const setUtils = (utils: Array<IUtil>) => ({
  type: FARM_TYPES.SET_UTILS,
  payload: utils,
});
