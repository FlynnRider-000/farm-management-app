import {IDebrisForm} from './general';

export type TAllAction = {
  type: string;
  payload: IList;
};

export type TCurrentAction = {
  type: string;
  payload: string;
};

export type TFormAction = TAllAction | TCurrentAction;

export interface IList extends IDebrisForm {
  date: string;
  id?: string;
}

export type FormStateType = {
  currentForm: string | null;
  allForms: Array<IList>;
  pendingForms: Array<IList>;
};
