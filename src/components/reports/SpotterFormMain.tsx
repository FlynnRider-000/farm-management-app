import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Item, Label, Textarea, Picker, Text} from 'native-base';
import {primary, spacingBase} from '../../styles';
import {ISpotterForm} from '../../entities/general';

type TProps = {
  formState: ISpotterForm;
  handleTextChange: (name: string) => (text: string) => void;
};

export const SpotterFormMain: React.FC<TProps> = ({
  formState,
  handleTextChange,
}) => {
  const formTypes = [{
      value: "76",
      text: "Custom Float Spotter Report Form",
  },{
      value: "-1229",
      text: "Standard Float Spotter Report Form",
  }];

  const pmoc = [
    {
      value: "1",
      text: "No contact needed",
    },
    {
        value: "2",
        text: "Phone",
    },
    {
        value: "3",
        text: "Email",
    },
    // {
    //     value: "4",
    //     text: "Text",
    // },
    // {
    //     value: "5",
    //     text: "Facebook",
    // },
  ];

  return (
    <>
      <View>
        <View style={styles.inputStyleBigImp}>
          <Item floatingLabel>
            <Label style={styles.inputStyleSmall}>Contact Name *</Label>
            <Input
              value={formState.name}
              onChangeText={(text) =>
                handleTextChange('name')(text)
              }
            />
          </Item>
        </View>
        <Item style={styles.inputStyleBig} floatingLabel>
          <Label style={styles.inputStyleSmall}>Contact Email</Label>
          <Input
            value={formState.custrecord_mfa_fs_email}
            onChangeText={(text) =>
              handleTextChange('custrecord_mfa_fs_email')(text)
            }
          />
        </Item>
        <Item style={styles.inputStyleBig} floatingLabel>
          <Label style={styles.inputStyleSmall}>Contact phone number</Label>
          <Input
            value={formState.custrecord_mfa_fs_phone}
            onChangeText={(text) =>
              handleTextChange('custrecord_mfa_fs_phone')(text)
            }
          />
        </Item>
        <View style={styles.outerContainer}>
          <Text style={styles.androidText}>Preferred method of contact</Text>
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
                pmoc.map(
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
        <Textarea
          rowSpan={5}
          placeholder={'Approx number of float(s)'}
          bordered
          underline
          style={styles.textAreaStyles}
          value={formState.custrecord_mfa_fs_approx_no_floats}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_fs_approx_no_floats')(text)
          }
        />
        <Textarea
          rowSpan={5}
          placeholder={'Location of float(s)'}
          bordered
          underline
          style={styles.textAreaStyles}
          value={formState.custrecord_mfa_fs_location_of_floats}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_fs_location_of_floats')(text)
          }
        />
        <Textarea
          rowSpan={5}
          placeholder={'Fload ID\'s if possible'}
          bordered
          underline
          style={styles.textAreaStyles}
          value={formState.custrecord_mfa_fs_float_id}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_fs_float_id')(text)
          }
        />
        <Textarea
          rowSpan={5}
          placeholder={'Extra information'}
          bordered
          underline
          style={styles.textAreaStyles}
          value={formState.custrecord_mfa_fs_extra_info}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_fs_extra_info')(text)
          }
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
  formWrapper: {
    flex: 1,
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
  inputStyleBigImp: {
    borderWidth: 2,
    borderColor: primary,
    marginBottom: spacingBase * 2,
    padding: 1,
  },
  reportAuthor: {
    marginTop: spacingBase * 2,
  },
  outerContainer: {
    marginBottom: spacingBase,
  },
  androidText: {
    marginBottom: spacingBase,
  },
});
