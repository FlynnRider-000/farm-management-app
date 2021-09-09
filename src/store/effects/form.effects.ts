import {RootState} from '../rootReducer';
import {getFormUrl} from '../../helpers/form.helpers';
import {postRequest} from '../../helpers/general.gelpers';
import {ThunkActionType, IFormTypes, IAssessmentForm} from '../../entities/general';
import {
  removeFormFromPending,
  saveFormToPending,
  updateFormToPending,
} from '../actions/form.actions';
import {updateAssessment} from '../actions/farm.actions';
import {getAllFarms, getAllUtils} from '../effects/farm.effects';

const sendForm = (form: Array<IFormTypes>, emailNotify: boolean): ThunkActionType => {
  return async (dispatch, getState: Function): Promise<void> => {
    const state: RootState = getState();
    const {user} = state;

    try {
      const sendForm = await postRequest(
        getFormUrl(),
        {
          'Accept': "application/json",
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.currentUser?.authToken}`,
        },
        {
          data: form,
          email: emailNotify
        },
      );

      if (sendForm.status === 'Success') {
        for( let i = 0 ; i < form.length; i++) {
          await dispatch(removeFormFromPending(form[i]));
        }
      }
      await dispatch(getAllFarms());
      await dispatch(getAllUtils());
    } catch (e) {
      return;
    }
  };
};

const saveForm = (form: IFormTypes): ThunkActionType => {
  return async (dispatch, getState: Function): Promise<void> => {
    await dispatch(saveFormToPending(form));
    if (form.type === 'assessment') {
      await dispatch(updateAssessment(form as IAssessmentForm));
    }
  };
};

const updateForm = (oldForm: IFormTypes, newForm: IFormTypes): ThunkActionType => {
  return async (dispatch, getState: Function): Promise<void> => {
    await dispatch(updateFormToPending(oldForm, newForm));
    if (newForm.type === 'assessment') {
      await dispatch(updateAssessment(newForm as IAssessmentForm));
    }
  };
};

export {saveForm, sendForm, updateForm};
