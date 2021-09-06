import {FARM_TYPES} from '../types';
import {IAssessmentForm} from '../../entities/general';  
import {IFarm, IUtil} from '../../entities/general';

export const setFarms = (farms: Array<IFarm>) => ({
  type: FARM_TYPES.SET_FARMS,
  payload: farms,
});

export const setUtils = (utils: Array<IUtil>) => ({
  type: FARM_TYPES.SET_UTILS,
  payload: utils,
});

export const updateAssessment = (form: IAssessmentForm) => ({
  type: FARM_TYPES.UPDATE_ASSESSMENT,
  payload: form,
});