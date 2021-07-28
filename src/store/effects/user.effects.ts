import {postRequest} from '../../helpers/general.gelpers';
import {RootState} from '../rootReducer';
import {refreshToken, signIn, signOut} from '../actions/user.actions';
import {TAuthUser} from '../../entities/user.entities';
import {ThunkActionType} from '../../entities/general';
import {setError} from '../actions/ui.actions';
import {AnyAction} from 'redux';
import {ThunkAction} from 'redux-thunk';
import {clearAllForms} from '../actions/form.actions';
import {apiUrl} from '../../config/api';

export const getAdditionalInfo = async (token: string) => {
  try {
    const userData = await postRequest(
      apiUrl + '/api/v1/users/me',
      {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    );
    return await userData;
  } catch (e) {
    console.error(e);
  }
};

export const loginUser = (user: TAuthUser): ThunkActionType => {
  return async (dispatch) => {
    try {
      const currentUser = {
        username: user.email,
        password: user.password,
        auth_app_token: 'xNTk5MzI2ODI2LCJuYmYiOjE1OTkzMjMyMjYsImp0aSI6',
      };

      const userData = await postRequest(
        apiUrl + '/api/v1/auth/signin',
        {
          'Content-Type': 'application/json;charset=utf-8',
        },
        currentUser,
      );

      const additionalInfo = getAdditionalInfo(userData.auth_token);
      const {email, firstname, lastname, permission} = await additionalInfo;

      await dispatch(
        signIn({
          email,
          firstname,
          lastname,
          authToken: userData.auth_token,
          loginTime: new Date(),
          permission,
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
        apiUrl + '/api/v1/auth/refresh',
        {
          'Content-Type': 'application/x-www-form-urlencoded',
          Accept: 'application/json',
          Authorization: `Bearer ${user.currentUser?.authToken}`,
        },
      );
      userData.auth_token
        ? await dispatch(refreshToken(userData.auth_token))
        : await dispatch(signOut());
    } catch (e) {
      dispatch(signOut());
    }
  };
};

export const clearAllData = (): ThunkAction<void, {}, {}, AnyAction> => {
  return (dispatch) => {
    dispatch(signOut());
    dispatch(clearAllForms());
  };
};
