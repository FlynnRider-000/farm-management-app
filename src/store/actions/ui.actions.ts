import {UI_TYPES} from '../types';
import {IUIActions, UIErrorsTypes} from '../../entities/ui.entities';

export const setInternetConnection = (
  connected: null | undefined | boolean,
): IUIActions => ({
  type: UI_TYPES.SET_CONNECTION,
  payload: connected,
});

export const setError = (error: UIErrorsTypes): IUIActions => ({
  type: UI_TYPES.SET_ERROR,
  payload: error,
});

export const removeError = () => ({
  type: UI_TYPES.REMOVE_ERROR,
});

export const setNetSuiteDataLoading = (loading: boolean): IUIActions => ({
  type: UI_TYPES.SET_NETSUITE_DATA_LOADING,
  payload: loading,
});
