import * as React from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Badge, Button, Card, CardItem, H3} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';

import {RootState} from '../store/rootReducer';
import {getAllFarmsAndVessels} from '../store/effects/farm.effects';
import {setCurrentForm} from '../store/actions/form.actions';
import {MainStackParamList} from '../navigation/navigation';
import {UserCard} from '../components';
import {UIStateInterface} from '../entities/ui.entities';
import {MainScreenNavigationProp} from '../entities/general';
import {light, primary, spacingBase, primaryLight} from '../styles';

type IProps = {
  navigation: MainScreenNavigationProp;
};

const Main: React.FC<IProps> = React.memo(({navigation}) => {
  const dispatch = useDispatch();

  const {currentUser} = useSelector((state: RootState) => state.user);
  const {internetConnection, errors, netSuiteDataLoading}: UIStateInterface = useSelector(
    (state: RootState) => state.ui,
  );

  const handleNavigatePush = (route: keyof MainStackParamList) =>
    navigation.push(route);

  const pullDataFunc = async () => {
    dispatch(getAllFarmsAndVessels());
  };

  const createData = (type: string) => {
    dispatch(setCurrentForm(type));
    handleNavigatePush('Report');
  };

  return (
    <ScrollView style={styles.outerContainer}>
      <View style={styles.badgeContainer}>
        {internetConnection || internetConnection === null ? (
          <Badge success style={styles.badge} />
        ) : (
          <Badge danger style={styles.badge} />
        )}
        {errors.type === 'internet' && (
          <Text style={styles.errorText}>{errors.message}</Text>
        )}
      </View>
      <View style={styles.cardContainer}>
        <UserCard
          name={`${currentUser?.firstname} ${currentUser?.lastname}`}
          email={currentUser?.email}
          pullDataFunc={pullDataFunc}
          navigation={navigation}
          isActiveButton={!netSuiteDataLoading}
        />
        <Card>
          <CardItem header style={styles.titleStyles}>
            <H3>Please select the mode</H3>
          </CardItem>
          <View style={styles.buttonContainer}>
            <Button
              style={!netSuiteDataLoading ? styles.createFormButton : styles.inActiveCreateButton}
              disabled={netSuiteDataLoading}
            >
              <Text style={styles.buttonText}>Seeding</Text>
            </Button>
            <Button
              onPress={() => createData('assessment')}
              style={!netSuiteDataLoading ? styles.createFormButton : styles.inActiveCreateButton}
              disabled={netSuiteDataLoading}
            >
              <Text style={styles.buttonText}>Assessments</Text>
            </Button>
            <Button
              style={!netSuiteDataLoading ? styles.createFormButton : styles.inActiveCreateButton}
              disabled={netSuiteDataLoading}
            >
              <Text style={styles.buttonText}>Harvest</Text>
            </Button>
          </View>
        </Card>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
  },
  cardContainer: {
    flexDirection: 'column',
    paddingHorizontal: spacingBase + 5,
    paddingTop: spacingBase,
  },
  createFormButton: {
    paddingHorizontal: spacingBase + 5,
    alignSelf: 'center',
    marginBottom: spacingBase + 5,
    backgroundColor: primary,
    width: '90%',
    justifyContent: 'center',
  },
  buttonText: {
    color: light,
  },
  badge: {
    width: spacingBase + 2,
    height: spacingBase + 2,
    borderRadius: spacingBase * 2,
    alignSelf: 'center',
  },
  badgeContainer: {
    marginTop: spacingBase,
    paddingHorizontal: spacingBase * 2,
  },
  errorText: {
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: spacingBase * 1.5,
    marginBottom: spacingBase * 1.5,
  },
  inActiveCreateButton: {
    paddingHorizontal: spacingBase + 5,
    alignSelf: 'center',
    marginBottom: spacingBase + 5,
    backgroundColor: primaryLight,
    width: '90%',
    justifyContent: 'center',
  },
  titleStyles: {
    justifyContent: 'center',
  },
});

export default Main;
