import * as React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {Input, Item, Label, Text} from 'native-base';
import {primary, spacingBase} from '../../styles';
import {IFloatForm, IFarm} from '../../entities/general';
import {FarmModal} from '../FarmModal';

type TProps = {
  date: string;
  handleTextChange: (name: string) => (text: string) => void;
  formState: IFloatForm;
  setBay: (company: any) => void;
  handleSearchChange: (type: string) => (text: string) => void;
  toggleVisibleChange: (type: string, id: number) => void;
  visible: boolean;
  allPoints: Array<IFarm>;
};

export const FloatReportHeader: React.FC<TProps> = ({
  date,
  handleTextChange,
  formState,
  handleSearchChange,
  toggleVisibleChange,
  visible,
  allPoints,
  setBay,
}) => {
  return (
    <>
      <TouchableWithoutFeedback onPress={() => toggleVisibleChange('bay', -1)}>
        <View>
          {formState.custrecord_mfa_collection_bay.length !== 0 ? (
            <View>
              <Text>{formState.custrecord_mfa_collection_bay}</Text>
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
      {/* <Item style={styles.formWrapperBig} floatingLabel>
        <Label style={styles.inputStyleSmall}>Vessel Time</Label>
        <Input
          value={formState.custrecord_mfa_vessel_collection_time}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_vessel_collection_time')(text)
          }
        />
      </Item> */}
      <FarmModal
        handleSearchChange={handleSearchChange}
        allPoints={allPoints}
        visible={visible}
        setFarm={setBay}
        type={'bay'}
      />
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
