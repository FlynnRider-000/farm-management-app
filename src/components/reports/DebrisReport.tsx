import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {DebrisReportHeader, DebrisReportMain} from '../index';
import {primary, spacingBase} from '../../styles';
import {Button, Text} from 'native-base';
import {filterPoints, getNetSuiteDateFormat} from '../../helpers/general.gelpers';
import {useDispatch, useSelector} from 'react-redux';
import {IFarm, MainScreenNavigationProp} from '../../entities/general';
import {debris} from '../../mock/mockData';
import {RootState} from '../../store/rootReducer';
import {saveForm} from '../../store/effects/form.effects';
import {editDebrisForm} from '../../helpers/form.helpers';

type TProps = {
  navigation: MainScreenNavigationProp;
};

export const DebrisReport: React.FC<TProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state: RootState) => state.user);
  const {allFarms, allCompanies, allBays, allVessels} = useSelector(
    (state: RootState) => state.farm,
  );
  const [date] = React.useState(new Date().toLocaleString());
  const [formState, setFormState] = React.useState(debris);
  const [filteredPoints, setFilteredPoints] = React.useState<Array<any>|null>(
    allFarms,
  );
  const [filteredBays, setFilteredBays] = React.useState<Array<any>>(allBays);
  const [filteredCompanies, setFilteredCompanies] = React.useState<Array<any>>(
    allCompanies,
  );
  const [visible, setVisible] = React.useState({
    farm: false,
    bay: false,
    company: false,
  });
  const [inactiveButton, setInactiveButton] = React.useState(false);

  const handleFormSubmit = () => {
    const _date = new Date();
    const ropeFounds = formState.custrecord_mfa_rope_found.map((value) => {
      return  { id: Number(value) };
    });
    
    const form = {
      ...editDebrisForm(formState, allCompanies, allBays),
      custrecord_mfa_date_of_clean: getNetSuiteDateFormat(_date),
      name: '' + currentUser?.firstname + currentUser?.lastname,
      custrecord_mfa_rope_found: {
        items: ropeFounds
      }
    };
    //@ts-ignore
    dispatch(saveForm(form));
    navigation.navigate('Main');
  };

  React.useEffect(() => {
    return () => {
      setVisible({
        farm: false,
        bay: false,
        company: false,
      });
    };
  }, []);

  React.useEffect(() => {
    formState.custrecord_mfa_bay.length === 0 ||
    formState.custrecord_mfa_company_beach_clean.length === 0 ||
    formState.custrecord_mfa_rope_found.length === 0
      ? setInactiveButton(true)
      : setInactiveButton(false);
  }, [formState]);

  const handleTextChange = (name: string) => {
    let type: boolean | undefined;
    if (name === 'custrecord_mfa_rope_found') {
      return (items: any[]) => {
        setFormState({
          ...formState,
          [name]: items,
        });
      };
    }
    if (name === 'custrecord_mfa_no_people' || 'custrecord_mfa_no_hours') {
      type = true;
    }
    type = false;
    return (text: string) => {
      setFormState({
        ...formState,
        [name]: type ? text.replace(/\D/g, '') : text,
      });
    };
  };

  const handleSearchChange = (type: string) => {
    return (text: string) => {
      if (type === 'farm') {
        setFilteredPoints(filterPoints(allFarms, text));
      }
      if (type === 'bay') {
        setFilteredBays(filterPoints(allBays, text));
      }
      if (type === 'company') {
        setFilteredCompanies(filterPoints(allCompanies, text));
      }
    };
  };

  const toggleVisibleChange = React.useCallback(
    (type) => {
      setVisible({
        ...visible,
        // @ts-ignore
        [type]: !visible[type],
      });
    },
    [visible],
  );

  const setVisibleFalse = (type: string) => {
    setVisible({
      ...visible,
      [type]: false,
    });
  };
  const setFarm = (farm: IFarm) => {
    setFormState({
      ...formState,
      name: `TEST-Debris${farm.name}`, // Need To Delete
    });
    setVisibleFalse('farm');
  };

  const setBay = (farm: IFarm) => {
    setFormState({
      ...formState,
      custrecord_mfa_bay: farm.name,
    });
    setVisibleFalse('bay');
  };

  const setCompany = (farm: IFarm) => {
    setFormState({
      ...formState,
      custrecord_mfa_company_beach_clean: farm.name,
    });
    setVisibleFalse('company');
  };

  return (
    <View>
      <DebrisReportHeader
        date={date}
        handleTextChange={handleTextChange}
        formState={formState}
        handleSearchChange={handleSearchChange}
        toggleVisibleChange={toggleVisibleChange}
        setFarm={setFarm}
        visible={visible.farm}
        allPoints={filteredPoints}
      />
      <DebrisReportMain
        handleTextChange={handleTextChange}
        setCompany={setCompany}
        setBay={setBay}
        allBays={filteredBays}
        allCompanies={filteredCompanies}
        handleSearchChange={handleSearchChange}
        formState={formState}
        currentUser={`${currentUser?.firstname} ${currentUser?.lastname}`}
        visible={visible}
        toggleVisibleChange={toggleVisibleChange}
      />
      {inactiveButton && (
        <Text style={styles.notification}>
          * Fill fields Area, Bay, Company and aquaculture debris (Fields are in
          squares)
        </Text>
      )}
      <Button
        onPress={() => handleFormSubmit()}
        style={
          inactiveButton ? styles.inactiveButtonStyles : styles.buttonStyles
        }
        disabled={inactiveButton}>
        <Text>Submit</Text>
      </Button>
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
