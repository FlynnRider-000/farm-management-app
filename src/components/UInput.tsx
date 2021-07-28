import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {FormikProps, FormikValues} from 'formik';
import {Input, Item, Label} from 'native-base';

interface IProps {
  placeholder: string;
  name: string;
  formikProps: FormikProps<FormikValues>;
  autoFocus?: boolean | undefined;
  styles?: object;
}

export const UInput: React.FC<IProps> = React.memo(
  ({formikProps, placeholder, name, autoFocus, styles}) => {
    return (
      <View style={styles || {}}>
        <Item floatingLabel>
          <Label>{placeholder}</Label>
          <Input
            onChangeText={formikProps.handleChange(name)}
            autoFocus={autoFocus}
            onBlur={formikProps.handleBlur(name)}
            secureTextEntry={name === 'password'}
          />
        </Item>
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
  warningText: {
    color: 'red',
  },
});
