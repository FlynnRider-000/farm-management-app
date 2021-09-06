import {postRequest} from '../../helpers/general.gelpers';
import {RootState} from '../rootReducer';
import {refreshToken, signIn, signOut} from '../actions/user.actions';
import {TAuthUser} from '../../entities/user.entities';
import {ThunkActionType} from '../../entities/general';
import {setError} from '../actions/ui.actions';
import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {apiUrl} from '../../config/api';

export const getAdditionalInfo = async (id: string, token: string) => {
  try {
    const userData = await postRequest(
      apiUrl + `api/user/profiles/${id}`,
      {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      {},
      'GET',
    );
    return userData;
  } catch (e) {
    console.error(e);
  }
};

export const loginUser = (user: TAuthUser): ThunkActionType => {
  return async (dispatch) => {
    try {
      const currentUser = {
        email: user.email.trim(),
        password: user.password.trim(),
        remember: true,
      };

      const userData = await postRequest(
        apiUrl + 'api/auth/login',
        {
          'Content-Type': 'application/json;charset=utf-8',
        },
        currentUser,
      );

      const additionalInfo = await getAdditionalInfo(userData.user_id, userData.data.access_token);

      dispatch(
        signIn({
          id: userData.user_id,
          firstname : additionalInfo.data.name,
          lastname: '',
          authToken: userData.data.access_token,
          refreshToken: userData.data.refresh_token,
          loginTime: new Date(),
        }),
      );
    } catch (e) {
      dispatch(
        setError({
          type: 'user',
          message: 'Wrong email or password',
        }),
      );
    }
  };
};

export const getRefreshToken = (): ThunkActionType => {
  return async (dispatch, getState: Function) => {
    const state: RootState = getState();
    const {user} = state;
    try {
      const userData = await postRequest(
        apiUrl + 'api/refresh',
        {
          Authorization: `Bearer ${user.currentUser?.authToken}`,
          Refreshtoken: `${user.currentUser?.refreshToken}`,
          User: `${user.currentUser?.id}`,
          'Content-Type': 'application/json',
        },
        {},
      );
      if (userData.status === 'Success') {
        await dispatch(refreshToken(userData.data.access_token, userData.data.refresh_token));
      } else {
        await dispatch(signOut());
      }
    } catch (e) {
      dispatch(signOut());
    }
  };
};

export const clearAllData = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch) => {
    dispatch(signOut());
  };
};
