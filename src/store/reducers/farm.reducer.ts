import {FARM_TYPES} from '../types';
import {FarmStateInterface} from '../../entities/farm.entities';
import { Form } from 'formik';
import { Line } from 'react-native-svg';

const INITIAL_STATE: FarmStateInterface = {
  allFarms: [],
  allUtils: [],
};

export const farmReducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case FARM_TYPES.UPDATE_ASSESSMENT:
      const ffs = state.allFarms!.map((farm, index) => {
        if (farm.id === action.payload.farm_id) {
          let newFarm = {...farm};
          newFarm.lines = [];
          for(let i = 0; i < farm.lines.length; i++) {
            if (farm.lines[i].id === action.payload.line_id) {
              let newLine = {...farm.lines[i]};
              if (farm.lines[i].last_assess) {
                if (`${farm.lines[i].last_assess.date_assessment}` <= `${action.payload.date_assessment}`) {
                  newLine.last_assess = action.payload;
                }
              } else {
                newLine.last_assess = action.payload;
                newLine.harvest_id = '-1';
              }
              newFarm.lines.push(newLine);
            } else {
              newFarm.lines.push(farm.lines[i]);
            }
          }
          return newFarm;
        }
        return farm;
      });
      return {
        ...state,
        allFarms: ffs,
      };
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
