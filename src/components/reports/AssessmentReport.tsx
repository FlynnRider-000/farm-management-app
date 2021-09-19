import * as React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Platform} from 'react-native';
import { Text, Select, useBreakpointValue, Box } from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {primary, spacingBase} from '../../styles';
import {UInput} from '../CustomInput';
import {CustomTextArea} from '../CustomTextArea';
import {UButton} from '../UButton';
import {Gallery} from '../gallery/Gallery';
import {
  validationForMinus,
  validationForZeroMinus,
  toggleSecondMillisecond,
} from '../../helpers/form.helpers';
import { IAssessmentForm, ILine, IFarm, IUtil } from '../../entities/general';
import { MainScreenNavigationProp} from '../../entities/general';
import {RootState} from '../../store/rootReducer';
import {saveForm, updateForm} from '../../store/effects/form.effects';
import {setEditForm} from '../../store/actions/form.actions';

type TProps = {
  navigation: MainScreenNavigationProp;
};

export const AssessmentReport: React.FC<TProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const screenSize = useBreakpointValue({
    base: 'base',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  });

  const defaultAssessment: IAssessmentForm = {
    farm_id: '',
    account_id: '',
    blues: '',
    color: '',
    comment: '',
    condition_avg: '',
    condition_max: '',
    condition_min: '',
    condition_score: '',
    date_assessment: '',
    harvest_group_id: '',
    line_id: '',
    planned_date_harvest: '',
    tones: '',
  };

  const {editForm} = useSelector((state: RootState) => state.form);
  const farmData: Array<IFarm> = useSelector((state: RootState) => state.farm.allFarms);
  const utilData: Array<IUtil> = useSelector((state: RootState) => state.farm.allUtils);
  const {pendingForms} = useSelector((state: RootState) => state.form);
  const pendingSeedings = pendingForms.filter(form => form.type === 'seeding');

  const [lineData, setLineData] = React.useState<Array<ILine>>([]);
  const [prevAssess, setPrevAssess] = React.useState<IAssessmentForm>(defaultAssessment);
  const [colors, setColors] = React.useState<Array<IUtil>>([]);
  const [dateType, setDateType] = React.useState('assess');
  const [assessDate, setAssessDate] = React.useState(new Date());
  const [pHarvestDate, setPHaverstDate] = React.useState(new Date());
  const [inactiveButton, setInactiveButton] = React.useState(true);
  const [datePickerShow, setDatePickerShow] = React.useState(false);
  const [formState, setFormState] = React.useState<IAssessmentForm>(defaultAssessment);
  const [newSeedingRequired, setNewSeedingRequired] = React.useState(false);
  const [errorHandling, showErrorHandling] = React.useState(false);

  React.useEffect(() => {
    const edForm = editForm as IAssessmentForm;
    if (edForm) {
      setFormState(edForm);
      setAssessDate(new Date(Number(edForm.date_assessment) * 1000));
      setPHaverstDate(new Date(Number(edForm.planned_date_harvest) * 1000));
      const curFarm: Array<IFarm> = farmData.filter((farm: any) => farm.id === edForm.farm_id);

      if (curFarm) {
        const lines = curFarm[0].lines ? curFarm[0].lines : [];
        setLineData(lines);
        setColors(utilData.filter(util => {
          return util.account_id === curFarm[0].acc_id && util.type === 'color';
        }));

        const curLine = lines.filter((line: any) => line.id === edForm.line_id);
        if (curLine[0].last_assess) {
          setPrevAssess(curLine[0].last_assess as IAssessmentForm);
          setNewSeedingRequired(false);
        } else {
          if (curLine[0].status !== 'empty') {
            setNewSeedingRequired(false);
          } else {
            setNewSeedingRequired(true);
          }
          setPrevAssess(defaultAssessment);
        }
      }
    }
  }, []);

  React.useEffect(() => {
    if (
      formState.farm_id === '' ||
      formState.line_id === '' ||
      formState.harvest_group_id === '' ||
      formState.account_id === '' ||
      formState.color === '' ||
      formState.condition_avg === '' ||
      formState.condition_max === '' ||
      formState.condition_min === '' ||
      formState.condition_score === '' ||
      formState.blues === '' ||
      formState.tones === ''
    ) {
      setInactiveButton(true);
    } else {
      setInactiveButton(false);
    }
  }, [formState]);

  const handleFormSubmit = async () => {
    if (inactiveButton) {
      showErrorHandling(true);
      return;
    }
    showErrorHandling(false);
    const form = {
      ...formState,
      type: 'assessment',
      date_assessment: `${toggleSecondMillisecond(assessDate.getTime())}`,
      planned_date_harvest: `${toggleSecondMillisecond(Number(pHarvestDate.getTime()))}`,
    }
    if (editForm) {
      await dispatch(updateForm(editForm, form));
      await dispatch(setEditForm(null));
    } else {
      await dispatch(saveForm(form));
    }
    navigation.navigate('Main');
  };

  const handleTextChange = (name: string) => {
    const type = name;
    return (text: string) => {
      //@ts-ignore
      let value = isNaN(Number(text)) ? formState[`${name}`] : text;
      setFormState((prev: any) => {
        const isType: string | undefined = type;

        if (isType) {
          if (type === 'farm_id') {
            const curFarm: Array<IFarm> = farmData.filter((farm: any) => farm.id === value);

            if (curFarm) {
              setLineData(curFarm[0].lines ? curFarm[0].lines : []);
              setColors(utilData.filter(util => {
                return util.account_id === curFarm[0].acc_id && util.type === 'color';
              }));
            }
            setPrevAssess(defaultAssessment);
            setNewSeedingRequired(false);
            return {
              ...prev,
              [isType]: value,
              'account_id': curFarm ? curFarm[0].acc_id : 0,
              'line_id': '',
            };
          }

          if (type === 'line_id') {
            const curLine = lineData.filter((line: any) => line.id === value);
            let harvest_id = curLine ? curLine[0].harvest_id : '0';
            setPrevAssess(defaultAssessment);
            if (curLine[0].last_assess) {
              setPrevAssess(curLine[0].last_assess as IAssessmentForm);
              setNewSeedingRequired(false);
            } else {
              if (curLine[0].status !== 'empty') {
                setNewSeedingRequired(false);
                harvest_id = '-1';
              } else {
                setNewSeedingRequired(true);
              }
            }

            return {
              ...prev,
              [isType]: value,
              'harvest_group_id': harvest_id,
            };
          }

          if (type === 'condition_score') {
            return {
              ...prev,
              [isType]: Number(value) > 100 ? '100' : `${Number(value)}`,
            };
          }

          if (type === 'condition_min') {
            const validValue = validationForZeroMinus(value);
            const conditionAverage = Math.round(
              (Number(formState.condition_max) + Number(validValue)) / 2,
            );
            return { ...prev, [isType]: validValue, condition_avg: `${conditionAverage}` };
          }

          if (type === 'condition_max') {
            const validValue = validationForZeroMinus(value);

            const conditionAverage = Math.round(
              (Number(formState.condition_min) + Number(validValue)) / 2,
            );
            return { ...prev, [isType]: validValue, condition_avg: `${conditionAverage}` };
          }

          if (type === 'condition_avg') {
            const validValue = validationForZeroMinus(value);

            return { ...prev, [isType]: validValue};
          }

          if (type === 'blues') {
            const validValue = validationForMinus(value);

            return { ...prev, [isType]: validValue };
          }

          if (type === 'tones') {
            const validValue = validationForZeroMinus(value);
            return { ...prev, [isType]: validValue };
          }

          value = text;
          return { ...prev, [isType]: value };
        }
        return { ...prev };
      });
    };
  };

  return (
    <View style={[
      styles.outerContainer,
      screenSize === 'base' 
        ? {
          width: 400
        } : {
          width: '75%',
          minWidth: 500
        }
    ]}>
      {newSeedingRequired && editForm === null && <View style={{
        marginBottom: spacingBase * 4,
      }}>
        <Text style={{color: 'orange'}}>
          Go to home screen and add new seeding for this line
        </Text>
      </View>}
      <View style={screenSize === 'base' ? {} : styles.inlineWrap}>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : { width: '49%' }
        ]}>
          <Text style={styles.inputStyleSmall}>Select Farm *</Text>
          <View style={styles.pickerStylesContainer}>
            <Select
              isDisabled={editForm !== null}
              style={styles.pickerStyles}
              selectedValue={formState.farm_id}
              onValueChange={(label) => handleTextChange('farm_id')(label)}
              placeholder='Select Farm'>
              {
                // @ts-ignore
                farmData.map(
                  ({name, number, id}, i: number) => {
                    return (
                      <Select.Item
                        label={`${name} ( ${number} )`}
                        value={id}
                        key={id}
                      />
                    );
                  },
                )
              }
            </Select>
          </View>
          {(prevAssess.farm_id !== '') && <View>
            <Text style={{
              fontSize: 12,
            }}>
              {`Last Assessment Date: ${prevAssess.date_assessment ? moment.unix(Number(prevAssess.date_assessment)).format("YYYY/MM/DD") : ''}`}
            </Text>
          </View>}
          {(formState.farm_id === '' && errorHandling) && <Text style={{fontSize: 12, color: 'red'}}>
            This field is required
          </Text>}
        </View>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : { width: '49%' }
        ]}>
          <Text style={styles.inputStyleSmall}>Select Line *</Text>
          <View style={styles.pickerStylesContainer}>
            <Select
              isDisabled={editForm !== null}
              style={styles.pickerStyles}
              selectedValue={formState.line_id}
              onValueChange={(label) => handleTextChange('line_id')(label)}
              placeholder='Select Line'>
              {
                // @ts-ignore
                lineData.map(
                  ({line_name, id, harvest_id}, i: number) => {
                    let lineName = '';
                    if (harvest_id) {
                      lineName = line_name;
                    } else {
                      const seedExist = pendingSeedings.filter(seed => seed.line_id === id);
                      if (seedExist.length) {
                        lineName = line_name;
                      } else {
                        lineName = line_name + ' ( Assessment not available ) ';
                      }
                    }
                    
                    return (
                      <Select.Item
                        label={lineName}
                        value={id}
                        key={id}
                      />
                    );
                  },
                )
              }
            </Select>
          </View>
          {(formState.line_id === '' && errorHandling) && <Text style={{fontSize: 12, color: 'red'}}>
            This field is required
          </Text>}
        </View>
      </View>
      <View style={screenSize === 'base' ? {} : styles.inlineWrap}>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '31%'}
        ]}>
          <Box>
            <Text style={styles.inputStyleSmall}>
              Condition Min *
              <Text style={[styles.inputStyleSmall, styles.blueFont]}>
                {` ${prevAssess.condition_min}`}
              </Text>
            </Text>
            <UInput
              type="numeric"
              value={formState.condition_min}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('condition_min')(text)
              }
            />
          </Box>
        </View>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '31%'}
        ]}>
          <Box>
            <Text style={styles.inputStyleSmall}>
              Condition Max *
              <Text style={[styles.inputStyleSmall, styles.blueFont]}>
                {` ${prevAssess.condition_max}`}
              </Text>
            </Text>
            <UInput
              type="numeric"
              value={formState.condition_max}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('condition_max')(text)
              }
            />
          </Box>
        </View>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '31%'}
        ]}>
          <Box>
            <Text style={styles.inputStyleSmall}>
              Condition Average *
              <Text style={[styles.inputStyleSmall, styles.blueFont]}>
                {` ${prevAssess.condition_avg}`}
              </Text>
            </Text>
            <UInput
              type="numeric"
              value={formState.condition_avg}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('condition_avg')(text)
              }
            />
          </Box>
        </View>
      </View>
      <View style={screenSize === 'base' ? {} : styles.inlineWrap}>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '49%'}
        ]}>
          <Box>
            <Text style={styles.inputStyleSmall}>
              Condition Score *
              <Text style={[styles.inputStyleSmall, styles.blueFont]}>
                {` ${prevAssess.condition_score}`}
              </Text>
            </Text>
            <UInput
              type="numeric"
              value={formState.condition_score}
              requiredChecking={errorHandling}
              rightEl='%'
              onChange={(text) =>
                handleTextChange('condition_score')(text)
              }
            />
          </Box>
        </View>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '49%'}
        ]}>
          <Text style={styles.inputStyleSmall}>
            Color *
            <Text style={[styles.inputStyleSmall, styles.blueFont]}>
                {` ${prevAssess.color}`}
              </Text>
          </Text>
          <View style={styles.pickerStylesContainer}>
            <Select
              style={styles.pickerStyles}
              selectedValue={formState.color}
              // placeholderStyle={styles.pickerStylesPlaceholder}
              onValueChange={(label) => handleTextChange('color')(label)}
              placeholder='Color'>
              {
                // @ts-ignore
                colors.map(
                  ({name, id}, i: number) => {
                    return (
                      <Select.Item
                        label={name}
                        value={name}
                        key={id}
                      />
                    );
                  },
                )
              }
            </Select>
          </View>
          {(formState.color === '' && errorHandling) && <Text style={{fontSize: 12, color: 'red'}}>
            This field is required
          </Text>}
        </View>
      </View>
      <View style={screenSize === 'base' ? {} : styles.inlineWrap}>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '49%'}
        ]}>
          <Box>
            <Text style={styles.inputStyleSmall}>
              Blues *
              <Text style={[styles.inputStyleSmall, styles.blueFont]}>
                {` ${prevAssess.blues}`}
              </Text>
            </Text>
            <UInput
              type="numeric"
              value={formState.blues}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('blues')(text)
              }
            />
          </Box>
        </View>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '49%'}
        ]}>
          <Box>
            <Text style={styles.inputStyleSmall}>
              Tonnes *
              <Text style={[styles.inputStyleSmall, styles.blueFont]}>
                {` ${prevAssess.tones}`}
              </Text>
            </Text>
            <UInput
              type="numeric"
              value={formState.tones}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('tones')(text)
              }
            />
          </Box>
        </View>
      </View>
      <View style={screenSize === 'base' ? {} : styles.inlineWrap}>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '49%'}
        ]}>
          <View>
            <Text style={styles.inputStyleSmall}>
              Assessment Date
              <Text style={[styles.inputStyleSmall, styles.blueFont]}>
                {` ${prevAssess.date_assessment ? moment.unix(Number(prevAssess.date_assessment)).format("YYYY/MM/DD") : ''}`}
              </Text>
            </Text>
            <TouchableWithoutFeedback onPress={() => {
              setDateType('assess');
              setDatePickerShow(true);
            }}>
              <Text style={styles.dateText}>{assessDate.toDateString()}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '49%'}
        ]}>
          <View>
            <Text style={styles.inputStyleSmall}>
              Planned Harvest Date
              <Text style={[styles.inputStyleSmall, styles.blueFont]}>
                {` ${prevAssess.planned_date_harvest ? moment.unix(Number(prevAssess.planned_date_harvest)).format("YYYY/MM/DD") : ''}`}
              </Text>
            </Text>
            <TouchableWithoutFeedback onPress={() => {
              setDateType('pharvest');
              setDatePickerShow(true);
            }}>
              <Text style={styles.dateText}>{pHarvestDate.toDateString()}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View style={styles.inputStyleBig}>
        <View>
          <Text style={styles.inputStyleSmall}>Comment</Text>
          <CustomTextArea
            height={150}
            value={formState.comment}
            onChange={(text) =>
              handleTextChange('comment')(text)
            }
          />
        </View>
      </View>
      <View style={styles.inputStyleBig}>
        <View>
          <Text style={[
            styles.inputStyleSmall,
            { paddingBottom: spacingBase * 2}
          ]}>Images</Text>
          <Gallery
            images={[]}
          />
        </View>
      </View>
      <UButton
        onPress={() => handleFormSubmit()}
        disabled={newSeedingRequired && editForm === null}
        label={editForm ? 'Update' : 'Submit' }
        fullWidth
        isLoading={false}
        smallOutline={false}
      />
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
        onChange={(event: any, selectedDate: Date | undefined) => {
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
  inlineWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  blueFont: {
    color: primary,
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
    borderColor: '#F5F7F9',
    borderWidth: 1,
    backgroundColor: '#FAFBFC',
    paddingHorizontal: spacingBase * 2,
    paddingVertical: spacingBase * 1.5,
    borderRadius: spacingBase * 0.5,
    marginVertical: spacingBase * 2,
  },
  inputStyleSmall: {
    fontSize: spacingBase + 2,
  },
  textAreaStyles: {
    marginBottom: spacingBase,
    borderColor: 'yellow',
  },
  inputStyleBig: {
    marginBottom: spacingBase * 2,
  },
  outerContainer: {
    marginVertical: spacingBase * 2,
    width: 500,
    backgroundColor: 'white',
    padding: spacingBase * 2,
    alignSelf: 'center',
    borderRadius: spacingBase * 1.5,
  },
  androidText: {
    marginBottom: spacingBase,
  },
  pickerStylesContainer: {
    marginTop: spacingBase,
  },
  pickerStylesPlaceholder: {fontSize: 12},
  pickerStyles: {width: '100%', backgroundColor: 'white'},
  noteStyles: {
    fontSize: spacingBase + 2,
    textDecorationLine: 'underline',
    marginTop: spacingBase,
    marginBottom: spacingBase * 2,
  },
});
