import {USER_TYPES} from '../types';
import {TUser} from '../../entities/user.entities';
import {IUserAction} from '../../entities/user.entities';

export const signOut = (): {type: string} => ({
  type: USER_TYPES.SIGN_OUT,
});

export const signIn = (user: TUser): IUserAction => ({
  type: USER_TYPES.SIGN_IN,
  payload: user,
});

export const refreshToken = (token: string, rtoken: string) => ({
  type: USER_TYPES.REFRESH_TOKEN,
  payload: {
    token,
    rtoken,
  },
});
