import * as React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Platform} from 'react-native';
import { Text, Select, useBreakpointValue, Box } from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {primary, spacingBase} from '../../styles';
import {UInput} from '../CustomInput';
import {UButton} from '../UButton';
import {
  validationForZeroMinus,
  toggleSecondMillisecond,
} from '../../helpers/form.helpers';
import { ISeedingForm, ILine, IFarm, IUtil } from '../../entities/general';
import { MainScreenNavigationProp} from '../../entities/general';
import {RootState} from '../../store/rootReducer';
import {saveForm, updateForm} from '../../store/effects/form.effects';
import {setEditForm} from '../../store/actions/form.actions';

type TProps = {
  navigation: MainScreenNavigationProp;
};

export const SeedingReport: React.FC<TProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const screenSize = useBreakpointValue({
    base: 'base',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  });

  const defaultSeeding: ISeedingForm = {
    farm_id: '',
    line_id: '',
    name: '',
    planned_date: '',
    planned_date_harvest: '',
    line_length: '',
    seed_id: '',
    drop: '',
    spat_size: '',
    submersion: '',
    spacing: '',
    density: '',
    floats: '',
    account_id: '',
  };

  const {editForm} = useSelector((state: RootState) => state.form);
  const farmData: Array<IFarm> = useSelector((state: RootState) => state.farm.allFarms);
  const utilData: Array<IUtil> = useSelector((state: RootState) => state.farm.allUtils);
  const {pendingForms} = useSelector((state: RootState) => state.form);

  const [lineData, setLineData] = React.useState<Array<ILine>>([]);

  const [seedTypes, setSeedTypes] = React.useState<Array<IUtil>>([]);
  const [dateType, setDateType] = React.useState('seed');
  const [seedDate, setSeedDate] = React.useState(new Date());
  const [pHarvestDate, setPHaverstDate] = React.useState(new Date());
  const [inactiveButton, setInactiveButton] = React.useState(true);
  const [seedExist, setSeedExist] = React.useState(false);
  const [datePickerShow, setDatePickerShow] = React.useState(false);
  const [formState, setFormState] = React.useState<ISeedingForm>(defaultSeeding);
  const [error, showError] = React.useState(false);

  React.useEffect(() => {
    const edForm = editForm as ISeedingForm;
    if (edForm) {
      setFormState(edForm);
      setSeedDate(new Date(Number(edForm.planned_date) * 1000));
      setPHaverstDate(new Date(Number(edForm.planned_date_harvest) * 1000));
      const curFarm: Array<IFarm> = farmData.filter((farm: any) => farm.id === edForm.farm_id);

      if (curFarm) {
        const lines = curFarm[0].lines ? curFarm[0].lines : [];
        setLineData(lines);
        setSeedTypes(utilData.filter(util => {
          return util.account_id === curFarm[0].acc_id && util.type === 'seedtype';
        }));
      }
    }
  }, []);

  React.useEffect(() => {
    if (
      formState.name === '' ||
      formState.line_length === '' ||
      formState.seed_id === '' ||
      formState.drop === '' ||
      formState.spat_size === '' ||
      formState.submersion === '' ||
      formState.spacing === '' ||
      formState.density === '' ||
      formState.floats === '' ||
      formState.account_id === ''
    ) {
      setInactiveButton(true);
    } else {
      setInactiveButton(false);
    }
  }, [formState]);

  const handleFormSubmit = async () => {
    if (inactiveButton || seedExist) {
      showError(true);
      return;
    }
    showError(false);
    const form = {
      ...formState,
      type: 'seeding',
      planned_date: `${toggleSecondMillisecond(seedDate.getTime())}`,
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
              setSeedTypes(utilData.filter(util => {
                return util.account_id === curFarm[0].acc_id && util.type === 'seedtype';
              }));
            }

            setSeedExist(false);

            return {
              ...prev,
              [isType]: value,
              'account_id': curFarm ? curFarm[0].acc_id : 0,
              'line_id': '',
            };
          }

          if (type === 'line_id') {
            const curLine = lineData.filter((line: any) => line.id === value);
            if (curLine[0].harvest_id) {
              setSeedExist(true);
            } else {
              setSeedExist(false);
            }

            const form = pendingForms.filter(form => form.type === 'seeding' && form.line_id === value);
            if (form.length) {
              setSeedExist(true);
            }

            return {
              ...prev,
              [isType]: value,
            };
          }

          if (
            type === 'line_length' ||
            type === 'drop' ||
            type === 'spat_size' ||
            type === 'submersion' ||
            type === 'spacing' ||
            type === 'density' ||
            type === 'floats'
          ) {
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
      {seedExist && <View style={{
        marginBottom: spacingBase * 4,
      }}>
        <Text style={{color: 'orange'}}>
          Seeding already exists on this line
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
          {(formState.farm_id === '' && error) && <Text style={{fontSize: 12, color: 'red'}}>
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
              style={styles.pickerStyles}
              selectedValue={formState.line_id}
              isDisabled={editForm !== null}
              onValueChange={(label) => handleTextChange('line_id')(label)}
              placeholder='Select Line'>
              {
                // @ts-ignore
                lineData.map(
                  ({line_name, id, harvest_id}, i: number) => {
                    return (
                      <Select.Item
                        label={`${line_name + (harvest_id ? ' ( Seeding already exists ) ' : '')}`}
                        value={id}
                        key={id}
                      />
                    );
                  },
                )
              }
            </Select>
          </View>
          {(formState.line_id === '' && error) && <Text style={{fontSize: 12, color: 'red'}}>
            This field is required
          </Text>}
        </View>
      </View>
      <View style={screenSize === 'base' ? {} : styles.inlineWrap}>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '100%'}
        ]}>
          <Box>
            <Text style={styles.inputStyleSmall}>
              Season Name *
            </Text>
            <UInput
              type="text"
              value={formState.name}
              onChange={(text) =>
                handleTextChange('name')(text)
              }
            />
            {(formState.name === '' && error) && <Text style={{fontSize: 12, color: 'red'}}>
              This field is required
            </Text>}
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
              Planned date seeded
            </Text>
            <TouchableWithoutFeedback onPress={() => {
              setDateType('seed');
              setDatePickerShow(true);
            }}>
              <Text style={styles.dateText}>{seedDate.toDateString()}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={() => {
          setDateType('pharvest');
          setDatePickerShow(true);
        }}>
          <View style={[
            styles.inputStyleBig,
            screenSize === 'base' ? {} : {width: '49%'}
          ]}>
            <View>
              <Text style={styles.inputStyleSmall}>
                Planned date harvested
              </Text>
              <Text style={styles.dateText}>{pHarvestDate.toDateString()}</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={screenSize === 'base' ? {} : styles.inlineWrap}>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '49%'}
        ]}>
          <Box>
            <Text style={styles.inputStyleSmall}>
              Line Length *
            </Text>
            <UInput
              type="numeric"
              value={formState.line_length}
              rightEl='m'
              onChange={(text) =>
                handleTextChange('line_length')(text)
              }
            />
            {(formState.line_length === '' && error) && <Text style={{fontSize: 12, color: 'red'}}>
              This field is required
            </Text>}
          </Box>
        </View>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '49%'}
        ]}>
          <Text style={styles.inputStyleSmall}>
            Seed Type *
          </Text>
          <View style={styles.pickerStylesContainer}>
            <Select
              style={styles.pickerStyles}
              selectedValue={formState.seed_id}
              // placeholderStyle={styles.pickerStylesPlaceholder}
              onValueChange={(label) => handleTextChange('seed_id')(label)}
              placeholder='seed type'>
              {
                // @ts-ignore
                seedTypes.map(
                  ({name, id}, i: number) => {
                    return (
                      <Select.Item
                        label={name}
                        value={id}
                        key={id}
                      />
                    );
                  },
                )
              }
            </Select>
          </View>
          {(formState.seed_id === '' && error) && <Text style={{fontSize: 12, color: 'red'}}>
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
              Drop *
            </Text>
            <UInput
              type="numeric"
              value={formState.drop}
              rightEl='m'
              onChange={(text) =>
                handleTextChange('drop')(text)
              }
            />
          </Box>
          {(formState.drop === '' && error) && <Text style={{fontSize: 12, color: 'red'}}>
              This field is required
            </Text>}
        </View>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '49%'}
        ]}>
          <Box>
            <Text style={styles.inputStyleSmall}>
              Spat Size *
            </Text>
            <UInput
              type="numeric"
              value={formState.spat_size}
              rightEl='mm'
              onChange={(text) =>
                handleTextChange('spat_size')(text)
              }
            />
            {(formState.spat_size === '' && error) && <Text style={{fontSize: 12, color: 'red'}}>
              This field is required
            </Text>}
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
              Submersion *
            </Text>
            <UInput
              type="numeric"
              value={formState.submersion}
              rightEl='m'
              onChange={(text) =>
                handleTextChange('submersion')(text)
              }
            />
          </Box>
          {(formState.submersion === '' && error) && <Text style={{fontSize: 12, color: 'red'}}>
              This field is required
            </Text>}
        </View>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '49%'}
        ]}>
          <Box>
            <Text style={styles.inputStyleSmall}>
              Spacing *
            </Text>
            <UInput
              type="numeric"
              value={formState.spacing}
              rightEl='mm'
              onChange={(text) =>
                handleTextChange('spacing')(text)
              }
            />
            {(formState.spacing === '' && error) && <Text style={{fontSize: 12, color: 'red'}}>
              This field is required
            </Text>}
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
              Density *
            </Text>
            <UInput
              type="numeric"
              value={formState.density}
              onChange={(text) =>
                handleTextChange('density')(text)
              }
            />
          </Box>
          {(formState.density === '' && error) && <Text style={{fontSize: 12, color: 'red'}}>
              This field is required
            </Text>}
        </View>
        <View style={[
          styles.inputStyleBig,
          screenSize === 'base' ? {} : {width: '49%'}
        ]}>
          <Box>
            <Text style={styles.inputStyleSmall}>
              Floats *
            </Text>
            <UInput
              type="numeric"
              value={formState.floats}
              onChange={(text) =>
                handleTextChange('floats')(text)
              }
            />
            {(formState.floats === '' && error) && <Text style={{fontSize: 12, color: 'red'}}>
              This field is required
            </Text>}
          </Box>
        </View>
      </View>
      <UButton
        onPress={() => handleFormSubmit()}
        disabled={seedExist}
        label={editForm ? 'Update' : 'Submit' }
        fullWidth
        isLoading={false}
        smallOutline={false}
      />
      {datePickerShow &&  <DateTimePicker
        testID="dateTimePicker"
        value={
          dateType === 'seed'
            ? seedDate
            : pHarvestDate
        }
        mode='date'
        is24Hour={true}
        display="default"
        onChange={(event: any, selectedDate: Date | undefined) => {
          setDatePickerShow(Platform.OS === 'ios' ? true : false);
          const currentDate = selectedDate || (
            dateType === 'seed' ? seedDate : pHarvestDate
          );
          if (dateType === 'seed')  {
            setSeedDate(currentDate);
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
