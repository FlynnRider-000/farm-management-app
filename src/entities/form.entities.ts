import {IFormTypes} from '../entities/general';

export type TSaveFormAction = {
  type: string;
  payload: IFormTypes;
};

export type TFormAction = 
  | TSaveFormAction
  | TCurrentAction;

export type FormStateType = {
  currentForm: string | null;
  pendingForms: Array<IFormTypes>;
};

export type TCurrentAction = {
  type: string;
  payload: string;
};
