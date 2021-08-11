import {FORM_TYPES} from '../types';
import {IFormTypes} from '../../entities/general';
import {TCurrentAction, TFormAction} from '../../entities/form.entities';


export const saveFormToPending = (form: IFormTypes): TFormAction => ({
  type: FORM_TYPES.SAVE_PENDING,
  payload: form,
});

export const removeFormFromPending = (form: IFormTypes): TFormAction => ({
  type: FORM_TYPES.SET_FORM_SENT,
  payload: form,
});

export const setCurrentForm = (formType: string): TCurrentAction => ({
  type: FORM_TYPES.SET_CURRENT_FORM,
  payload: formType,
});
