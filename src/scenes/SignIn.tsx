import * as React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import * as yup from 'yup';
import {Formik, FormikProps, FormikValues} from 'formik';
import {useDispatch, useSelector} from 'react-redux';
import {Text, Heading, useBreakpointValue } from 'native-base';
import {apiUrl} from '../config/api';
import {postRequest} from '../helpers/general.gelpers';
import {RootState} from '../store/rootReducer';
import {signIn} from '../store/actions/user.actions';
import {setError} from '../store/actions/ui.actions';
import {spacingBase} from '../styles';
import {UInput, UButton} from '../components';
import {UIStateInterface} from '../entities/ui.entities';

const validationSchema = yup.object().shape({
  email: yup.string().trim('The email cannot include leading and trailing spaces').label('Email').email().required(),
  password: yup.mixed().label('Password').required(),
});

const SignIn = () => {
  const dispatch = useDispatch();
  const [isBusy, setIsBusy] = React.useState(false);
  const state = useSelector((rootState: RootState) => rootState.ui);
  const {errors}: UIStateInterface = state;

  const screenSize = useBreakpointValue({
    base: 'base',
    sm: 'sm',
    md: 'md',
    lg: 'lg',
    xl: 'xl',
  });

  const getAdditionalInfo = async (id: string, token: string) => {
    try {
      const userData = await postRequest(
        apiUrl + `api/user/profiles/${id}`,
        {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        {},
        'GET',
      );
      return userData;
    } catch (e) {
      console.error(e);
    }
  };

  const onLoginUser = async (values: any) => {
    setIsBusy(true);
    try {
      const currentUser = {
        email: values.email.trim(),
        password: values.password.trim(),
        remember: true,
      };

      const userData = await postRequest(
        apiUrl + 'api/auth/login',
        {
          'Content-Type': 'application/json;charset=utf-8',
        },
        currentUser,
      );

      const additionalInfo = await getAdditionalInfo(userData.user_id, userData.data.access_token);

      dispatch(
        signIn({
          id: userData.user_id,
          firstname : additionalInfo.data.name,
          lastname: '',
          authToken: userData.data.access_token,
          refreshToken: userData.data.refresh_token,
          loginTime: new Date(),
        }),
      );
    } catch (e) {
      dispatch(
        setError({
          type: 'user',
          message: 'Wrong email or password',
        }),
      );
      setIsBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView style={screenSize === 'base' ? styles.miniOuterContainer : styles.outerContainer}>
      <SafeAreaView
        style={
          screenSize === 'base' ? {
            paddingHorizontal: spacingBase + 5,
            height: '100%',
          } : {
            justifyContent: 'center',
            paddingHorizontal: spacingBase + 5,
            display: 'flex',
            flex: 1,
          }
        }>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{backgroundColor: 'yellow'}}>
          <View style={screenSize === 'base' ? styles.miniCard : styles.card}>
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={(values) => {
                onLoginUser(values);
              }}
              validationSchema={validationSchema}>
              {(formikProps: FormikProps<FormikValues>) => (
                <>
                  <View>
                    <View style={styles.imageContainer}>
                      <Heading fontSize="xl">Login to Your Account</Heading>
                    </View>
                    <UInput
                      placeholder={'EMAIL OR USERNAME'}
                      name={'email'}
                      formikProps={formikProps}
                      autoFocus
                    />
                    <UInput
                      placeholder={'PASSWORD'}
                      name={'password'}
                      formikProps={formikProps}
                    />
                    {errors.type === 'user' && (
                      <Text style={styles.errorMessage}>{errors.message}</Text>
                    )}
                  </View>
                  <View style={{marginTop: spacingBase * 2}}>
                    <UButton
                      disabled={!formikProps.isValid || isBusy}
                      fullWidth
                      label="Login"
                      smallOutline={false}
                      isLoading={false}
                      onPress={() => formikProps.handleSubmit()}>
                    </UButton>
                  </View>
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  miniCard: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: spacingBase * 2,
  },
  card: {
    display: 'flex',
    alignSelf: 'center',
    width: '60%',
    backgroundColor: 'white',
    borderRadius: spacingBase * 2,
    padding: spacingBase * 3,
  },
  miniOuterContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  outerContainer: {
    flex: 1,
    backgroundColor: '#DFE5EC',
  },
  imageContainer: {marginTop: spacingBase * 3, marginBottom: spacingBase * 3},
  errorMessage: {
    marginBottom: spacingBase * 2,
    color: 'red',
  },
});

export default SignIn;
