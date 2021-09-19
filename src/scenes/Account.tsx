import * as React from 'react';
import {SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';
import {clearAllData} from '../store/effects/user.effects';

const Account: React.FC = React.memo(() => {
  const dispatch = useDispatch();
  React.useLayoutEffect(() => {
    dispatch(clearAllData());
  }, [dispatch]);
  return <SafeAreaView />;
});

export default Account;
