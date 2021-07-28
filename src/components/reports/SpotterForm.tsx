import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {SpotterFormMain} from '../index';
import {primary, spacingBase} from '../../styles';
import {Button, Text} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {spotterForm} from '../../mock/mockData';
import {saveForm} from '../../store/effects/form.effects';
import {editSpotterFloatForm} from '../../helpers/form.helpers';
import { MainScreenNavigationProp} from '../../entities/general';

type TProps = {
  navigation: MainScreenNavigationProp;
};

export const SpotterForm: React.FC<TProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const [date] = React.useState(new Date().toLocaleString());
  const [formState, setFormState] = React.useState(spotterForm);

  const [inactiveButton, setInactiveButton] = React.useState(true);

  const handleFormSubmit = () => {
    const form = editSpotterFloatForm(formState);
    //@ts-ignore
    dispatch(saveForm(form));
    navigation.navigate('Main');
  };

  React.useEffect(() => {
    formState.name === ''
      ? setInactiveButton(true)
      : setInactiveButton(false);
  }, [formState]);

  const handleTextChange = (name: string) => {
    let type: boolean | undefined;
    if (name === 'custrecord_mfa_vessel_collection_time' || 'custrecord_mfa_no_floats_collected') {
      type = true;
    }
    type = false;
    return (text: string) => {
      setFormState({
        ...formState,
        [name]: type ? text.replace(/\D/g, '') : text,
      });
    };
  };

  return (
    <View>
      <SpotterFormMain
        handleTextChange={handleTextChange}
        formState={formState}
      />
      {inactiveButton && (
        <Text style={styles.notification}>
          * Fill fields Contact Name(Fields are in squares)
        </Text>
      )}
      <Button
        onPress={() => handleFormSubmit()}
        style={
          inactiveButton ? styles.inactiveButtonStyles : styles.buttonStyles
        }
        disabled={inactiveButton}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyles: {
    marginBottom: spacingBase * 4,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: primary,
  },
  inactiveButtonStyles: {
    marginBottom: spacingBase * 4,
    alignSelf: 'center',
    width: '100%',
    justifyContent: 'center',
    backgroundColor: `${primary}90`,
  },
  notification: {
    fontSize: spacingBase + 4,
    marginBottom: spacingBase,
  },
  date: {
    marginBottom: spacingBase * 2,
  },
  dateText: {
    fontWeight: "400",
    fontSize: 17,
  },
});
