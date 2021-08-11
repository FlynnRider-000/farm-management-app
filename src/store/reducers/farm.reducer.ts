import {FARM_TYPES} from '../types';
import {FarmStateInterface} from '../../entities/farm.entities';

const INITIAL_STATE: FarmStateInterface = {
  allFarms: [],
  allUtils: [],
};

export const farmReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FARM_TYPES.SET_FARMS:
      return {
        ...state,
        allFarms: action.payload,
      };
    case FARM_TYPES.SET_UTILS:
      return {
        ...state,
        allUtils: action.payload,
      };
    default:
      return state;
  }
};
