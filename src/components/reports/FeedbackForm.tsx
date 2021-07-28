import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {Button, Text} from 'native-base';
import {FeedbackFormMain} from '../index';
import {MainScreenNavigationProp} from '../../entities/general';
import {saveForm} from '../../store/effects/form.effects';
import {feedbackForm} from '../../mock/mockData';
import {editFeedbackForm} from '../../helpers/form.helpers';
import {getNetSuiteDateFormat} from '../../helpers/general.gelpers';
import {primary, spacingBase} from '../../styles';

type TProps = {
  navigation: MainScreenNavigationProp;
};

export const FeedbackForm: React.FC<TProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const [date] = React.useState(new Date().toLocaleString());
  const [formState, setFormState] = React.useState(feedbackForm);

  const [inactiveButton, setInactiveButton] = React.useState(true);

  const handleFormSubmit = () => {
    const date = new Date();
    const form = editFeedbackForm({
      ...formState,
      custrecord_mfa_feedback_date: getNetSuiteDateFormat(date),
    });
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
      <View style={styles.date}>
        <Text style={styles.dateText}>Date: {date}</Text>
      </View>
      <FeedbackFormMain
        handleTextChange={handleTextChange}
        formState={formState}
      />
      {inactiveButton && (
        <Text style={styles.notification}>
          * Fill field Contact Name(Field is in square)
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
