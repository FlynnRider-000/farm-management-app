import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SignIn from '../scenes/SignIn';
import {Report} from '../scenes/Report';
import Main from '../scenes/Main';
import Account from '../scenes/Account';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../store/rootReducer';
import {getAllFarms} from '../store/effects/farm.effects';
import {MainScreenNavigationProp, IFarm} from '../entities/general';

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
    <AuthStack.Screen options={{headerShown: false}} name={'SignIn'} component={SignIn} />
  </AuthStack.Navigator>
);

type IProps = {
  navigation: MainScreenNavigationProp;
};

const MainStackScreen: React.FC<IProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const farmData: Array<IFarm> = useSelector((state: RootState) => state.farm.allFarms);

  React.useEffect(() => {
    const getAllData = async () => {
      await dispatch(getAllFarms());
    };

    if (farmData.length === 0) {
      getAllData();
    }
  }, [navigation]);

  return (
    <MainStack.Navigator>
      <MainStack.Screen options={{headerShown: false}} name={'Main'} component={Main} />
      <MainStack.Screen options={{headerShown: false}} name={'Report'} component={Report} />
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
