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
import {UInput, UButton} from '../components';
import {spacingBase} from '../styles';
import {Text, Heading, useBreakpointValue } from 'native-base';
// @ts-ignore
import logo from '../assests/logo.png';
import {loginUser} from '../store/effects/user.effects';
import {RootState} from '../store/rootReducer';
import {UIStateInterface} from '../entities/ui.entities';

const validationSchema = yup.object().shape({
  email: yup.string().label('Email').email().required(),
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

  const onLoginUser = async (values: any) => {
    setIsBusy(true);
    await dispatch(loginUser(values));
    setIsBusy(false);
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
