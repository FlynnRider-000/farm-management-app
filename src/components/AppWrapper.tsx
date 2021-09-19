import * as React from 'react';
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/rootReducer';
import {removeError, setInternetConnection} from '../store/actions/ui.actions';
import {UIStateInterface} from '../entities/ui.entities';

export const AppWrapper: React.FC = ({children}) => {
  const dispatch = useDispatch();
  const {errors}: UIStateInterface = useSelector(
    (state: RootState) => state.ui,
  );

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      dispatch(setInternetConnection(state.isInternetReachable));
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  React.useEffect(() => {
    let removeErrorTimeout: NodeJS.Timeout;
    if (errors.type) {
      removeErrorTimeout = setTimeout(() => dispatch(removeError()), 5000);
    }
    return () => {
      clearTimeout(removeErrorTimeout);
    };
  }, [errors]);

  return <>{children}</>;
};
