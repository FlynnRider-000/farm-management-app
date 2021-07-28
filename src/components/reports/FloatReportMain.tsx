import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {H2, H3, Input, Item, Label, Picker, Text, Textarea} from 'native-base';
import {primary, spacingBase} from '../../styles';
import {IFloatForm} from '../../entities/general';
import {FarmModal} from '../FarmModal';

type TProps = {
  formState: IFloatForm;
  currentUser: string;
  handleTextChange: (name: string) => (text: string, index?: number) => void;
  setCompany: (company: any) => void;
  setFloat: (float: any) => void;
  filteredPoints: Array<any>;
  handleSearchChange: (type: string) => (text: string) => void;
  visible: {
    floats: boolean;
    bay: boolean;
    company: boolean;
  };
  toggleVisibleChange: (type: string, index: number) => void;
};

export const FloatReportMain: React.FC<TProps> = ({
  formState,
  currentUser,
  handleTextChange,
  setCompany,
  setFloat,
  filteredPoints,
  handleSearchChange,
  visible,
  toggleVisibleChange,
}) => {
  return (
    <>
      {formState.custrecord_mfa_float_id_collected.map((float_id, index) => (
        <TouchableWithoutFeedback
          onPress={() => toggleVisibleChange('floats', index)}
          key={index}
        >
          <View style={styles.py2}>
            <View style={styles.formWrapperBig}>
              <Text>{float_id}</Text>
              <Text style={styles.noteStyles}>
                Note*: Click to change Float
              </Text>
            </View>
            <View>
              <Item style={styles.formWrapperBig} floatingLabel>
                <Label style={styles.inputStyleSmall}>Number of floats</Label>
                <Input
                  value={formState.custrecord_mfa_no_floats_collected[index]}
                  onChangeText={(text) =>
                    handleTextChange('custrecord_mfa_no_floats_collected')(text, index)
                  }
                />
              </Item>
            </View>
          </View>
        </TouchableWithoutFeedback>
      ))}
      <TouchableWithoutFeedback
        onPress={() => toggleVisibleChange('floats', -1)}>
        <View style={styles.formWrapperBig}>
          <View style={styles.textStyles}>
            <Text>Click to choose Float *</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <View>
        <Textarea
          rowSpan={7}
          placeholder={'Floats delivered to'}
          bordered
          underline
          style={styles.textAreaStyles}
          value={formState.custrecord_mfa_floats_delivered_to}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_floats_delivered_to')(text)
          }
        />
        <Textarea
          rowSpan={7}
          placeholder={'Comments'}
          bordered
          underline
          style={styles.textAreaStyles}
          value={formState.custrecord_mfa_float_collection_comments}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_float_collection_comments')(text)
          }
        />
      </View>
      <View>
        <TouchableWithoutFeedback
          onPress={() => toggleVisibleChange('company', -1)}>
          <View>
            {formState.custrecord_mfa_collection_company.length !== 0 ? (
              <View>
                <Text>{formState.custrecord_mfa_collection_company}</Text>
                <Text style={styles.noteStyles}>
                  Note*: Click to change Company
                </Text>
              </View>
            ) : (
              <View style={styles.textStyles}>
                <Text>Click to choose Company *</Text>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
        <Item style={styles.inputStyleBig} floatingLabel>
          <Label style={styles.inputStyleSmall}>Contact Detail</Label>
          <Input
            value={formState.custrecord_mfa_contact_detail}
            onChangeText={(text) =>
              handleTextChange('custrecord_mfa_contact_detail')(text)
            }
          />
        </Item>
        <FarmModal
          handleSearchChange={handleSearchChange}
          allPoints={filteredPoints}
          visible={visible.company}
          setFarm={setCompany}
          type={'company'}
        />
        <FarmModal
          handleSearchChange={handleSearchChange}
          allPoints={filteredPoints}
          visible={visible.floats}
          setFarm={setFloat}
          type={'floats'}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    marginVertical: spacingBase * 3,
  },
  secondaryTitle: {
    marginVertical: spacingBase * 2,
  },
  inputOuterWrapper: {
    flexDirection: 'row',
    marginTop: spacingBase,
  },
  inputStyleSmall: {
    fontSize: spacingBase + 2,
  },
  formWrapperBig: {
    marginBottom: spacingBase,
    fontSize: spacingBase + 2,
  },
  formWrapper: {
    flex: 1,
    marginBottom: spacingBase,
  },
  pickerStylesContainer: {
    borderWidth: 2,
    marginBottom: spacingBase,
    borderColor: primary,
  },
  pickerStylesPlaceholder: {fontSize: 12},
  pickerStyles: {width: '100%'},
  pickerNote: {
    fontSize: 12,
    textDecorationLine: 'underline',
    marginBottom: spacingBase,
    marginLeft: spacingBase,
  },
  interestField: {fontSize: 12, marginTop: spacingBase},
  textAreaStyles: {marginBottom: spacingBase},
  noteStyles: {
    fontSize: spacingBase + 2,
    textDecorationLine: 'underline',
    marginTop: spacingBase,
  },
  textStyles: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderColor: primary,
    padding: spacingBase + 3,
  },
  inputStyleBig: {
    marginBottom: spacingBase * 2,
  },
  reportAuthor: {
    marginTop: spacingBase * 2,
  },
  py2: {
    paddingBottom: spacingBase * 2,
    paddingTop: spacingBase * 2,
  },
});
