import * as RNFS from 'react-native-fs';
import {RootState} from '../rootReducer';
import {getFormUrl} from '../../helpers/form.helpers';
import {postRequest} from '../../helpers/general.gelpers';
import {
  ThunkActionType,
  IFormTypes,
  IAssessmentForm,
  IHarvestForm,
  ISeedingForm,
} from '../../entities/general';
import {
  removeFormFromPending,
  saveFormToPending,
  updateFormToPending,
} from '../actions/form.actions';
import {
  createAssessment,
  createSeeding,
  createHarvest,
  updateAssessment,
} from '../actions/farm.actions';
import {getAllFarms, getAllUtils} from '../effects/farm.effects';

const sendForm = (
  form: Array<IFormTypes>,
  emailNotify: boolean,
): ThunkActionType => {
  return async (dispatch, getState: Function): Promise<void> => {
    const state: RootState = getState();
    const {user} = state;

    let formData: Array<IFormTypes> = [];
    for (let i = 0; i < form.length; i++) {
      if (form[i].type === 'harvest') {
        const fr = form[i] as IHarvestForm;
        const sig = await RNFS.readFile(`${RNFS.DocumentDirectoryPath}/${fr.signature}.jpg`, 'utf8');
        formData.push({
          ...form[i],
          signature: sig,
        });
      } else {
        formData.push(form[i]);
      }
    }

    try {
      const sendFormRes = await postRequest(
        getFormUrl(),
        {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.currentUser?.authToken}`,
        },
        {
          data: formData,
          email: emailNotify,
        },
      );
      
      console.log('**********');
      console.log(formData);
      console.log('----------');
      console.log(sendFormRes);
      if (sendFormRes.status === 'Success') {
        for (let i = 0; i < form.length; i++) {
          await dispatch(removeFormFromPending(form[i]));
        }
        await dispatch(getAllFarms());
        await dispatch(getAllUtils());
      }
    } catch (e) {
      return;
    }
  };
};

const saveForm = (form: IFormTypes): ThunkActionType => {
  return async (dispatch): Promise<void> => {
    await dispatch(saveFormToPending(form));
    if (form.type === 'assessment') {
      await dispatch(createAssessment(form as IAssessmentForm));
    } else if (form.type === 'harvest') {
      await dispatch(createHarvest(form as IHarvestForm));
    } else if (form.type === 'seeding') {
      await dispatch(createSeeding(form as ISeedingForm));
    }
  };
};

const updateForm = (
  oldForm: IFormTypes,
  newForm: IFormTypes,
): ThunkActionType => {
  return async (dispatch): Promise<void> => {
    await dispatch(updateFormToPending(oldForm, newForm));
    if (newForm.type === 'assessment') {
      await dispatch(updateAssessment(newForm as IAssessmentForm));
    }
  };
};

export {saveForm, sendForm, updateForm};
