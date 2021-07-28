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
import {Formik, FormikProps, FormikValues} from 'formik';
import * as yup from 'yup';
import {useDispatch, useSelector} from 'react-redux';
import {UInput} from '../components';
import {primary, spacingBase} from '../styles';
import {Button, Text} from 'native-base';
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
  const state = useSelector((rootState: RootState) => rootState.ui);
  const {errors}: UIStateInterface = state;

  return (
    <KeyboardAvoidingView style={styles.outerContainer}>
      <SafeAreaView
        style={{
          justifyContent: 'flex-end',
          paddingHorizontal: spacingBase + 5,
        }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.imageStyles} />
            </View>
            {errors.type === 'user' && (
              <Text style={styles.errorMessage}>{errors.message}</Text>
            )}
            <Formik
              initialValues={{email: '', password: ''}}
              onSubmit={(values) => {
                dispatch(loginUser(values));
              }}
              validationSchema={validationSchema}>
              {(formikProps: FormikProps<FormikValues>) => (
                <>
                  <UInput
                    placeholder={'Email'}
                    name={'email'}
                    formikProps={formikProps}
                    styles={styles.inputStyles}
                    autoFocus
                  />
                  <UInput
                    placeholder={'Password'}
                    name={'password'}
                    formikProps={formikProps}
                  />
                  <View>
                    <Button
                      disabled={!formikProps.isValid}
                      style={[
                        styles.button,
                        formikProps.isValid ? {} : styles.buttonDisabled,
                      ]}
                      onPress={() => formikProps.handleSubmit()}>
                      <Text>Submit</Text>
                    </Button>
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
  outerContainer: {
    flex: 1,
  },
  imageContainer: {width: '100%', marginBottom: spacingBase * 4},
  imageStyles: {resizeMode: 'contain', width: '100%'},
  inputStyles: {marginBottom: spacingBase},
  button: {
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: spacingBase * 2,
    backgroundColor: primary,
  },
  buttonDisabled: {
    backgroundColor: `${primary}95`,
  },
  errorMessage: {
    textAlign: 'center',
    marginBottom: spacingBase * 2,
    color: 'red',
  },
});

export default SignIn;
