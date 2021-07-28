import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Item, Label, Textarea, Picker, Text} from 'native-base';
import {primary, spacingBase} from '../../styles';
import {IFeedbackForm} from '../../entities/general';

type TProps = {
  formState: IFeedbackForm;
  handleTextChange: (name: string) => (text: string) => void;
};

export const FeedbackFormMain: React.FC<TProps> = ({
  formState,
  handleTextChange,
}) => {
  const pmoc = [
    {
      value: "",
      text: "Select",
    },
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

  const feedbackType = [{
    value: "",
    text: "Select",
  },{
    value: "1",
    text: "Something positive",
  },{
    value: "2",
    text: "Noise",
  },{
    value: "3",
    text: "Debris",
  },{
    value: "4",
    text: "Speed",
  },{
    value: "10",
    text: "Non compliance",
  },{
    value: "11",
    text: "Farm Structures",
  },{
    value: "5",
    text: "Unsafe practise",
  },{
    value: "6",
    text: "Biosecurity",
  },{
    value: "7",
    text: "Hazardous Substance/Pollution",
  },{
    value: "8",
    text: "Emissions",
  },{
    value: "9",
    text: "Other",
  },{
    value: "12",
    text: "General",
  }];

  const locations= [{
    value: "",
    text: "Select",
  },{
    value: "1",
    text:"Port Underwood",
  },{
    value: "2",
    text:"Queen Charlotte Sound",
  },{
    value: "3",
    text:"Kenepuru Sound",
  },{
    value: "4",
    text:"Pelorus Sound",
  },{
    value: "5",
    text:"Croisilles Harbour",
  },{
    value: "6",
    text:"Golden Bay",
  },{
    value: "7",
    text:"Tasman Bay",
  },{
    value: "8",
    text:"Other",
  }];

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
            value={formState.custrecord_mfa_contact_email}
            onChangeText={(text) =>
              handleTextChange('custrecord_mfa_contact_email')(text)
            }
          />
        </Item>
        <Item style={styles.inputStyleBig} floatingLabel>
          <Label style={styles.inputStyleSmall}>Contact phone number</Label>
          <Input
            value={formState.custrecord_mfa_contact_phone}
            onChangeText={(text) =>
              handleTextChange('custrecord_mfa_contact_phone')(text)
            }
          />
        </Item>
        <View style={styles.outerContainer}>
          <Text style={styles.androidText}>Preferred method of contact</Text>
          <View style={styles.pickerStylesContainer}>
            <Picker
              mode="dropdown"
              style={styles.pickerStyles}
              selectedValue={formState.custrecord_mfa_preferred_contact }
              placeholderStyle={styles.pickerStylesPlaceholder}
              onValueChange={(label) => handleTextChange('custrecord_mfa_preferred_contact')(label)}
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
        <View style={styles.outerContainer}>
          <Text style={styles.androidText}>Feedback Type</Text>
          <View style={styles.pickerStylesContainer}>
            <Picker
              mode="dropdown"
              style={styles.pickerStyles}
              selectedValue={formState.custrecord_mfa_feedback_type}
              placeholderStyle={styles.pickerStylesPlaceholder}
              onValueChange={(label) => handleTextChange('custrecord_mfa_feedback_type')(label)}
              placeholder='Feedback Type'>
              {
                // @ts-ignore
                feedbackType.map(
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
        <View style={styles.outerContainer}>
          <Text style={styles.androidText}>Location for Feedback</Text>
          <View style={styles.pickerStylesContainer}>
            <Picker
              mode="dropdown"
              style={styles.pickerStyles}
              selectedValue={formState.custrecord_mfa_feedback_location}
              placeholderStyle={styles.pickerStylesPlaceholder}
              onValueChange={(label) => handleTextChange('custrecord_mfa_feedback_location')(label)}
              placeholder='Location for Feedback'>
              {
                // @ts-ignore
                locations.map(
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
          placeholder={'Extra details on location eg. specific location/bay'}
          bordered
          underline
          style={styles.textAreaStyles}
          value={formState.custrecord_mfa_extra_location_details}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_extra_location_details')(text)
          }
        />
        <Textarea
          rowSpan={5}
          placeholder={'Information regarding feedback'}
          bordered
          underline
          style={styles.textAreaStyles}
          value={formState.custrecord_mfa_extra_info_feedback}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_extra_info_feedback')(text)
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
