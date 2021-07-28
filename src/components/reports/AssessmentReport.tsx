import * as React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Platform} from 'react-native';
import {primary, spacingBase} from '../../styles';
import {
  Button,
  Text,
  Item,
  Label,
  Input,
  Picker,
  Textarea,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {spotterForm} from '../../mock/mockData';
import {saveForm} from '../../store/effects/form.effects';
import {editSpotterFloatForm} from '../../helpers/form.helpers';
import { MainScreenNavigationProp} from '../../entities/general';

type TProps = {
  navigation: MainScreenNavigationProp;
};

export const AssessmentReport: React.FC<TProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const [assessDate, setAssessDate] = React.useState(new Date());
  const [pHarvestDate, setPHaverstDate] = React.useState(new Date());
  const [dateType, setDateType] = React.useState('assess');
  const [formState, setFormState] = React.useState(spotterForm);
  const [inactiveButton, setInactiveButton] = React.useState(true);
  const [datePickerShow, setDatePickerShow] = React.useState(false);

  const colors = [
    {
      value: "1",
      text: "Red",
    },
    {
        value: "2",
        text: "Green",
    },
    {
        value: "3",
        text: "Blue",
    },
  ];

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
      <View style={styles.outerContainer}>
        <Text style={styles.androidText}>Color</Text>
        <View style={styles.pickerStylesContainer}>
          <Picker
            mode="dropdown"
            style={styles.pickerStyles}
            selectedValue={formState.custrecord_mfa_fs_method_of_contact}
            placeholderStyle={styles.pickerStylesPlaceholder}
            onValueChange={(label) => handleTextChange('custrecord_mfa_fs_method_of_contact')(label)}
            placeholder='Preferred method of contact'>
            {
              // @ts-ignore
              colors.map(
                ({value, text}, i: number) => {
                  return (
                    <Picker.Item
                      label={text}
                      value={value}
                      key={value}
                    />
                  );
                },
              )
            }
          </Picker>
        </View>
      </View>
      <View style={styles.inputStyleBig}>
        <Item floatingLabel>
          <Label style={styles.inputStyleSmall}>Conditoin Min</Label>
          <Input
            value={formState.name}
            onChangeText={(text) =>
              handleTextChange('name')(text)
            }
          />
        </Item>
      </View>
      <View style={styles.inputStyleBig}>
        <Item floatingLabel>
          <Label style={styles.inputStyleSmall}>Conditoin Max</Label>
          <Input
            value={formState.name}
            onChangeText={(text) =>
              handleTextChange('name')(text)
            }
          />
        </Item>
      </View>
      <View style={styles.inputStyleBig}>
        <Item floatingLabel>
          <Label style={styles.inputStyleSmall}>Conditoin Average</Label>
          <Input
            value={formState.name}
            onChangeText={(text) =>
              handleTextChange('name')(text)
            }
          />
        </Item>
      </View>
      <View style={styles.inputStyleBig}>
        <Item floatingLabel>
          <Label style={styles.inputStyleSmall}>Conditoin Score</Label>
          <Input
            value={formState.name}
            onChangeText={(text) =>
              handleTextChange('name')(text)
            }
          />
        </Item>
      </View>
      <View style={styles.inputStyleBig}>
        <Item floatingLabel>
          <Label style={styles.inputStyleSmall}>Blues</Label>
          <Input
            value={formState.name}
            onChangeText={(text) =>
              handleTextChange('name')(text)
            }
          />
        </Item>
      </View>
      <View style={styles.inputStyleBig}>
        <Item floatingLabel>
          <Label style={styles.inputStyleSmall}>Tonnes</Label>
          <Input
            value={formState.name}
            onChangeText={(text) =>
              handleTextChange('name')(text)
            }
          />
        </Item>
      </View>
      <TouchableWithoutFeedback onPress={() => {
        setDateType('assess');
        setDatePickerShow(true);
      }}>
        <View>
          <View>
            <Text>{assessDate.toDateString()}</Text>
            <Text style={styles.noteStyles}>
              Note*: Click to set Assessment Date
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
        setDateType('pharvest');
        setDatePickerShow(true);
      }}>
        <View>
          <View>
            <Text>{pHarvestDate.toDateString()}</Text>
            <Text style={styles.noteStyles}>
              Note*: Click to set Planned Harvest Date
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <Textarea
        rowSpan={5}
        placeholder={'Comment'}
        bordered
        underline
        style={styles.textAreaStyles}
        value={formState.custrecord_mfa_fs_approx_no_floats}
        onChangeText={(text) =>
          handleTextChange('custrecord_mfa_fs_approx_no_floats')(text)
        }
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
      {datePickerShow &&  <DateTimePicker
        testID="dateTimePicker"
        value={
          dateType === 'assess'
            ? assessDate
            : pHarvestDate
        }
        mode='date'
        is24Hour={true}
        display="default"
        onChange={(event, selectedDate: Date | undefined) => {
          setDatePickerShow(Platform.OS === 'ios' ? true : false);
          const currentDate = selectedDate || (
            dateType === 'assess' ? assessDate : pHarvestDate
          );
          if (dateType === 'assess')  {
            setAssessDate(currentDate);
          } else {
            setPHaverstDate(currentDate);
          }
        }}
      />}
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
  inputStyleSmall: {
    fontSize: spacingBase + 2,
  },
  textAreaStyles: {marginBottom: spacingBase},
  inputStyleBig: {
    marginBottom: spacingBase * 2,
  },
  inputStyleBigImp: {
    borderWidth: 2,
    borderColor: primary,
    marginBottom: spacingBase * 2,
    padding: 1,
  },
  outerContainer: {
    marginBottom: spacingBase,
  },
  androidText: {
    marginBottom: spacingBase,
  },
  pickerStylesContainerImp: {
    borderWidth: 2,
    marginBottom: spacingBase,
    borderColor: primary,
  },
  pickerStylesContainer: {
    borderWidth: 1,
    marginBottom: spacingBase,
    borderColor: '#ccc',
  },
  pickerStylesPlaceholder: {fontSize: 12},
  pickerStyles: {width: '100%'},
  noteStyles: {
    fontSize: spacingBase + 2,
    textDecorationLine: 'underline',
    marginTop: spacingBase,
    marginBottom: spacingBase * 2,
  },
});
