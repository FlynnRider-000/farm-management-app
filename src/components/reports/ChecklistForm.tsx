import * as React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {Picker} from 'native-base';
import {spacingBase} from '../../styles';
import {GeneralFormType} from '../../entities/general';

type TProps = {
  item: keyof GeneralFormType;
  handleFormChange: (name: keyof GeneralFormType) => (text: string) => void;
  state: GeneralFormType;
};

export const ChecklistForm: React.FC<TProps> = ({
  item,
  handleFormChange,
  state,
}) => {
  const pickerTypes = {
    'select-beans': [
      'Available - Secure & fit for purpose',
      'Available - Secure & not fit for purpose',
      'Available - Not secure & fit for purpose',
      'Available - Not secure & not fit for purpose',
      'Not available',
    ],
    'select-empty': ['Often', 'Rarely', 'Never'],
    select: ['Yes', 'No', 'N/A', 'Maybe'],
    'select-audit-result': [
      'Pass',
      'Fail',
      'Action needed',
    ],
    'select-nets': [
      'Onboard & within reach',
      'Onboard but not in reach',
      'Not onboard',
    ],
  };

  return (
    <View style={styles.outerContainer}>
      <Text style={styles.androidText}>{item}</Text>
      <View style={styles.pickerStylesContainer}>
        <Picker
          mode="dropdown"
          style={styles.pickerStyles}
          selectedValue={state[item]?.text}
          placeholderStyle={styles.pickerStylesPlaceholder}
          onValueChange={(label) => handleFormChange(item)(label)}
          placeholder={item}>
          {
            // @ts-ignore
            pickerTypes[state[item].type].map(
              (pickerItem: string, i: number) => {
                return (
                  <Picker.Item
                    label={pickerItem}
                    value={`${i + 1}`}
                    key={pickerItem + i}
                  />
                );
              },
            )
          }
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    marginBottom: spacingBase,
  },
  pickerStylesContainer: {borderWidth: 1, marginBottom: spacingBase},
  pickerStylesPlaceholder: {fontSize: 12},
  pickerStyles: {width: '100%'},
  pickerNote: {
    fontSize: 12,
    textDecorationLine: 'underline',
    marginBottom: spacingBase,
    marginLeft: spacingBase,
  },
  androidText: {
    marginBottom: spacingBase,
  },
});
