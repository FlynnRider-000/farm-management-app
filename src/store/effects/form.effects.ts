import NetInfo from '@react-native-community/netinfo';
import {RootState} from '../rootReducer';
import {postRequest} from '../../helpers/general.gelpers';
import {ThunkActionType} from '../../entities/general';
import {
  removeFormFromPending,
  saveFormToLocal,
  saveFormToPending,
} from '../actions/form.actions';
import {IList} from '../../entities/form.entities';
import {getUrlAddress} from '../../helpers/form.helpers';
import {apiUrl} from '../../config/api';

const sendForm = (form: IList): ThunkActionType => {
  return async (dispatch, getState: Function): Promise<void> => {
    const state: RootState = getState();
    const {user} = state;
    /*Try send form, if OK - delete form from pending,
           else return from function*/
    try {
      const data:object = {
        ...form,
      };
      let url = apiUrl;
      //@ts-ignore
      if (form.custrecord_mfa_audit_farm) {
        url += '/api/v1/farms/store';
      }
      //@ts-ignore
      else if (form.custrecord_mfa_vessel_name_audit) {
        url += '/api/v1/vessels/store';
      }
      //@ts-ignore
      else if (form.custrecord_mfa_collection_bay) {
        url += '/api/v1/floats/store';
      }
      //@ts-ignore
      else if (form.custrecord_mfa_fs_method_of_contact) {
        url += '/api/v1/spotters/store';
      }
      //@ts-ignore
      else if (form.custrecord_mfa_feedback_date) {
        url += '/api/v1/feedbacks/store';
      }
      else {
        url += '/api/v1/forms/store';
      }
      const sendReport = await postRequest(
        url,
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.currentUser?.authToken}`,
        },
        data,
      );
      if (sendReport.id || sendReport === 1) {
        dispatch(removeFormFromPending(form));
      } else {
        return;
      }
    } catch (e) {
      // console.log(e);
      return;
    }
  };
};

const saveForm = (form: IList): ThunkActionType => {
  return async (dispatch, getState: Function): Promise<void> => {
    const state: RootState = getState();
    const {user} = state;

    try {
      const internetConnection = await NetInfo.fetch();
      /*Try send form, if OK - store only in all forms storage,
             else store both allForms and pendingForm storage*/
      const data = {
        ...form,
        custrecord_mfa_email_address: 'test@test.test',
      };

      console.log('Post Info');
      console.log(getUrlAddress(data));
      console.log(data);
      console.log(JSON.stringify(data));
      console.log(`Bearer ${user.currentUser?.authToken}`);
      if (internetConnection.isConnected) {
        const sendReport = await postRequest(
          getUrlAddress(data),
          {
            'Accept': "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.currentUser?.authToken}`,
          },
          data,
        );
        console.log('Fetch Info');
        console.log(sendReport);
        dispatch(saveFormToLocal(form));
        if (!sendReport.id && sendReport !== 1) {
          dispatch(saveFormToPending(form));
        }
      } else {
        dispatch(saveFormToLocal(form));
        dispatch(saveFormToPending(form));
      }
    } catch (e) {
      // console.log(e);
      dispatch(saveFormToLocal(form));
      dispatch(saveFormToPending(form));
    }
  };
};

export {saveForm, sendForm};
