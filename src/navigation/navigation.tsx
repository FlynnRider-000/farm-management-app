import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../scenes/SignIn';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Report} from '../components';
import Main from '../scenes/Main';
import Account from '../scenes/Account';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/rootReducer';
import AllForms from '../scenes/AllForms';
import {setUpdate} from '../store/actions/farm.actions';
import {removeOldForms} from '../store/actions/form.actions';
import {getAllFarmsAndVessels} from '../store/effects/farm.effects';
import NetInfo from '@react-native-community/netinfo';
import {getRefreshToken} from '../store/effects/user.effects';
import {MainScreenNavigationProp} from '../entities/general';
import {differenceInDays} from 'date-fns';

export type MainStackParamList = {
  Home: undefined;
  Main: undefined;
  LogIn: undefined;
  Report: undefined;
  Account: undefined;
  LogOut: undefined;
  'All Facilities': undefined;
};

export type AuthStackParamList = {
  SignIn: undefined;
  'Create Account': undefined;
  'Forgot Password': undefined;
};

const AuthStack = createStackNavigator<AuthStackParamList>();
const MainStack = createStackNavigator<MainStackParamList>();
const AccountStack = createStackNavigator<MainStackParamList>();
const Drawer = createDrawerNavigator<MainStackParamList>();

const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name={'SignIn'} component={SignIn} />
  </AuthStack.Navigator>
);

type IProps = {
  navigation: MainScreenNavigationProp;
};

const MainStackScreen: React.FC<IProps> = ({navigation}) => {
  const {currentUser} = useSelector((state: RootState) => state.user);
  const rredux = useSelector((state: RootState) => state);
  const {updated, allFarms, allVessels, allCompanies} = useSelector(
    (state: RootState) => state.farm,
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    const todayDay = new Date().getDay();
    const asyncAction = async () => {
      dispatch(getAllFarmsAndVessels());
    };

    if (
      (currentUser && todayDay === 1 && !updated) ||
      !allFarms ||
      !allVessels ||
      !allCompanies
    ) {
      asyncAction();
    }
    if (currentUser && todayDay !== 1) {
      dispatch(setUpdate(false));
    }

    const removeOld = async () => {
      await dispatch(removeOldForms());
    };
    if (currentUser?.authToken) {
      removeOld();
    }
  }, []);

  React.useEffect(() => {
    const asyncAction = async () => {
      const connection = await NetInfo.fetch();
      if (connection.isConnected) {
        await dispatch(getRefreshToken());
      }
    };
    if (currentUser) {
      const diff = differenceInDays(new Date(), new Date(currentUser.loginTime));
      if (diff > 150) {
        asyncAction();
      }
    }
  }, [navigation]);

  return (
    <MainStack.Navigator>
      <MainStack.Screen name={'Main'} component={Main} />
      <MainStack.Screen name={'Report'} component={Report} />
    </MainStack.Navigator>
  );
};

const AccountStackScreen = () => (
  <AccountStack.Navigator>
    <AccountStack.Screen name={'Account'} component={Account} />
  </AccountStack.Navigator>
);

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName={'Home'}>
      <Drawer.Screen name={'Home'} component={MainStackScreen} />
      <Drawer.Screen name={'LogOut'} component={AccountStackScreen} />
    </Drawer.Navigator>
  );
};

export default React.memo(() => {
  const {currentUser} = useSelector((state: RootState) => state.user);
  return (
    <NavigationContainer>
      {!currentUser?.authToken ? <AuthStackScreen /> : <DrawerNavigator />}
    </NavigationContainer>
  );
});
