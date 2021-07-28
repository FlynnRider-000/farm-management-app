import * as React from 'react';
import {Button, Card, CardItem} from 'native-base';
import {Text, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux'; 
import Icon from 'react-native-vector-icons/FontAwesome5';
import {light, primary, spacingBase, primaryLight} from '../styles';
import {MainScreenNavigationProp} from '../entities/general';
import {MainStackParamList} from '../navigation/navigation';
import {setCurrentForm} from '../store/actions/form.actions';
import { reduceRight } from 'lodash';

type TProps = {
  name?: string;
  email?: string;
  pullDataFunc: Function;
  isActiveButton?: boolean;
  navigation: MainScreenNavigationProp;
};

export const UserCard = React.memo(({name, email, pullDataFunc, navigation, isActiveButton}: TProps) => {
  const dispatch = useDispatch();

  const [formType, setFormType] = React.useState('assessment');
  const handleFormTypeChange = (value: string) => setFormType(value);

  const handleNavigatePush = (route: keyof MainStackParamList) =>
    navigation.push(route);

  return (
    <Card>
      <View style={styles.outterContainer}>
        <View>
          <CardItem style={styles.innerContainer}>
            <Text style={styles.bigText}>User: </Text>
            <Text style={styles.smallText}>{name}</Text>
          </CardItem>
          <CardItem style={[styles.innerContainer, {marginBottom: spacingBase}]}>
            <Text style={styles.bigText}>Email: </Text>
            <Text style={styles.smallText}>{email}</Text>
          </CardItem>
        </View>
        <View>
          <View style={styles.pushDataButtonContainer}>
            <Button
              onPress={() => pullDataFunc()}
              style={isActiveButton ? styles.pushDataButton : styles.inActivePushDataButton}
              disabled={!isActiveButton}
            >
              <Icon name="sync" size={15} color="#fff" />
            </Button>
          </View>
        </View>
      </View>
    </Card>
  );
});

const styles = StyleSheet.create({
  outterContainer: {display:'flex', flexDirection:'row', justifyContent:'space-between', alignItems:'center', paddingBottom: 0},
  innerContainer: {display:'flex', flexDirection:'column', alignItems: 'flex-start', paddingBottom: 0},
  bigText: {fontSize: spacingBase + 7, fontWeight: "900"},
  smallText: {fontSize: spacingBase + 7, fontWeight: "900"},
  pushDataButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  pushDataButton: {
    margin: spacingBase * 1.2,
    marginRight: spacingBase * 2,
    paddingLeft: spacingBase * 2,
    paddingRight: spacingBase * 2,
    paddingTop: spacingBase * 1.5,
    paddingBottom: spacingBase * 1.5,
    alignSelf: 'center',
    backgroundColor: primary,
    justifyContent: 'center',
  },
  inActivePushDataButton: {
    margin: spacingBase * 1.2,
    marginRight: spacingBase * 2,
    paddingLeft: spacingBase * 2,
    paddingRight: spacingBase * 2,
    paddingTop: spacingBase * 1.5,
    paddingBottom: spacingBase * 1.5,
    alignSelf: 'center',
    backgroundColor: primaryLight,
    justifyContent: 'center',
  },
  inActiveCreateButton: {
    paddingHorizontal: spacingBase + 5,
    alignSelf: 'center',
    backgroundColor: primaryLight,
    width: '90%',
    justifyContent: 'center',
  },
  createFormButton: {
    paddingHorizontal: spacingBase + 5,
    alignSelf: 'center',
    backgroundColor: primary,
    width: '90%',
    justifyContent: 'center',
  },
  buttonContainer: {
    marginTop: spacingBase * 1.5,
    marginBottom: spacingBase * 1.5,
  },
  buttonText: {
    color: light,
  },
});
