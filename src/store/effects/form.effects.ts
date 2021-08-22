import NetInfo from '@react-native-community/netinfo';
import {RootState} from '../rootReducer';
import {getFormUrl} from '../../helpers/form.helpers';
import {postRequest} from '../../helpers/general.gelpers';
import {ThunkActionType, IFormTypes} from '../../entities/general';
import {
  removeFormFromPending,
  saveFormToPending,
} from '../actions/form.actions';

const sendForm = (form: IFormTypes): ThunkActionType => {
  return async (dispatch, getState: Function): Promise<void> => {
    const state: RootState = getState();
    const {user} = state;

    try {
      const internetConnection = await NetInfo.fetch();
      if (internetConnection.isConnected) {
        const sendForm = await postRequest(
          getFormUrl(form.type),
          {
            'Accept': "application/json",
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.currentUser?.authToken}`,
          },
          form,
        );
        
        if (sendForm.status === 'Success') {
          dispatch(removeFormFromPending(form));
        } else {
          return;
        }
      }
    } catch (e) {
      return;
    }
  };
};

const saveForm = (form: IFormTypes): ThunkActionType => {
  return async (dispatch, getState: Function): Promise<void> => {
    const state: RootState = getState();
    const {user} = state;

    dispatch(saveFormToPending(form));

    // try {
    //   const internetConnection = await NetInfo.fetch();

    //   if (internetConnection.isConnected) {
    //     const sendForm = await postRequest(
    //       getFormUrl(form.type),
    //       {
    //         'Accept': "application/json",
    //         'Content-Type': 'application/json',
    //         Authorization: `Bearer ${user.currentUser?.authToken}`,
    //       },
    //       form,
    //     );
        
    //     if (sendForm.status !== 'Success') {
    //       if (form.harvest_group_id) {
    //         dispatch(saveFormToPending(form));
    //       }
    //     }
    //   } else {
    //     dispatch(saveFormToPending(form));
    //   }
    // } catch (e) {
    //   dispatch(saveFormToPending(form));
    // }
  };
};

export {saveForm, sendForm};
