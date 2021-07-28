import * as React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform,
} from 'react-native';
import {H2, H3, Input, Item, Label, Text, Textarea} from 'native-base';
import {primary, spacingBase} from '../../styles';
import {IDebrisForm} from '../../entities/general';
import {FarmModal} from '../FarmModal';
import MultiSelect from 'react-native-multiple-select';

type TProps = {
  formState: IDebrisForm;
  currentUser: string;
  handleTextChange: (name: string) => (text: string | any[]) => void;
  setCompany: (company: any) => void;
  setBay: (bay: any) => void;
  allBays: Array<any>;
  allCompanies: Array<any>;
  handleSearchChange: (type: string) => (text: string) => void;
  visible: {
    farm: boolean;
    bay: boolean;
    company: boolean;
  };
  toggleVisibleChange: (type: string) => void;
};
const items = [{
  id: '1',
  name: 'Spat'
}, {
  id: '2',
  name: 'Final'
}, {
  id: '3',
  name: 'Lashing'
}, {
  id: '4',
  name: 'Other'
}, {
  id: '5',
  name: 'Not Sure'
}];

export const DebrisReportMain: React.FC<TProps> = ({
  formState,
  currentUser,
  handleTextChange,
  setCompany,
  setBay,
  allCompanies,
  allBays,
  handleSearchChange,
  visible,
  toggleVisibleChange,
}) => {
  let multiSelect:any = React.useRef(null);
  return (
    <>
      <View>
        <Item
          style={styles.formWrapper}
          floatingLabel>
          <Label style={styles.inputStyleSmall}>Aquaculture debris (kg)</Label>
          <Input
            value={formState.custrecord_mfa_total_aq_debris}
            onChangeText={(text) =>
              handleTextChange('custrecord_mfa_total_aq_debris')(text)
            }
          />
        </Item>
        <View style={styles.pickerStylesContainer}>
          <MultiSelect
            items={items}
            uniqueKey="id"
            ref={(component) => { multiSelect = component }}
            onSelectedItemsChange={(selectedItems) => {
              handleTextChange('custrecord_mfa_rope_found')(selectedItems)
            }}
            selectedItems={formState.custrecord_mfa_rope_found}
            selectText="Rope Found *"
            styleInputGroup={{display: 'none'}}
            tagRemoveIconColor="#888"
            tagBorderColor="#888"
            tagTextColor="#888"
            selectedItemTextColor="#000"
            selectedItemIconColor="#000"
            styleDropdownMenuSubsection={{backgroundColor: '#f2f2f2'}}
            styleRowList={{height: 50, backgroundColor: '#f2f2f2', display: 'flex', justifyContent: 'center'}}
            styleMainWrapper={{marginTop: 5, marginBottom: 0, backgroundColor: '#f2f2f2'}}
            styleListContainer={{backgroundColor: '#f2f2f2'}}
            styleSelectorContainer={{marginBottom: 0}}
            itemTextColor="#888"
            displayKey="name"
            submitButtonColor={primary}
            submitButtonText="Select"
          />
        </View>
      </View>
      <View>
        <View style={styles.inputOuterWrapper}>
          <Item
            style={styles.formWrapper}
            floatingLabel>
            <Label style={styles.inputStyleSmall}>Other Debris (kg)</Label>
            <Input
              value={formState.custrecord_mfa_total_other_debris}
              onChangeText={(text) =>
                handleTextChange('custrecord_mfa_total_other_debris')(text)
              }
            />
          </Item>
        </View>
        <Textarea
          rowSpan={7}
          placeholder={'Notes'}
          bordered
          underline
          style={styles.textAreaStyles}
          value={formState.custrecord_mfa_debris_comment}
          onChangeText={(text) =>
            handleTextChange('custrecord_mfa_debris_comment')(text)
          }
        />
      </View>
      <View>
        <Text style={styles.interestField}>
          Please send in any photos of debris above, or your most interesting
          find for the MFA records and for use in upcoming newsletters.
        </Text>
      </View>
      <View>
        <H3 style={styles.secondaryTitle}>
          This form completed and submitted by
        </H3>
        <TouchableWithoutFeedback
          onPress={() => toggleVisibleChange('company')}>
          <View>
            {formState.custrecord_mfa_company_beach_clean.length !== 0 ? (
              <View>
                <Text>{formState.custrecord_mfa_company_beach_clean}</Text>
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
        <Text style={styles.reportAuthor}>
          <Text>Report author: </Text>
          <Text>{currentUser}</Text>
        </Text>
        <Item style={styles.inputStyleBig} floatingLabel>
          <Label style={styles.inputStyleSmall}>Contact Ph</Label>
          <Input
            value={formState.custrecord_mfa_contact_number}
            onChangeText={(text) =>
              handleTextChange('custrecord_mfa_contact_number')(text)
            }
          />
        </Item>
        <FarmModal
          handleSearchChange={handleSearchChange}
          allPoints={allBays}
          visible={visible.bay}
          setFarm={setBay}
          type={'bay'}
        />
        <FarmModal
          handleSearchChange={handleSearchChange}
          allPoints={allCompanies}
          visible={visible.company}
          setFarm={setCompany}
          type={'company'}
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
  pickerStylesContainer: {
    borderWidth: 2,
    marginBottom: spacingBase,
    borderColor: primary,
    paddingTop: 2,
    paddingBottom: 0,
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
});
