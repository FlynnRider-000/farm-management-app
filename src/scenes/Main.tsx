import * as React from 'react';
import {View, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import {Text, Box, Heading, useBreakpointValue} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import {differenceInSeconds} from 'date-fns';
import {Checkbox} from 'react-native-ui-lib';
import moment from 'moment';

import {spacingBase} from '../styles';
import {RootState} from '../store/rootReducer';
import {setCurrentForm, setEditForm} from '../store/actions/form.actions';
import {signOut} from '../store/actions/user.actions';
import {getAllFarms, getAllUtils} from '../store/effects/farm.effects';
import {sendForm} from '../store/effects/form.effects';
import {MainStackParamList} from '../navigation/navigation';
import {UButton} from '../components';
import {
  MainScreenNavigationProp,
  ILine,
  IFarm,
  IUtil,
  IFormTypes,
  IAssessmentForm,
  ISeedingForm,
} from '../entities/general';
type IProps = {
  navigation: MainScreenNavigationProp;
};

const Main: React.FC<IProps> = React.memo(({navigation}) => {
  const dispatch = useDispatch();

  const screenSize = useBreakpointValue({
    base: 'base',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  });

  const {currentUser} = useSelector((state: RootState) => state.user);
  const {pendingForms} = useSelector((state: RootState) => state.form);
  const farmData: Array<IFarm> = useSelector(
    (state: RootState) => state.farm.allFarms,
  );
  const utilData: Array<IUtil> = useSelector(
    (state: RootState) => state.farm.allUtils,
  );

  const farmDataRef = React.useRef<IFarm[]>([]);
  farmDataRef.current = farmData;
  const pendingFormsRef = React.useRef<IFormTypes[]>([]);
  pendingFormsRef.current = pendingForms;

  const [formSending, setFormSending] = React.useState(false);
  const [emailNotify, setEmailNotify] = React.useState(true);

  const pendingAssessments = pendingForms.filter(
    (form) => form.type === 'assessment',
  );
  const pendingSeedings = pendingForms.filter(
    (form) => form.type === 'seeding',
  );

  const getAllData = async () => {
    await dispatch(getAllFarms());
  };

  const getUtils = async () => {
    await dispatch(getAllUtils());
  };

  React.useEffect(() => {
    navigation.addListener('focus', () => {
      // Prevent default action

      const asyncAction = async () => {
        const connection = await NetInfo.fetch();
        if (connection.isConnected) {
          await dispatch(signOut());
        }
      };

      if (currentUser) {
        const diff = differenceInSeconds(
          new Date(),
          new Date(currentUser.loginTime),
        );
        if (diff > 31535000) {
          asyncAction();
        }
      }

      if (
        farmDataRef.current.length === 0 ||
        pendingFormsRef.current.length === 0
      ) {
        getAllData();
      }
      getUtils();
    });

    if (farmData.length === 0 || pendingForms.length === 0) {
      getAllData();
    }
    getUtils();
  }, [navigation]);

  const handleNavigatePush = (route: keyof MainStackParamList) =>
    navigation.push(route);

  const onFormCreate = (type: string) => {
    if (type === 'assessment' || type === 'harvest' || type === 'seeding') {
      dispatch(setCurrentForm(type));
      handleNavigatePush('Report');
    }
  };

  const getFarmName = (farm_id: string) => {
    const curFarm: Array<IFarm> = farmData.filter(
      (farm: any) => farm.id === farm_id,
    );
    if (curFarm) {
      return curFarm[0].name;
    }
    return '';
  };

  const getLineName = (farm_id: string, line_id: string) => {
    const curFarm: Array<IFarm> = farmData.filter(
      (farm: any) => farm.id === farm_id,
    );
    if (curFarm) {
      const lines = curFarm[0].lines;
      const curLine: Array<ILine> = lines.filter(
        (line: any) => line.id === line_id,
      );
      if (curLine) {
        return curLine[0].line_name;
      }
    }
    return '';
  };

  const onEditForm = (form: IFormTypes) => {
    dispatch(setCurrentForm(form.type!));
    dispatch(setEditForm(form));
    handleNavigatePush('Report');
  };

  const sendPendingForms = async () => {
    if (pendingForms) {
      setFormSending(true);
      const connection = await NetInfo.fetch();
      if (connection.isConnected) {
        await dispatch(sendForm(pendingForms, emailNotify));
      }
      setFormSending(false);
    }
  };

  return (
    <ScrollView
      style={
        screenSize === 'base'
          ? styles.miniOutercontainer
          : styles.outerContainer
      }>
      <View
        style={
          screenSize === 'base'
            ? styles.miniCardContainer
            : styles.cardContainer
        }>
        <Box style={styles.headingContainer}>
          <Heading
            mt={screenSize === 'base' ? spacingBase * 0.3 : spacingBase * 2}>
            Hi {`${currentUser?.firstname}`},
          </Heading>
          <Heading
            mb={screenSize === 'base' ? spacingBase * 0.3 : spacingBase * 2}>
            Let's Get Started
          </Heading>
        </Box>
        <Box
          mt={spacingBase}
          style={
            screenSize === 'base'
              ? styles.miniFormCardContainer
              : styles.formCardContainer
          }>
          <TouchableHighlight
            style={styles.flex1}
            onPress={() => onFormCreate('assessment')}
            underlayColor="#DFE5EC">
            <View
              style={[
                screenSize === 'base' ? styles.miniFormCard : styles.formCard,
                styles.c1,
              ]}>
              <Text style={styles.whiteLabel} fontSize="sm">
                FORM
              </Text>
              <Text style={styles.whiteLabel} fontSize="lg">
                Assessment
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.flex1}
            onPress={() => onFormCreate('seeding')}
            underlayColor="#DFE5EC">
            <View
              style={[
                screenSize === 'base' ? styles.miniFormCard : styles.formCard,
                styles.c2,
              ]}>
              <Text style={styles.whiteLabel} fontSize="sm">
                FORM
              </Text>
              <Text style={styles.whiteLabel} fontSize="lg">
                Seeding
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={{flex: 1, margin: 0}}
            onPress={() => onFormCreate('harvest')}
            underlayColor="#DFE5EC">
            <View
              style={[
                screenSize === 'base' ? styles.miniFormCard : styles.formCard,
                styles.c3,
              ]}>
              <Text style={styles.whiteLabel} fontSize="sm">
                FORM
              </Text>
              <Text style={styles.whiteLabel} fontSize="lg">
                Harvest
              </Text>
            </View>
          </TouchableHighlight>
        </Box>
        {pendingForms.length ? (
          <Box mt={spacingBase} style={styles.guidePanel}>
            <View
              style={{
                marginBottom: spacingBase * 1.2,
                justifyContent: 'space-between',
              }}>
              <View
                style={
                  screenSize === 'base'
                    ? styles.tableRowRightSM
                    : styles.tableRowRight
                }>
                <View
                  style={[
                    styles.checkWrap,
                    {
                      marginRight: spacingBase,
                    },
                  ]}>
                  <Checkbox
                    value={emailNotify}
                    onValueChange={(value) => setEmailNotify(value)}
                  />
                  <Text style={{marginLeft: spacingBase * 0.5}}>
                    Email Copy
                  </Text>
                </View>
                <UButton
                  onPress={() => sendPendingForms()}
                  disabled={formSending ? true : false}
                  label={formSending ? '' : 'Send'}
                  fullWidth={false}
                  smallOutline={true}
                  isLoading={formSending}
                />
              </View>
            </View>
            {pendingAssessments.length ? (
              <>
                <View
                  style={{
                    marginBottom: spacingBase * 1.2,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={[
                      styles.tableRow,
                      {
                        marginBottom: spacingBase * 1.2,
                        justifyContent: 'space-between',
                      },
                    ]}>
                    <Heading size="md"> Assessment Forms </Heading>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.flexChild}>
                    <Text>Farm</Text>
                  </View>
                  <View style={styles.flexChild}>
                    <Text>Line</Text>
                  </View>
                  {screenSize !== 'base' && (
                    <>
                      <View style={styles.flexChild}>
                        <Text>Con-Avg</Text>
                      </View>
                      <View style={styles.flexChild}>
                        <Text>Color</Text>
                      </View>
                    </>
                  )}
                  <View style={styles.flexChild}>
                    <Text>Assess Date</Text>
                  </View>
                  <View style={styles.flexChild} />
                </View>
                {pendingAssessments.map((frm, index) => {
                  const form = frm as IAssessmentForm;
                  return (
                    <View style={styles.tableRow} key={`form${index}`}>
                      <View style={styles.flexChild}>
                        <Text>{getFarmName(form.farm_id)}</Text>
                      </View>
                      <View style={styles.flexChild}>
                        <Text>{getLineName(form.farm_id, form.line_id)}</Text>
                      </View>
                      {screenSize !== 'base' && (
                        <>
                          <View style={styles.flexChild}>
                            <Text>{form.condition_avg}</Text>
                          </View>
                          <View style={styles.flexChild}>
                            <Text>{form.color}</Text>
                          </View>
                        </>
                      )}
                      <View style={styles.flexChild}>
                        <Text>
                          {moment
                            .unix(Number(form.date_assessment))
                            .format('YYYY/MM/DD')}
                        </Text>
                      </View>
                      <View
                        style={[styles.flexChild, {alignItems: 'flex-end'}]}>
                        <UButton
                          onPress={() => onEditForm(form)}
                          disabled={formSending ? true : false}
                          label="Edit"
                          isLoading={false}
                          fullWidth={false}
                          smallOutline={true}
                        />
                      </View>
                    </View>
                  );
                })}
              </>
            ) : (
              <></>
            )}
            {pendingSeedings.length ? (
              <>
                <View
                  style={{
                    marginBottom: spacingBase * 1.2,
                    justifyContent: 'space-between',
                  }}>
                  <View
                    style={[
                      styles.tableRow,
                      {
                        marginBottom: spacingBase * 1.2,
                        justifyContent: 'space-between',
                      },
                    ]}>
                    <Heading size="md"> Seeding Forms </Heading>
                  </View>
                </View>
                <View style={styles.tableRow}>
                  <View style={styles.flexChild}>
                    <Text>Farm</Text>
                  </View>
                  <View style={styles.flexChild}>
                    <Text>Line</Text>
                  </View>
                  <View style={styles.flexChild}>
                    <Text>Season</Text>
                  </View>
                  {screenSize !== 'base' && (
                    <>
                      <View style={styles.flexChild}>
                        <Text>Line Length</Text>
                      </View>
                      <View style={styles.flexChild}>
                        <Text>Seed Type</Text>
                      </View>
                    </>
                  )}
                  <View style={styles.flexChild} />
                </View>
                {pendingSeedings.map((frm, index) => {
                  const form = frm as ISeedingForm;
                  const util = utilData.filter((el) => el.id === form.seed_id);
                  return (
                    <View style={styles.tableRow} key={`form${index}`}>
                      <View style={styles.flexChild}>
                        <Text>{getFarmName(form.farm_id)}</Text>
                      </View>
                      <View style={styles.flexChild}>
                        <Text>{getLineName(form.farm_id, form.line_id)}</Text>
                      </View>
                      <View style={styles.flexChild}>
                        <Text>{form.name}</Text>
                      </View>
                      {screenSize !== 'base' && (
                        <>
                          <View style={styles.flexChild}>
                            <Text>{form.line_length}</Text>
                          </View>
                          <View style={styles.flexChild}>
                            <Text>{util[0].name}</Text>
                          </View>
                        </>
                      )}
                      <View
                        style={[styles.flexChild, {alignItems: 'flex-end'}]}>
                        <UButton
                          onPress={() => onEditForm(form)}
                          disabled={formSending ? true : false}
                          label="Edit"
                          isLoading={false}
                          fullWidth={false}
                          smallOutline={true}
                        />
                      </View>
                    </View>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </Box>
        ) : (
          <></>
        )}
        <Box mt={spacingBase} mb={spacingBase} style={styles.guidePanel}>
          <Heading mb={spacingBase}> How it works </Heading>
          <Text mb={spacingBase * 0.5} fontSize="sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text fontSize="sm">
            Aenean sed adipiscing diam donec adipiscing tristique. Cursus risus
            at ultrices mi tempus imperdiet nulla malesuada pellentesque.
            Consequat mauris nunc congue nisi vitae suscipit tellus. Fusce ut
            placerat orci nulla pellentesque dignissim.
          </Text>
        </Box>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  miniOutercontainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  outerContainer: {
    flex: 1,
    backgroundColor: '#DFE5EC',
  },
  miniCardContainer: {
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  cardContainer: {
    flexDirection: 'column',
    backgroundColor: '#DFE5EC',
  },
  miniFormCardContainer: {
    display: 'flex',
    flexDirection: 'column',
    paddingVertical: spacingBase * 2,
    paddingHorizontal: spacingBase + 5,
    backgroundColor: '#DFE5EC',
  },
  formCardContainer: {
    alignSelf: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 800,
    backgroundColor: '#DFE5EC',
  },
  flexChild: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  tableRowRight: {
    // alignSelf: 'stretch',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    marginVertical: spacingBase * 0.5,
  },
  tableRowRightSM: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    flexDirection: 'column',
    marginVertical: spacingBase * 0.5,
  },
  checkWrap: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: spacingBase * 0.5,
  },
  tableRow: {
    flex: 1,
    // alignSelf: 'stretch',
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: spacingBase * 0.5,
  },
  c1: {
    backgroundColor: '#334CAA',
    shadowColor: '#334CAA',
  },
  c2: {
    backgroundColor: '#4762EB',
    shadowColor: '#4762EB',
  },
  c3: {
    backgroundColor: '#08AEF7',
    shadowColor: '#08AEF7',
  },
  miniFormCard: {
    marginVertical: spacingBase * 0.5,
    padding: spacingBase * 2,
    borderRadius: spacingBase * 1.2,
    minHeight: 120,
    color: 'white',
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 10,
  },
  formCard: {
    margin: spacingBase * 0.5,
    padding: spacingBase,
    borderRadius: spacingBase * 1.2,
    color: 'white',
    flex: 1,
    height: undefined,
    aspectRatio: 1,
    display: 'flex',
    justifyContent: 'space-between',
    shadowRadius: 10,
    shadowOpacity: 1,
    elevation: 10,
  },
  whiteLabel: {
    color: 'white',
  },
  headingContainer: {
    paddingHorizontal: spacingBase + 5,
    backgroundColor: 'white',
  },
  guidePanel: {
    borderRadius: spacingBase * 1.5,
    backgroundColor: 'white',
    padding: spacingBase * 3,
    marginHorizontal: spacingBase + 5,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  flex1: {
    flex: 1,
  },
});

export default Main;
