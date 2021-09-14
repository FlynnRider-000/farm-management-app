import * as React from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {FormikProps, FormikValues} from 'formik';
import {Input} from 'native-base';
import {
  primary,
  spacingBase,
  primaryLight,
  red,
  redLight,
  grey,
} from '../styles';
interface IProps {
  placeholder: string;
  name: string;
  formikProps: FormikProps<FormikValues>;
  autoFocus?: boolean | undefined;
}

export const UInput: React.FC<IProps> = React.memo(
  ({formikProps, placeholder, name, autoFocus}) => {
    const [isActive, setIsActive] = React.useState(false);
    const [isToggle, setIsToggle] = React.useState(false);
    const [val, setVal] = React.useState('');

    const onTogglePswd = () => {
      setIsToggle(!isToggle);
    };

    return (
      <View style={style.wrapper}>
        <View>
          <Text style={style.label}>{placeholder}</Text>
        </View>
        <View
          style={[
            style.input,
            formikProps.errors[name] && formikProps.touched[name]
              ? style.inputError
              : isActive
              ? style.inputFocus
              : style.inputNormal,
          ]}>
          <Input
            variant="unstyled"
            onFocus={() => setIsActive(true)}
            value={val}
            onChangeText={(text) => {
              text = text.replace(/\s/g, '');
              setVal(text);
              formikProps.handleChange(name)(text);
            }}
            autoFocus={autoFocus}
            onBlur={() => {
              setIsActive(false);
              formikProps.handleBlur(name);
            }}
            secureTextEntry={name === 'password' && !isToggle}
            InputRightElement={
              name === 'password' ? (
                <TouchableWithoutFeedback onPress={onTogglePswd}>
                  <Text style={style.rightElement}>
                    {isToggle ? 'hide' : 'view'}
                  </Text>
                </TouchableWithoutFeedback>
              ) : (
                <></>
              )
            }
          />
        </View>
        {formikProps.errors[name] && formikProps.touched[name] && (
          <Text style={style.warningText}>
            {formikProps.touched[name] && formikProps.errors[name]}
          </Text>
        )}
      </View>
    );
  },
);

const style = StyleSheet.create({
  wrapper: {
    marginTop: spacingBase * 2,
    marginBottom: spacingBase * 2,
  },
  warningText: {
    marginTop: spacingBase,
    color: red,
  },
  label: {
    marginBottom: spacingBase,
    color: grey,
  },
  rightElement: {
    paddingLeft: spacingBase * 2,
    paddingRight: spacingBase * 2,
  },
  inputError: {
    borderColor: red,
    backgroundColor: redLight,
  },
  inputFocus: {
    borderColor: primary,
    backgroundColor: primaryLight,
  },
  inputNormal: {
    borderColor: '#F5F7F9',
    backgroundColor: '#FAFBFC',
  },
  input: {
    borderRadius: spacingBase * 0.5,
    borderWidth: 1,
  },
});
