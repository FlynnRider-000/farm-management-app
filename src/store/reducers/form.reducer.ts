import {FORM_TYPES} from '../types';
import {changeFormStatus, removeForms} from './helpers';
import {FormStateType, TFormAction} from '../../entities/form.entities';

const INITIAL_STATE: FormStateType = {
  currentForm: null,
  allForms: [],
  pendingForms: [],
};

export const formReducer = (
  state: FormStateType = INITIAL_STATE,
  action: TFormAction,
): FormStateType => {
  switch (action.type) {
    case FORM_TYPES.SAVE_FORM:
      return <FormStateType>{
        ...state,
        allForms: [...state.allForms, action.payload],
      };
    case FORM_TYPES.SAVE_PENDING:
      return <FormStateType>{
        ...state,
        pendingForms: [...state.pendingForms, action.payload],
      };
    case FORM_TYPES.SET_FORM_SENT:
      return <FormStateType>{
        ...state,
        pendingForms: changeFormStatus(state.pendingForms, action.payload),
      };
    case FORM_TYPES.SET_CURRENT_FORM:
      return <FormStateType>{
        ...state,
        currentForm: action.payload,
      };
    case FORM_TYPES.REMOVE_OLD_FORMS:
      return <FormStateType>{
        ...state,
        allForms: removeForms(state.allForms, state.pendingForms),
      };
    case FORM_TYPES.CLEAR_ALL_FORMS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
