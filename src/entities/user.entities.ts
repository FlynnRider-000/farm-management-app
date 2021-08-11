export interface IUserAction {
  type: string;
  payload: TUser;
}

export type TAuthUser = {
  email: string;
  password: string;
};

export type TUser = {
  id?: string;
  firstname?: string;
  lastname?: string;
  authToken?: string;
  refreshToken?: string;
  loginTime: Date;
};

export interface UserStateInterface {
  currentUser: TUser | null;
}
