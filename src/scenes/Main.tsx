import * as React from 'react';
import {View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';
import {Text, Box, Heading, useBreakpointValue} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {differenceInSeconds} from 'date-fns';

import {spacingBase} from '../styles';
import {RootState} from '../store/rootReducer';
import {setCurrentForm} from '../store/actions/form.actions';
import {getRefreshToken} from '../store/effects/user.effects';
import {getAllFarms} from '../store/effects/farm.effects';
import {MainStackParamList} from '../navigation/navigation';
import {MainScreenNavigationProp} from '../entities/general';

type IProps = {
  navigation: MainScreenNavigationProp;
};

const Main: React.FC<IProps> = React.memo(({navigation}) => {
  const dispatch = useDispatch();

  const screenSize = useBreakpointValue({
    base: 'base',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  });

  const {currentUser} = useSelector((state: RootState) => state.user);

  React.useEffect(() => {
    const onFocus = navigation.addListener('focus', (e) => {
      // Prevent default action

      const asyncAction = async () => {
        const connection = await NetInfo.fetch();
        if (connection.isConnected) {
          await dispatch(getRefreshToken());
        }
      };
  
      if (currentUser) {
        const diff = differenceInSeconds(new Date(), new Date(currentUser.loginTime));
        console.log('Time-Diff ', diff);
        if (diff > 4000) {
          asyncAction();
        }
      }

      dispatch(getAllFarms());
    });
  }, [navigation]);

  const handleNavigatePush = (route: keyof MainStackParamList) =>
    navigation.push(route);

  const onFormCreate = (type: string) => {
    if (type === 'assessment') {
      dispatch(setCurrentForm(type));
      handleNavigatePush('Report');
    }
  };

  return (
    <ScrollView style={screenSize === 'base' ? styles.miniOutercontainer : styles.outerContainer}>
      <View style={screenSize === 'base' ? styles.miniCardContainer : styles.cardContainer}>
        <Box style={styles.headingContainer}>
          <Heading mt={screenSize === 'base' ? spacingBase*0.3 : spacingBase*2}>Hi {`${currentUser?.firstname}`},</Heading>
          <Heading mb={screenSize === 'base' ? spacingBase*0.3 : spacingBase*2}>Let's Get Started</Heading>
        </Box>
        <Box mt={spacingBase} style={screenSize === 'base' ? styles.miniFormCardContainer : styles.formCardContainer}>
          <TouchableHighlight style={{flex: 1}} onPress={() => onFormCreate('assessment')} underlayColor="#DFE5EC">
            <View style={[screenSize === 'base' ? styles.miniFormCard : styles.formCard, styles.c1]}>
              <Text style={styles.whiteLabel} fontSize="sm">FORM</Text>
              <Text style={styles.whiteLabel} fontSize="lg">Assessment</Text>
            </View>
          </TouchableHighlight  >
          <TouchableHighlight style={{flex: 1}} onPress={() => onFormCreate('seeding')} underlayColor="#DFE5EC">
            <View style={[screenSize === 'base' ? styles.miniFormCard : styles.formCard, styles.c2]}>
              <Text style={styles.whiteLabel} fontSize="sm">FORM</Text>
              <Text style={styles.whiteLabel} fontSize="lg">Seeding</Text>
            </View>
          </TouchableHighlight  >
          <TouchableHighlight style={{flex: 1, margin: 0}} onPress={() => onFormCreate('harvest')} underlayColor="#DFE5EC">
            <View style={[screenSize === 'base' ? styles.miniFormCard : styles.formCard, styles.c3]}>
              <Text style={styles.whiteLabel} fontSize="sm">FORM</Text>
              <Text style={styles.whiteLabel} fontSize="lg">Harvest</Text>
            </View>
          </TouchableHighlight  >
        </Box>
        <Box mt={spacingBase} mb={spacingBase} style={styles.guidePanel}>
          <Heading mb={spacingBase}>
            How it works
          </Heading>
          <Text mb={spacingBase*0.5} fontSize="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text fontSize="sm">
            Aenean sed adipiscing diam donec adipiscing tristique. Cursus risus at ultrices mi tempus imperdiet nulla malesuada pellentesque. Consequat mauris nunc congue nisi vitae suscipit tellus. Fusce ut placerat orci nulla pellentesque dignissim.
          </Text>
        </Box>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  miniOutercontainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  outerContainer: {
    flex: 1,
    backgroundColor: '#DFE5EC',
  },
  miniCardContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  cardContainer: {
    flexDirection: 'column',
    backgroundColor: '#DFE5EC',
  },
  miniFormCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: spacingBase * 2,
    paddingHorizontal: spacingBase + 5,
    backgroundColor: '#DFE5EC',
  },
  formCardContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: spacingBase + 5,
    maxWidth: 700,
    backgroundColor: '#DFE5EC',
  },
  c1: {
    backgroundColor: '#334CAA',
    shadowColor: '#334CAA',
  },
  c2: {
    backgroundColor: '#4762EB',
    shadowColor: '#4762EB',
  },
  c3: {
    backgroundColor: '#08AEF7',
    shadowColor: '#08AEF7',
  },
  miniFormCard: {
    marginVertical: spacingBase * 0.5,
    padding: spacingBase * 2,
    borderRadius: spacingBase * 1.2,
    minHeight: 120,
    color: 'white',
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 10,
  },
  formCard: {
    margin: spacingBase * 0.5,
    padding: spacingBase,
    borderRadius: spacingBase * 1.2,
    color: 'white',
    flex: 1,
    height: undefined,
    aspectRatio: 10/13,
    display: 'flex',
    justifyContent: 'space-between',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 10,
  },
  whiteLabel: {
    color: 'white',
  },
  headingContainer: {
    paddingHorizontal: spacingBase + 5,
    backgroundColor: 'white',
  },
  guidePanel: {
    borderRadius: spacingBase * 1.5,
    backgroundColor: 'white',
    padding: spacingBase * 3,
    marginHorizontal: spacingBase + 5,
    maxWidth: 700,
    alignSelf: 'center',
  },
});

export default Main;
