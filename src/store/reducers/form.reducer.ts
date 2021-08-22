import {FORM_TYPES} from '../types';
import {changeFormStatus} from './helpers';
import {FormStateType, TFormAction} from '../../entities/form.entities';

const INITIAL_STATE: FormStateType = {
  currentForm: null,
  pendingForms: [],
  editForm: null,
};

export const formReducer = (
  state: FormStateType = INITIAL_STATE,
  action: TFormAction,
): FormStateType => {
  switch (action.type) {
    case FORM_TYPES.UPDATE_FORM:
      const id = state.pendingForms.indexOf(action.payload.oldForm);
      return <FormStateType>{
        ...state,
        pendingForms: state.pendingForms.map((form, index) => (
          index===id ? action.payload.newForm : form
        )),
      };
    case FORM_TYPES.SET_EDIT_FORM:
      return <FormStateType>{
        ...state,
        editForm: action.payload,
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
    case FORM_TYPES.CLEAR_ALL_FORMS:
      return INITIAL_STATE;
    default:
      return state;
  }
};
