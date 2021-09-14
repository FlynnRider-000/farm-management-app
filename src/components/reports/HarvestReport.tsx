import * as React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback, Platform} from 'react-native';
import {Text, Heading, Box, useBreakpointValue, Select} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {Checkbox} from 'react-native-ui-lib';
import DateTimePicker from '@react-native-community/datetimepicker';
import {primary, spacingBase} from '../../styles';
import {UButton} from '../UButton';
import {UInput} from '../CustomInput';
import {CustomTextArea} from '../CustomTextArea';
import {validationForZeroMinus, toggleSecondMillisecond} from '../../helpers/form.helpers';
import {IHarvestForm, ILine, IFarm, IUtil} from '../../entities/general';
import {MainScreenNavigationProp} from '../../entities/general';
import {RootState} from '../../store/rootReducer';
import {saveForm} from '../../store/effects/form.effects';
import { startOfHour } from 'date-fns';
import { findLastIndex } from 'lodash';

type TProps = {
  navigation: MainScreenNavigationProp;
};

export const HarvestReport: React.FC<TProps> = ({navigation}) => {
  const dispatch = useDispatch();

  const screenSize = useBreakpointValue({
    base: 'base',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  });

  const defaultAssessment: IHarvestForm = {
    company: '',
    vessel: '',
    harvest_number: '',
    number_of_bags: '',
    tag_color: '',
    port_of_unload: '',
    crop_owner: '',
    farm_id: '',
    line_id: '',
    growing_area: '',
    delivered_to: '',
    packhouse: '',
    start_time: '',
    finish_time: '',
    date: '',
    bags_clean: false,
    area_open_for_harvest: false,
    trucks_booked: false,
    more_clean_bags_on_truck: false,
    shell_length: '',
    shell_condition: '',
    mussels: '',
    meat_yield: '',
    blues: '',
    marine_waste: '',
    backbone_ok: false,
    backbone_replace: false,
    lights_ids_in_place: false,
    flotation_on_farm: false,
    number_of_rope_bags: '',
    product_left_on_line: '',
    harvestor_name: '',
    signature: '',
    comments: '',
  };

  const farmData: Array<IFarm> = useSelector((state: RootState) => state.farm.allFarms);
  const {pendingForms} = useSelector((state: RootState) => state.form);

  const [formState, setFormState] = React.useState<IHarvestForm>(defaultAssessment);
  const [lineData, setLineData] = React.useState<Array<ILine>>([]);

  const [errorHandling, showErrorHandling] = React.useState(false);
  const [inactiveButton, setInactiveButton] = React.useState(true);
  const [datePickerShow, setDatePickerShow] = React.useState(false);
  const [harvestDate, setHarvestDate] = React.useState(new Date());
  const [timeType, setTimeType] = React.useState('');
  const [timePickerShow, setTimePickerShow] = React.useState(false);
  const [startDate, setStartDate] = React.useState(new Date());
  const [finishDate, setFinishDate] = React.useState(new Date());
  const [seedExist, setSeedExist] = React.useState(false);

  React.useEffect(() => {
    if (
      formState.company === '' ||
      formState.vessel === '' ||
      formState.harvest_number === '' ||
      formState.number_of_bags === '' ||
      formState.tag_color === '' ||
      formState.port_of_unload === '' ||
      formState.crop_owner === '' ||
      formState.farm_id === '' ||
      formState.line_id === '' ||
      formState.growing_area === '' ||
      formState.delivered_to === '' ||
      formState.packhouse === '' ||
      formState.shell_length === '' ||
      formState.shell_condition === '' ||
      formState.mussels === '' ||
      formState.meat_yield === '' ||
      formState.blues === '' ||
      formState.marine_waste === '' ||
      formState.number_of_rope_bags === '' ||
      formState.product_left_on_line === '' ||
      formState.harvestor_name === '' ||
      // formState.signature === '' ||
      formState.comments === ''
    ) {
      setInactiveButton(true);
    } else {
      setInactiveButton(false);
    }
  }, [formState]);

  const handleFormSubmit = () => {
    if (inactiveButton) {
      showErrorHandling(true);
      return;
    }
    showErrorHandling(false);
    const form = {
      ...formState,
      type: 'harvest',
      start_time: `${toggleSecondMillisecond(startDate.getTime())}`,
      finish_time: `${toggleSecondMillisecond(finishDate.getTime())}`,
      date: `${toggleSecondMillisecond(harvestDate.getTime())}`,
    }
    console.log(form);
    // dispatch(saveForm(form));
    // navigation.navigate('Main');
  };

  const handleTextChange = (name: string) => {
    const type = name;
    return (text: string | boolean) => {
      //@ts-ignore
      let value = isNaN(Number(text)) ? formState[`${name}`] : text;
      setFormState((prev: any) => {
        const isType: string | undefined = type;

        if (isType) {
          if (type === 'farm_id') {
            const curFarm: Array<IFarm> = farmData.filter((farm: any) => farm.id === value);

            if (curFarm) {
              setLineData(curFarm[0].lines ? curFarm[0].lines : []);
            }
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

            const form = pendingForms.filter(
              (el) => el.type === 'seeding' && el.line_id === value,
            );
            if (form.length) {
              setSeedExist(true);
            }

            return {
              ...prev,
              [isType]: value,
              'harvest_group_id': curLine ? curLine[0].harvest_id : 0,
            };
          }

          if (
            type === 'harvest_number' ||
            type === 'number_of_bags' ||
            type === 'shell_length' ||
            type === 'mussels' ||
            type === 'number_of_rope_bags'
          ) {
            const validValue = validationForZeroMinus(value);
            return { ...prev, [isType]: validValue };
          }

          if (type === 'meat_yield' || type === 'blues') {
            return {
              ...prev,
              [isType]: Number(value) > 100 ? '100' : `${Number(value)}`,
            };
          }

          value = text;
          return { ...prev, [isType]: value };
        }
        return { ...prev };
      });
    };
  };

  return (
    <>
      <View style={[
        styles.outerContainer,
        screenSize === 'base' 
        ? {
          width: 400
        } : {
          width: '70%',
          minWidth: 500
        }
      ]}>
        {formState.line_id !== '' && !seedExist && (
          <View
            style={{
              marginBottom: spacingBase * 4,
            }}>
            <Text style={{color: 'orange'}}>
              Harvest is not available on this line
            </Text>
          </View>
        )}
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Company</Text>
            <UInput
              type="text"
              value={formState.company}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('company')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Vessel</Text>
            <UInput
              type="text"
              value={formState.vessel}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('vessel')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Harvest Number</Text>
            <UInput
              type="numeric"
              value={formState.harvest_number}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('harvest_number')(text)
              }
            />
          </Box>
        </View>
      </View>
      <View style={[
        styles.outerContainer,
        screenSize === 'base' 
        ? {
          width: 400
        } : {
          width: '70%',
          minWidth: 500
        }
      ]}>
        <Heading size="md" style={{flex: 1, paddingBottom: spacingBase * 4}}>
          I declare that the following was harvested
        </Heading>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Number of Bags</Text>
            <UInput
              type="numeric"
              value={formState.number_of_bags}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('number_of_bags')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Tag Colour</Text>
            <UInput
              type="text"
              value={formState.tag_color}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('tag_color')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputSpacing}></View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Port of Unload</Text>
            <UInput
              type="text"
              value={formState.port_of_unload}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('port_of_unload')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Crop Owner</Text>
            <UInput
              type="text"
              value={formState.crop_owner}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('crop_owner')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Text style={styles.inputStyleSmall}>Accredited Farm</Text>
          <View style={styles.pickerStylesContainer}>
            <Select
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
          {(formState.farm_id === '' && errorHandling) && <Text style={{fontSize: 12, color: 'red'}}>
            This field is required
          </Text>}
        </View>
        <View style={styles.inputStyleBig}>
          <Text style={styles.inputStyleSmall}>Line</Text>
          <View style={styles.pickerStylesContainer}>
            <Select
              style={styles.pickerStyles}
              selectedValue={formState.line_id}
              onValueChange={(label) => handleTextChange('line_id')(label)}
              placeholder='Select Line'>
              {
                // @ts-ignore
                lineData.map(
                  ({line_name, id, harvest_id}, i: number) => {
                    return (
                      <Select.Item
                        label={line_name}
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
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Growing Area</Text>
            <UInput
              type="text"
              value={formState.growing_area}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('growing_area')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputSpacing}></View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Delivered To</Text>
            <UInput
              type="text"
              value={formState.delivered_to}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('delivered_to')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Packhouse</Text>
            <UInput
              type="text"
              value={formState.packhouse}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('packhouse')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputSpacing}></View>
        <View style={styles.inputStyleBig}>
          <View>
            <Text style={styles.inputStyleSmall}> Start Time </Text>
            <TouchableWithoutFeedback onPress={() => {
              setTimeType('start');
              setTimePickerShow(true);
            }}>
              <Text style={styles.dateText}>
                {`${startDate.getHours()} : ${startDate.getMinutes()}`}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.inputStyleBig}>
          <View>
            <Text style={styles.inputStyleSmall}> End Time </Text>
            <TouchableWithoutFeedback onPress={() => {
              setTimeType('end');
              setTimePickerShow(true);
            }}>
              <Text style={styles.dateText}>
                {`${finishDate.getHours()} : ${finishDate.getMinutes()}`}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={styles.inputStyleBig}>
          <View>
            <Text style={styles.inputStyleSmall}>
              Date
            </Text>
            <TouchableWithoutFeedback onPress={() => {
              setDatePickerShow(true);
            }}>
              <Text style={styles.dateText}>{harvestDate.toDateString()}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
      <View style={[
        styles.outerContainer,
        screenSize === 'base' 
        ? {
          width: 400
        } : {
          width: '70%',
          minWidth: 500
        }
      ]}>
        <Heading size="md" style={{flex: 1, paddingBottom: spacingBase * 4}}>
          Harvest Check List
        </Heading>
        <Box style={styles.inlineContainer}>
          <Text style={styles.inputStyleSmall}>Company</Text>
          <Checkbox
            value={formState.bags_clean}
            onValueChange={value => handleTextChange('bags_clean')(value)}
          />
        </Box>
        <Box style={styles.inlineContainer}>
          <Text style={styles.inputStyleSmall}>Area Open For Harvest</Text>
          <Checkbox
            value={formState.area_open_for_harvest}
            onValueChange={value => handleTextChange('area_open_for_harvest')(value)}
          />
        </Box>
        <Box style={styles.inlineContainer}>
          <Text style={styles.inputStyleSmall}>Trucks Booked</Text>
          <Checkbox
            value={formState.trucks_booked}
            onValueChange={value => handleTextChange('trucks_booked')(value)}
          />
        </Box>
        <Box style={styles.inlineContainer}>
          <Text style={styles.inputStyleSmall}>More Clean Bags On Truck</Text>
          <Checkbox
            value={formState.more_clean_bags_on_truck}
            onValueChange={value => handleTextChange('more_clean_bags_on_truck')(value)}
          />
        </Box>
      </View>
      <View style={[
        styles.outerContainer,
        screenSize === 'base' 
        ? {
          width: 400
        } : {
          width: '70%',
          minWidth: 500
        }
      ]}>
        <Heading size="md" style={{flex: 1, paddingBottom: spacingBase * 4}}>
          Crop Details
        </Heading>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Shell Length</Text>
            <UInput
              type="numeric"
              value={formState.shell_length}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('shell_length')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Shell Condition</Text>
            <UInput
              type="text"
              value={formState.shell_condition}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('shell_condition')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Mussels</Text>
            <UInput
              type="numeric"
              value={formState.mussels}
              requiredChecking={errorHandling}
              rightEl='per kg'
              onChange={(text) =>
                handleTextChange('mussels')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Meat Yield</Text>
            <UInput
              type="numeric"
              value={formState.meat_yield}
              requiredChecking={errorHandling}
              rightEl='%'
              onChange={(text) =>
                handleTextChange('meat_yield')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Blues</Text>
            <UInput
              type="numeric"
              value={formState.blues}
              requiredChecking={errorHandling}
              rightEl='%'
              onChange={(text) =>
                handleTextChange('blues')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Marine Waste</Text>
            <UInput
              type="text"
              value={formState.marine_waste}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('marine_waste')(text)
              }
            />
          </Box>
        </View>
        <Box style={styles.inputSpacing}></Box>
        <Box style={styles.inlineContainer}>
          <Text style={styles.inputStyleSmall}>Backbone Ok</Text>
          <Checkbox
            value={formState.backbone_ok}
            onValueChange={value => handleTextChange('backbone_ok')(value)}
          />
        </Box>
        <Box style={styles.inlineContainer}>
          <Text style={styles.inputStyleSmall}>Backbone Replace</Text>
          <Checkbox
            value={formState.backbone_replace}
            onValueChange={value => handleTextChange('backbone_replace')(value)}
          />
        </Box>
        <Box style={styles.inlineContainer}>
          <Text style={styles.inputStyleSmall}>Lights and Ids in Place</Text>
          <Checkbox
            value={formState.lights_ids_in_place}
            onValueChange={value => handleTextChange('lights_ids_in_place')(value)}
          />
        </Box>
        <Box style={styles.inlineContainer}>
          <Text style={styles.inputStyleSmall}>Floataion on Farm</Text>
          <Checkbox
            value={formState.flotation_on_farm}
            onValueChange={value => handleTextChange('flotation_on_farm')(value)}
          />
        </Box>
        <View style={styles.inputSpacing}></View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Number Of Rope Bags</Text>
            <UInput
              type="numeric"
              value={formState.number_of_rope_bags}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('number_of_rope_bags')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Product Left on Line</Text>
            <UInput
              type="text"
              value={formState.product_left_on_line}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('product_left_on_line')(text)
              }
            />
          </Box>
        </View>
      </View>
      <View style={[
        styles.outerContainer,
        screenSize === 'base' 
        ? {
          width: 400
        } : {
          width: '70%',
          minWidth: 500
        }
      ]}>
        <Text style={styles.note}>
          These bivalve molluscan shellfish have been harvested and handled in accordance with the requirements of the Regulated Control Scheme Animal Products (Specifications for Bivalve Molluscan Shellfish) Notice August 2018.
        </Text>
      </View>
      <View style={[
        styles.outerContainer,
        screenSize === 'base' 
        ? {
          width: 400
        } : {
          width: '70%',
          minWidth: 500
        }
      ]}>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Name</Text>
            <UInput
              type="text"
              value={formState.harvestor_name}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('harvestor_name')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <Box>
            <Text style={styles.inputStyleSmall}>Signature</Text>
            <UInput
              type="numeric"
              value={formState.harvestor_name}
              requiredChecking={errorHandling}
              onChange={(text) =>
                handleTextChange('harvestor_name')(text)
              }
            />
          </Box>
        </View>
        <View style={styles.inputStyleBig}>
          <View>
            <Text style={styles.inputStyleSmall}>Comment</Text>
            <CustomTextArea
              height={150}
              value={formState.comments}
              onChange={(text) =>
                handleTextChange('comments')(text)
              }
            />
          </View>
        </View>
        <UButton
          onPress={() => handleFormSubmit()}
          disabled={!seedExist}
          label="Submit"
          smallOutline={false}
          isLoading={false}
          fullWidth
        />
        {datePickerShow && (
          <DateTimePicker
            testID="dateTimePicker"
            value={harvestDate}
            mode='date'
            is24Hour={true}
            display="default"
            onChange={(event: any, selectedDate: Date | undefined) => {
              setDatePickerShow(Platform.OS === 'ios' ? true : false);
              const currentDate = selectedDate || harvestDate;
              setHarvestDate(currentDate);
            }}
          />
        )}
        {timePickerShow && (
          <DateTimePicker
            testID="dateTimePicker1"
            value={new Date()}
            mode='time'
            is24Hour={true}
            display="default"
            onChange={(event: any, selectedDate: Date | undefined) => {
              setTimePickerShow(Platform.OS === 'ios' ? true : false);
              const currentDate = selectedDate || (
                timeType === 'start' ? startDate : finishDate
              );
              if (timeType === 'start')  {
                setStartDate(currentDate);
              } else {
                setFinishDate(currentDate);
              }
            }}
          />
        )}
      </View>
    </>
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
  note: {
    fontSize: spacingBase + 3,
    lineHeight: spacingBase * 2.5,
  },
  inputStyleSmall: {
    fontSize: spacingBase + 2,
    textTransform: 'uppercase',
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
    width: 400,
    backgroundColor: 'white',
    padding: spacingBase * 2,
    alignSelf: 'center',
    borderRadius: spacingBase * 1.5,
  },
  inlineContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacingBase * 2,
  },
  androidText: {
    marginBottom: spacingBase,
  },
  pickerStylesContainer: {
    marginTop: spacingBase * 2,
  },
  pickerStylesPlaceholder: {fontSize: 12},
  pickerStyles: {width: '100%', backgroundColor: 'white'},
  noteStyles: {
    fontSize: spacingBase + 2,
    textDecorationLine: 'underline',
    marginTop: spacingBase,
    marginBottom: spacingBase * 2,
  },
  inputSpacing: {
    marginBottom: spacingBase * 4,
  }
});
