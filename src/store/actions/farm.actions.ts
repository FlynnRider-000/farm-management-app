import {FARM_TYPES} from '../types';
import {
  IAssessmentForm,
  ISeedingForm,
  IHarvestForm,
} from '../../entities/general';
import {IFarm, IUtil} from '../../entities/general';

export const setFarms = (farms: Array<IFarm>) => ({
  type: FARM_TYPES.SET_FARMS,
  payload: farms,
});

export const setUtils = (utils: Array<IUtil>) => ({
  type: FARM_TYPES.SET_UTILS,
  payload: utils,
});

export const createAssessment = (form: IAssessmentForm) => ({
  type: FARM_TYPES.CREATE_ASSESSMENT,
  payload: form,
});

export const createSeeding = (form: ISeedingForm) => ({
  type: FARM_TYPES.CREATE_SEEDING,
  payload: form,
});

export const createHarvest = (form: IHarvestForm) => ({
  type: FARM_TYPES.CREATE_HARVEST,
  payload: form,
});

export const updateAssessment = (form: IAssessmentForm) => ({
  type: FARM_TYPES.UPDATE_ASSESSMENT,
  payload: form,
});
