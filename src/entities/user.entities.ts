export interface IUserAction {
  type: string;
  payload: TUser;
}

export type TAuthUser = {
  email: string;
  password: string;
};

export type TUser = {
  email?: string;
  firstname?: string;
  lastname?: string;
  authToken?: string;
  permission: string;
  loginTime: Date;
};

export interface UserStateInterface {
  currentUser: TUser | null;
}
