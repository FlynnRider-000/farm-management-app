import {FORM_TYPES} from '../types';
import {IList} from '../../entities/form.entities';
import {TCurrentAction, TFormAction} from '../../entities/form.entities';

export const saveFormToLocal = (form: IList): TFormAction => ({
  type: FORM_TYPES.SAVE_FORM,
  payload: form,
});

export const saveFormToPending = (form: IList): TFormAction => ({
  type: FORM_TYPES.SAVE_PENDING,
  payload: form,
});

export const removeFormFromPending = (form: IList): TFormAction => ({
  type: FORM_TYPES.SET_FORM_SENT,
  payload: form,
});

export const setCurrentForm = (formType: string): TCurrentAction => ({
  type: FORM_TYPES.SET_CURRENT_FORM,
  payload: formType,
});

export const removeOldForms = () => ({
  type: FORM_TYPES.REMOVE_OLD_FORMS,
});

export const clearAllForms = () => ({
  type: FORM_TYPES.CLEAR_ALL_FORMS,
});
