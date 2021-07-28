import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {ChecklistHeader} from './ChecklistHeader';
import {filterPoints, getNetSuiteDateFormat} from '../../helpers/general.gelpers';
import {saveForm} from '../../store/effects/form.effects';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store/rootReducer';
import {checklist, compliantForm} from '../../mock/mockData';
import {
  GeneralFormType,
  IFarm,
  MainScreenNavigationProp,
} from '../../entities/general';
import {ChecklistForm} from './ChecklistForm';
import {primary, spacingBase} from '../../styles';
import {Button, H2, H3, Text, Textarea} from 'native-base';
import {IList} from '../../entities/form.entities';
import {
  editComplianceForm,
  editSendingChecklistForm,
  editSendingComplianceForm,
} from '../../helpers/form.helpers';

type TProps = {
  navigation: MainScreenNavigationProp;
};

export const ChecklistReport: React.FC<TProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const [date] = React.useState(new Date().toLocaleString());
  const {currentUser} = useSelector((state: RootState) => state.user);
  const {currentForm} = useSelector((state: RootState) => state.form);
  const {allFarms, allVessels, allCompanies} = useSelector((state: RootState) => state.farm);
  const [formState, setFormState] = React.useState<GeneralFormType>(
    currentForm === 'compliant' ? compliantForm : checklist,
  );
  const [filteredPoints, setFilteredPoints] = React.useState<Array<IFarm>>(
    currentForm === 'compliant' ? allVessels : allFarms,
  );
  const [filteredCompanies, setFilteredCompanies] = React.useState<Array<IFarm>>(allCompanies,); 
  const [visible, setVisible] = React.useState('');
  const [inactiveButton, setInactiveButton] = React.useState(true);

  React.useEffect(() => {
    if (currentForm === 'compliant') {
        return formState['Vessel Name']?.text.length === 0 || formState['Audit Company']?.text.length === 0
          ? setInactiveButton(true)
          : setInactiveButton(false);
    }
    return formState['Farm (Site Number / I.D.)']?.text.length === 0
      ? setInactiveButton(true)
      : setInactiveButton(false);
  }, [formState]);

  const handleFormChange = (name: keyof GeneralFormType) => {
    return (text: string): void => {
      setFormState({
        ...formState,
        [name]: {
          ...formState[name],
          text: text,
        },
      });
    };
  };

  const handleSearchChange = (type: string) => {
    return (text: string) => {
      if (type === 'company') {
        setFilteredCompanies(filterPoints(allCompanies, text));
      }
      else {
        setFilteredPoints(
          filterPoints(currentForm === 'compliant' ? allVessels : allFarms, text),
        );
      }
    };
  };

  const toggleVisibleChange = (type: string) => {
    setVisible(type);
  };

  const setFarm = (farm: IFarm) => {
    setFormState({
      ...formState,
      [currentForm === 'compliant'
        ? (visible === 'company' ? 'Audit Company' : 'Vessel Name')
        : 'Farm (Site Number / I.D.)']: {
        ...formState[
          currentForm === 'compliant'
            ? (visible === 'company' ? 'Audit Company' : 'Vessel Name')
            : 'Farm (Site Number / I.D.)'
        ],
        text: farm.name,
        data: farm,
      },
    });
    setVisible('');
  };

  const handleFormSubmit = () => {
    //@ts-ignore
    const formToCorrectObject = editComplianceForm(formState);
    const editedForm =
      currentForm === 'compliant'
        ? editSendingComplianceForm(formToCorrectObject)
        : editSendingChecklistForm(formToCorrectObject);
    //@ts-ignore
    const form: any = {
      ...editedForm,
      date: getNetSuiteDateFormat(new Date()),
      name: '' + currentUser?.firstname + currentUser?.lastname,
    };
    if (currentForm === 'compliant') {
      form.custrecord_mfa_vessel_audit_date = getNetSuiteDateFormat(new Date());
    } else {
      form.custrecord_mfa_audit_date = getNetSuiteDateFormat(new Date());
      form.custrecord_mfa_farm_number_3 = form.custrecord_mfa_audit_farm;
    }
    dispatch(saveForm(form));
    navigation.navigate('Main');
  };

  return (
    <View>
      <ChecklistHeader
        name={`${currentUser?.firstname} ${currentUser?.lastname}`}
        date={date}
        state={formState}
        handleSearchChange={handleSearchChange}
        toggleVisibleChange={toggleVisibleChange}
        setFarm={setFarm}
        visible={visible}
        currentForm={currentForm}
        allPoints={visible == 'company' ? filteredCompanies : filteredPoints}
      />
      {Object.keys(formState).map(
        // @ts-ignore
        (item: keyof GeneralFormType, index: number) => {
          if (item === 'Vessel Name' || item === 'Audit Company' || item === 'Farm (Site Number / I.D.)') {
            return null;
          }
          if (formState[item]?.type === 'area') {
            return (
              <Textarea
                rowSpan={5}
                bordered
                underline
                placeholder={item}
                value={formState[item]?.text}
                style={{marginBottom: spacingBase + 5}}
                onChangeText={(text) => handleFormChange(item)(text)}
                key={index}
              />
            );
          }
          return (
            <View key={index}>
              <ChecklistForm
                item={item}
                handleFormChange={handleFormChange}
                state={formState}
              />
            </View>
          );
        },
      )}
      {inactiveButton && (
        <Text style={styles.notification}>
          * Fill fields Farm / Vessel for submit form
        </Text>
      )}
      <Button
        onPress={() => handleFormSubmit()}
        style={inactiveButton ? styles.inactiveButtonStyles : styles.button}
        disabled={inactiveButton}>
        <Text>Submit</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginVertical: spacingBase + 5,
  },
  button: {
    marginBottom: spacingBase * 5,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '100%',
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
});
