import * as React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Input, Item, Label, Text} from 'native-base';
import {primary, spacingBase} from '../../styles';
import {IDebrisForm, IFarm} from '../../entities/general';

type TProps = {
  date: string;
  handleTextChange: (name: string) => (text: string) => void;
  formState: IDebrisForm;
  handleSearchChange: (type: string) => (text: string) => void;
  toggleVisibleChange: (type: string) => void;
  setFarm: (farm: IFarm) => void;
  visible: boolean;
  allPoints: Array<IFarm>;
};

export const DebrisReportHeader: React.FC<TProps> = ({
  date,
  handleTextChange,
  formState,
  handleSearchChange,
  toggleVisibleChange,
  setFarm,
  visible,
  allPoints,
}) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={() => toggleVisibleChange('bay')}>
        <View>
          {formState.custrecord_mfa_bay.length !== 0 ? (
            <View>
              <Text>{formState.custrecord_mfa_bay}</Text>
              <Text style={styles.noteStyles}>
                Note*: Click to change Bay
              </Text>
            </View>
          ) : (
            <View style={styles.textStyles}>
              <Text>Click to choose Bay *</Text>
            </View>
          )}
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.date}>
        <Text style={styles.dateText}>Date: {date}</Text>
      </View>
      <Item style={styles.formWrapperBig} floatingLabel>
        <Label style={styles.inputStyleSmall}>People Time</Label>
        <Input
          value={formState.custrecord_mfa_total_time}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_total_time')(text)
          }
        />
      </Item>
      <Item style={styles.formWrapperBig} floatingLabel>
        <Label style={styles.inputStyleSmall}>Vessel Time</Label>
        <Input
          value={formState.custrecord_mfa_vessel_time}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_vessel_time')(text)
          }
        />
      </Item>
    </>
  );
};

const styles = StyleSheet.create({
  formInputContainerStyles: {
    flex: 2,
    marginLeft: 0,
    paddingHorizontal: 0,
  },
  innerContainer: {flexDirection: 'row'},
  formWrapper: {
    flex: 1,
    width: '50%',
    marginBottom: spacingBase,
  },
  formWrapperBig: {
    marginBottom: spacingBase,
    fontSize: spacingBase + 2,
  },
  inputStyleSmall: {
    fontSize: spacingBase + 2,
  },
  date: {
    marginBottom: spacingBase * 2,
  },
  dateText: {
    fontWeight: "400",
    fontSize: 17,
  },
  title: {
    marginBottom: spacingBase * 3,
  },
  noteStyles: {
    fontSize: spacingBase + 2,
    textDecorationLine: 'underline',
    marginTop: spacingBase,
    marginBottom: spacingBase * 2,
  },
  textStyles: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: primary,
    padding: spacingBase + 3,
    marginBottom: spacingBase * 2,
  },
  titleContainer: {
    marginBottom: spacingBase * 2,
  },
});
