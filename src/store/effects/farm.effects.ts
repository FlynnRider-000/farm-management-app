import {RootState} from '../rootReducer';
import {postRequest} from '../../helpers/general.gelpers';
import {
  setFarms,
  setUpdate,
  setVessels,
  setBays,
  setCompanies,
  setFloats,
} from '../actions/farm.actions';
import {setNetSuiteDataLoading} from '../actions/ui.actions';
import {signIn} from '../actions/user.actions';
import {getAdditionalInfo} from '../effects/user.effects';
import {ThunkActionType} from '../../entities/general';
import {apiUrl} from '../../config/api';
import {IFarm} from '../../entities/general';

export const getAllFarmsAndVessels = (): ThunkActionType => {
  return async (dispatch, getState: Function) => {
    const state: RootState = getState();
    const {user} = state;
    try {
      dispatch(setNetSuiteDataLoading(true));

      const getFarms = await postRequest(
        apiUrl + '/api/v1/farms/index',
        {
          Accept: 'application/json',
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.currentUser?.authToken}`,
        },
      );
      const getVessels = await postRequest(
        apiUrl + '/api/v1/vessels/index',
        {
          Authorization: `Bearer ${user.currentUser?.authToken}`,
        },
      );
      const getBays = await postRequest(
          apiUrl + '/api/v1/bays/index',
          {
              Authorization: `Bearer ${user.currentUser?.authToken}`,
          },
      );
      const getCompanies = await postRequest(
        apiUrl + '/api/v1/companies/index',
        {
          Authorization: `Bearer ${user.currentUser?.authToken}`,
        },
      );
      const getFloats = await postRequest(
        apiUrl + '/api/v1/floats/index',
        {
          Authorization: `Bearer ${user.currentUser?.authToken}`,
        },
      );
      // console.log('v', getVessels);
      // console.log('v', getFarms);
      // console.log('v', getCompanies);
      // console.log('v', getFloats);
      if (
        getVessels.length > 0 &&
        getFarms.length > 0 &&
        getCompanies.length > 0 &&
        getFloats.length > 0 &&
        getBays.length > 0
      ) {
        getFarms.map(function(item: IFarm) { 
          delete item.content;
          delete item.created_at;
          delete item.updated_at;
          return item; 
        });
        getVessels.map(function(item: IFarm) { 
          delete item.content;
          delete item.created_at;
          delete item.updated_at;
          return item; 
        });
        getCompanies.map(function(item: IFarm) { 
          delete item.content;
          delete item.created_at;
          delete item.updated_at;
          return item; 
        });
        getFloats.map(function(item: IFarm) {
          delete item.content;
          delete item.created_at;
          delete item.updated_at;
          return item;
        });
        getBays.map(function(item: IFarm) {
          delete item.content;
          delete item.created_at;
          delete item.updated_at;
          return item;
        });

        await dispatch(setFarms(getFarms));
        await dispatch(setVessels(getVessels));
        await dispatch(setCompanies(getCompanies));
        await dispatch(setFloats(getFloats));
        await dispatch(setBays(getBays));
        await dispatch(setUpdate(true));

        if (user.currentUser?.authToken) {
          const additionalInfo = getAdditionalInfo(user.currentUser?.authToken);
          const {email, firstname, lastname, permission} = await additionalInfo;
  
          await dispatch(
            signIn({
              email,
              firstname,
              lastname,
              authToken: user.currentUser?.authToken,
              loginTime: user.currentUser.loginTime,
              permission,
            }),
          );
        }

      }
      dispatch(setNetSuiteDataLoading(false));
    } catch (e) {
      // console.log(e);
      dispatch(setNetSuiteDataLoading(false));
    }
  };
};
