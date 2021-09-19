import * as React from 'react';
import {StyleSheet, Text} from 'react-native';
import {Button, Spinner} from 'native-base';
import {primary, spacingBase, light} from '../styles';

interface IProps {
  label: string;
  fullWidth: boolean;
  disabled: boolean;
  onPress: (event: any) => void;
  smallOutline: boolean;
  isLoading: boolean;
}

export const UButton: React.FC<IProps> = React.memo(
  ({label, fullWidth, disabled, onPress, smallOutline, isLoading = false}) => {
    return (
      <Button
        shadow={smallOutline ? 0 : 7}
        onPress={onPress}
        disabled={disabled}
        size={smallOutline ? 'sm' : 'md'}
        style={[
          smallOutline ? style.smallButton : style.button,
          fullWidth ? style.fullWidth : {},
          disabled ? style.disabled : {},
        ]}>
        <Text style={smallOutline ? {color: primary} : {color: 'white'}}>
          {isLoading && (
            <Spinner
              style={{margin: 0, padding: 0}}
              size="sm"
              color="blue.500"
            />
          )}
          {label}
        </Text>
      </Button>
    );
  },
);

const style = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  disabled: {
    backgroundColor: light,
    color: 'grey',
  },
  button: {
    marginTop: spacingBase,
    paddingTop: spacingBase,
    paddingBottom: spacingBase,
    backgroundColor: primary,
    borderRadius: spacingBase * 1.5,
    height: spacingBase * 5.5,
    shadowColor: primary,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.34,
    shadowRadius: 1,
    elevation: 10,
    textAlign: 'center',
    color: 'white',
  },
  smallButton: {
    width: 80,
    height: 30,
    margin: 0,
    padding: 0,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: primary,
    borderRadius: spacingBase * 1.5,
    textAlign: 'center',
    color: primary,
  },
});
