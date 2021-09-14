import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {TextArea} from 'native-base';
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
  height: number;
  autoFocus?: boolean | undefined;
  styles?: object;
  onChange: (event: any) => void;
}

export const CustomTextArea: React.FC<IProps> = React.memo(
  ({value, autoFocus, onChange, height}) => {
    const [isActive, setIsActive] = React.useState(false);

    return (
      <View style={style.wrapper}>
        <View
          style={[
            style.input,
            isActive ? style.inputFocus : style.inputNormal,
          ]}>
          <TextArea
            style={{
              height: height,
            }}
            textAlignVertical="top"
            variant="unstyled"
            value={value}
            multiline={true}
            onFocus={() => setIsActive(true)}
            autoFocus={autoFocus}
            onBlur={() => {
              setIsActive(false);
            }}
            onChangeText={(text) => onChange(text)}
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
