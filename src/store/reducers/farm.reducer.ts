import {FARM_TYPES} from '../types';
import {FarmStateInterface} from '../../entities/farm.entities';
import {BAYS} from '../../mock/mockData';

const INITIAL_STATE: FarmStateInterface = {
  allFarms: null,
  allVessels: null,
  allBays: BAYS,
  allCompanies: null,
  allFloats: null,
  updated: false,
};

export const farmReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FARM_TYPES.SET_FARMS:
      return {
        ...state,
        allFarms: action.payload,
      };
    case FARM_TYPES.SET_VESSELS:
      return {
        ...state,
        allVessels: action.payload,
      };
    case FARM_TYPES.SET_UPDATED:
      return {
        ...state,
        updated: action.payload,
      };
    case FARM_TYPES.SET_BAYS:
      return {
        ...state,
        allBays: action.payload,
      };
    case FARM_TYPES.SET_COMPANIES:
      return {
        ...state,
        allCompanies: action.payload,
      };
    case FARM_TYPES.SET_FLOATS:
      return {
        ...state,
        allFloats: action.payload,
      };
    default:
      return state;
  }
};
