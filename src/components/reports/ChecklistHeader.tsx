import * as React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Text} from 'native-base';
import {primary, spacingBase} from '../../styles';
import {GeneralFormType, IFarm} from '../../entities/general';
import {FarmModal} from '../index';

type TProps = {
  name: string | undefined;
  date: string;
  state: GeneralFormType;
  handleSearchChange: (type: string) => (text: string) => void;
  toggleVisibleChange: (type: string) => void;
  setFarm: (farm: IFarm) => void;
  currentForm: string | null;
  allPoints: Array<IFarm>;
  visible: string;
};

export const ChecklistHeader: React.FC<TProps> = ({
  name,
  date,
  state,
  currentForm,
  allPoints,
  handleSearchChange,
  toggleVisibleChange,
  visible,
  setFarm,
}) => {
  return (
    <>
      <View style={styles.authorContainer}>
        <View>
          <Text>Date</Text>
          <Text>{date}</Text>
        </View>
        <View>
          <Text>Checked by</Text>
          <Text>{name}</Text>
        </View>
      </View>
      <View style={styles.titleContainer}>
        {currentForm === 'compliant' && (
          <View>
            <TouchableWithoutFeedback onPress={() => toggleVisibleChange('vessel')}>
              <View>
                {state['Vessel Name']?.text.length !== 0 ? (
                  <View>
                    <Text>{state['Vessel Name']?.text}</Text>
                    <Text style={styles.noteStyles}>
                      Note*: Click to change Vessel Name
                    </Text>
                  </View>
                ) : (
                  <View style={styles.textStyles}>
                    <Text>Click to choose Vessel*</Text>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => toggleVisibleChange('company')}>
              <View>
                {state['Audit Company']?.text.length !== 0 ? (
                  <View>
                    <Text>{state['Audit Company']?.text}</Text>
                    <Text style={styles.noteStyles}>
                      Note*: Click to change Audit Company
                    </Text>
                  </View>
                ) : (
                  <View style={styles.textStyles}>
                    <Text>Click to choose Audit Company*</Text>
                  </View>
                )}
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
        {currentForm === 'checklist' && (
          <TouchableWithoutFeedback onPress={() => toggleVisibleChange('farm')}>
            <View>
              {state['Farm (Site Number / I.D.)']?.text.length !== 0 ? (
                <View>
                  <Text>{state['Farm (Site Number / I.D.)']?.text}</Text>
                  <Text style={styles.noteStyles}>
                    Note*: Click to change Farm (Site Number/I.D)
                  </Text>
                </View>
              ) : (
                <View style={styles.textStyles}>
                  <Text>Click to choose Farm*</Text>
                </View>
              )}
            </View>
          </TouchableWithoutFeedback>
        )}
        <FarmModal
          handleSearchChange={handleSearchChange}
          allPoints={allPoints}
          visible={visible !== ''}
          setFarm={setFarm}
          type={visible}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginBottom: spacingBase * 2,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacingBase * 2,
  },
  formInputContainerStyles: {
    flex: 2,
    marginLeft: 0,
    paddingHorizontal: 0,
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
});
