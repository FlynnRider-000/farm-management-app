import * as React from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {FormikProps, FormikValues} from 'formik';
import {Input} from 'native-base';
import {primary, spacingBase, primaryLight, red, redLight, grey} from '../styles';
interface IProps {
  value: string;
  autoFocus?: boolean | undefined;
  styles?: object;
  type?: string;
  onChange: (event: any) => void;
}

export const UInput: React.FC<IProps> = React.memo(
  ({value, autoFocus, onChange, type}) => {
    const [isActive, setIsActive] = React.useState(false);
    const [isToggle, setIsToggle] = React.useState(false);

    const onTogglePswd = () => {
      setIsToggle(!isToggle);
    };

    return (
      <View style={style.wrapper}>
        <View style={[
          style.input,
          isActive 
            ? style.inputFocus
            : style.inputNormal,
          ]
        }>
          <Input
            keyboardType={type === 'numeric' ? 'numeric' : 'default'}
            value={value}
            variant="unstyled"
            onFocus={() => setIsActive(true)}
            onChangeText={(text) => onChange(text)}
            autoFocus={autoFocus}
            onBlur={() => {
              setIsActive(false);
            }}
          />
        </View>
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
