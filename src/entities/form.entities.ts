import {IFormTypes} from '../entities/general';

export type TFormAction = 
  | TSaveFormAction
  | TCurrentAction
  | TUpdateFormAction
  | TEditFormAction;

export type FormStateType = {
  currentForm: string | null;
  editForm: IFormTypes | null;
  pendingForms: Array<IFormTypes>;
};

export type TCurrentAction = {
  type: string;
  payload: string;
};

export type TSaveFormAction = {
  type: string;
  payload: IFormTypes;
};

export type TUpdateFormAction = {
  type: string;
  payload: {
    oldForm: IFormTypes,
    newForm: IFormTypes,
  };
};

export type TEditFormAction = {
  type: string;
  payload: IFormTypes | null;
}