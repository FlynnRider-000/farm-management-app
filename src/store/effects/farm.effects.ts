import {RootState} from '../rootReducer';
import {postRequest} from '../../helpers/general.gelpers';
import {setFarms, setUtils} from '../actions/farm.actions';
import {setNetSuiteDataLoading} from '../actions/ui.actions';
import {ThunkActionType} from '../../entities/general';
import {apiUrl} from '../../config/api';

export const getAllFarms = (): ThunkActionType => {
  return async (dispatch, getState: Function) => {
    const state: RootState = getState();
    const {user} = state;
    try {
      dispatch(setNetSuiteDataLoading(true));

      const farmData = await postRequest(
        apiUrl + 'api/farm/user-farms-all',
        {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${user.currentUser?.authToken}`,
        },
        {},
        'GET',
      );
      if (farmData.length > 0) {
        await dispatch(setFarms(farmData));
      }

      dispatch(setNetSuiteDataLoading(false));
    } catch (e) {
      dispatch(setNetSuiteDataLoading(false));
    }
  };
};

export const getAllUtils = (): ThunkActionType => {
  return async (dispatch, getState: Function) => {
    const state: RootState = getState();
    const {user} = state;
    try {
      dispatch(setNetSuiteDataLoading(true));

      const utilData = await postRequest(
        apiUrl + 'api/util/user-utils-all',
        {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: `Bearer ${user.currentUser?.authToken}`,
        },
        {},
        'GET',
      );
      if (utilData.length > 0) {
        await dispatch(setUtils(utilData));
      }

      dispatch(setNetSuiteDataLoading(false));
    } catch (e) {
      dispatch(setNetSuiteDataLoading(false));
    }
  };
};

export const getAllCars = 1;
