import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
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
  value: string;
  autoFocus?: boolean | undefined;
  styles?: object;
  type?: string;
  rightEl?: string;
  requiredChecking?: boolean;
  onChange: (event: any) => void;
}

export const UInput: React.FC<IProps> = React.memo(
  ({value, autoFocus, onChange, type, rightEl, requiredChecking}) => {
    const [isActive, setIsActive] = React.useState(false);
    return (
      <>
        <View style={style.wrapper}>
          <View
            style={[
              style.input,
              isActive ? style.inputFocus : style.inputNormal,
            ]}>
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
              InputRightElement={
                rightEl !== '' ? (
                  <Text style={style.rightElement}> {rightEl} </Text>
                ) : (
                  <></>
                )
              }
            />
          </View>
        </View>
        {requiredChecking && value === '' && (
          <Text style={{fontSize: 12, color: 'red'}}>
            This field is required
          </Text>
        )}
      </>
    );
  },
);

const style = StyleSheet.create({
  wrapper: {
    marginTop: spacingBase,
    marginBottom: spacingBase,
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
