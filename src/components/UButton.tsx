import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'native-base';
import {primary, spacingBase, light} from '../styles';

interface IProps {
  label: string;
  fullWidth: boolean;
  disabled: boolean;
  onPress: (event: any) => void
}

export const UButton: React.FC<IProps> = React.memo(
  ({label, fullWidth, disabled, onPress}) => {
    const [isActive, setIsActive] = React.useState(false);

    return (
      <Button
        shadow={7}
        onPress={onPress}
        disabled={disabled}
        isDisabled={disabled}
        style={[
          style.button,
          fullWidth ? style.fullWidth: {},
          disabled ? style.disabled : {},
        ]}
      >
        {label}
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
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 1,
    elevation: 10,
    textAlign: 'center',
  }
});  
