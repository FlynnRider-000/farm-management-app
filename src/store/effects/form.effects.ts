import * as RNFS from 'react-native-fs';
import {RootState} from '../rootReducer';
import {getFormUrl} from '../../helpers/form.helpers';
import {postRequestMultiPart} from '../../helpers/general.gelpers';
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

    let frmData = new FormData();

    let formData: Array<IFormTypes> = [];
    for (let i = 0; i < form.length; i++) {
      if (form[i].type === 'harvest') {
        const fr = form[i] as IHarvestForm;
        frmData.append('file[]', {
          // @ts-ignore
          name: fr.signature,
          type: 'image/png',
          uri: 'file://' + RNFS.ExternalDirectoryPath + '/' + fr.signature,
        });
      } else {
        if (form[i].type === 'assessment') {
          let tmp = form[i] as IAssessmentForm;
          for (let j = 0; j < tmp.images.length; j++) {
            frmData.append('file[]', {
              // @ts-ignore
              name: tmp.images[j],
              type: 'image/png',
              uri: 'file://' + RNFS.ExternalDirectoryPath + '/' + tmp.images[j],
            });
          }
        }
      }
      formData.push(form[i]);
    }

    frmData.append('email', emailNotify ? 'true' : 'false');
    frmData.append('data', JSON.stringify(formData));

    try {
      const sendFormRes = await postRequestMultiPart(
        getFormUrl(),
        {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.currentUser?.authToken}`,
        },
        frmData,
      );

      // console.log('**********');
      // console.log(formData);
      // console.log('----------');
      // console.log(sendFormRes);
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
