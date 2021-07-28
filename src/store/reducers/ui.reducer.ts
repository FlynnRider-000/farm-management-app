import {UI_TYPES} from '../types';
import {IUIActions, UIStateInterface} from '../../entities/ui.entities';

const INITIAL_STATE: UIStateInterface = {
  netSuiteDataLoading: false,
  internetConnection: undefined,
  errors: {
    type: null,
    message: null,
  },
};

export const uiReducer = (
  state: UIStateInterface = INITIAL_STATE,
  action: IUIActions,
) => {
  const {type, payload} = action;
  switch (type) {
    case UI_TYPES.SET_CONNECTION:
      return {
        ...state,
        internetConnection: payload,
      };
    case UI_TYPES.SET_NETSUITE_DATA_LOADING:
      return {
        ...state,
        netSuiteDataLoading: payload,
      };
    case UI_TYPES.SET_ERROR:
      return {
        ...state,
        errors: payload,
      };
    case UI_TYPES.REMOVE_ERROR:
      return {
        ...state,
        errors: {
          type: null,
          message: null,
        },
      };
    default:
      return state;
  }
};
