import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {FloatReportHeader, FloatReportMain} from '../index';
import {primary, spacingBase} from '../../styles';
import {Button, Text} from 'native-base';
import {filterPoints, getNetSuiteDateFormat} from '../../helpers/general.gelpers';
import {useDispatch, useSelector} from 'react-redux';
import {IFarm, MainScreenNavigationProp} from '../../entities/general';
import {floatCollection} from '../../mock/mockData';
import {RootState} from '../../store/rootReducer';
import {saveForm} from '../../store/effects/form.effects';
import {editFloatForm} from '../../helpers/form.helpers';

type TProps = {
  navigation: MainScreenNavigationProp;
};

export const FloatReport: React.FC<TProps> = ({navigation}) => {
  const dispatch = useDispatch();
  const {currentUser} = useSelector((state: RootState) => state.user);
  const {allCompanies, allBays, allFloats} = useSelector(
    (state: RootState) => state.farm,
  );
  const [date] = React.useState(new Date().toLocaleString());
  const [formState, setFormState] = React.useState(floatCollection);

  const [floatId, setFloadId] = React.useState<number>(-1);
  const [filteredBays, setFilteredBays] = React.useState<Array<any>>(allBays);
  const [filteredCompanies, setFilteredCompanies] = React.useState<Array<any>>(allCompanies,);
  const [filteredFloats, setFilteredFloats] = React.useState<Array<any>>(allFloats);
    
  const [visible, setVisible] = React.useState({
    floats: false,
    bay: false,
    company: false,
  });
  const [inactiveButton, setInactiveButton] = React.useState(false);

  const handleFormSubmit = () => {
    const date = new Date();
    const form = {
      ...editFloatForm(formState, allCompanies, allBays, allFloats),
      custrecord_collection_date: getNetSuiteDateFormat(date),
      name: '' + currentUser?.firstname + currentUser?.lastname,
    };
    //@ts-ignore
    dispatch(saveForm(form));
    navigation.navigate('Main');
  };

  React.useEffect(() => {
    return () => {
      setVisible({
        floats: false,
        bay: false,
        company: false,
      });
    };
  }, []);

  React.useEffect(() => {
    formState.custrecord_mfa_collection_bay.length === 0 ||
    formState.custrecord_mfa_collection_company.length === 0 ||
    formState.custrecord_mfa_float_id_collected.length === 0
      ? setInactiveButton(true)
      : setInactiveButton(false);
  }, [formState]);

  const handleTextChange = (name: string) => {
    let type: boolean | undefined;
    if (name === 'custrecord_mfa_no_floats_collected') {
      return (text: string, index: number = -1) => {
        let updated: string[] = [
          ...formState.custrecord_mfa_no_floats_collected,
        ];
        updated[index] = text;
        setFormState({
          ...formState,
          custrecord_mfa_no_floats_collected: updated,
        });
      };
    }
    if (name === 'custrecord_mfa_vessel_collection_time' || 'custrecord_mfa_no_floats_collected') {
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
      if (type === 'bay') {
        setFilteredBays(filterPoints(allBays, text));
      }
      if (type === 'floats') {
        setFilteredFloats(filterPoints(allFloats, text));
      }
      if (type === 'company') {
        setFilteredCompanies(filterPoints(allCompanies, text));
      }
    };
  };

  const toggleVisibleChange = React.useCallback(
    (type, id) => {
      if (id !== -1) {
        setFloadId(id);
      }
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

  const setBay = (bay: IFarm) => {
    setFormState({
      ...formState,
      custrecord_mfa_collection_bay: bay.name,
    });
    setVisibleFalse('bay');
  };

  const setFloat = (floats: IFarm) => {
    const date = new Date();
    let updated: string[] = [];
    if (floatId !== -1) {
      updated = [...formState.custrecord_mfa_float_id_collected];
      updated[floatId] = floats.name;
      setFloadId(-1);
      setFormState({
        ...formState,
        custrecord_collection_date: getNetSuiteDateFormat(date),
        custrecord_mfa_float_id_collected: updated,
      });
    } else {
      updated = [
        ...formState.custrecord_mfa_float_id_collected,
        floats.name,
      ];
      setFormState({
        ...formState,
        custrecord_collection_date: getNetSuiteDateFormat(date),
        custrecord_mfa_float_id_collected: updated,
        custrecord_mfa_no_floats_collected: [
          ...formState.custrecord_mfa_no_floats_collected,
          '1',
        ]
      });
    }
    setVisibleFalse('floats');
  };

  const setCompany = (company: IFarm) => {
    setFormState({
      ...formState,
      custrecord_mfa_collection_company: company.name,
    });
    setVisibleFalse('company');
  };

  return (
    <View>
      <FloatReportHeader
        date={date}
        handleTextChange={handleTextChange}
        formState={formState}
        handleSearchChange={handleSearchChange}
        toggleVisibleChange={toggleVisibleChange}
        visible={visible.bay}
        setBay={setBay}
        allPoints={filteredBays}
      />
      <FloatReportMain
        handleTextChange={handleTextChange}
        setCompany={setCompany}
        setFloat={setFloat}
        filteredPoints={visible.floats ? filteredFloats : filteredCompanies}
        handleSearchChange={handleSearchChange}
        formState={formState}
        currentUser={`${currentUser?.firstname} ${currentUser?.lastname}`}
        visible={visible}
        toggleVisibleChange={toggleVisibleChange}
      />
      {inactiveButton && (
        <Text style={styles.notification}>
          * Fill fields Bay, Company and Float ID (Fields are in
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
