import {USER_TYPES} from '../types';
import {IUserAction, UserStateInterface} from '../../entities/user.entities';

const INITIAL_STATE: UserStateInterface = {
  currentUser: null,
};

export const userReducer = (
  state: UserStateInterface = INITIAL_STATE,
  action: IUserAction,
): UserStateInterface => {
  switch (action.type) {
    case USER_TYPES.SIGN_OUT:
      return {
        ...state,
        currentUser: null,
      };
    case USER_TYPES.SIGN_IN:
      return {
        ...state,
        currentUser: action.payload,
      };
    case USER_TYPES.REFRESH_TOKEN:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          loginTime: new Date(),
          //@ts-ignore
          authToken: action.payload.authToken,
          //@ts-ignore
          refreshToken: action.payload.refreshToken,
        },
      };
    default:
      return state;
  }
};
